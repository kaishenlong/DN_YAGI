<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Transaction;
use Carbon\Carbon;
use App\Models\DetailRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Mail\PaymentSuccessMail;
use App\Models\DetailPayment;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function index()
        {
            $payments = Payment::all();
    
            if ($payments->isEmpty()) {
                return response()->json([
                    'message' => 'No Payments found',
                    'status_code' => 404,
                ], 404);
            }    
            return response()->json([
                'data' => $payments,
                'message' => 'Payments retrieved successfully',
                'status_code' => 200,
            ], 200);
        }
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'User not logged in'], 401);
        }

        $userId = Auth::id();

        $room = DetailRoom::find($request->detail_room_id);
        if (!$room) {
            return response()->json(['error' => 'Room not found'], 404);
        }
        // Kiểm tra xem có đủ phòng không
        if ($room->available_rooms < $request->quantity) {
            return response()->json(['error' => 'Not enough rooms available'], 400);
        }

        // Giảm số lượng phòng còn lại
        $room->available_rooms -= $request->quantity;
        $room->save();

        // Tính toán chi phí đặt phòng
        $checkIn = Carbon::parse($request->check_in);
        $checkOut = Carbon::parse($request->check_out);
        $days = $checkOut->diffInDays($checkIn);

        if ($days <= 0) {
            return response()->json(['error' => 'Invalid date range'], 400);
        }
       
        $totalPrice = $days * $room->into_money * $request->quantity;
        $guests = $request->adult + $request->children;
        // Lưu thông tin booking
        $booking = new Booking();
        $booking->user_id = $userId;
        $booking->detail_room_id = $request->detail_room_id;
        $booking->check_in = $request->check_in;
        $booking->check_out = $request->check_out;
        $booking->guests = $guests;
        $booking->adult = $request->adult;
        $booking->children = $request->children;
        $booking->quantity = $request->quantity;
        $booking->total_price = $totalPrice;
        $booking->status = 'pending';
        $booking->save();

        // Tạo thông tin thanh toán
        $payment = new Payment();
        $payment->user_id = $userId;
        $payment->firstname = $request->firstname;
        $payment->lastname = $request->lastname;
        $payment->phone = $request->phone;
        // $payment->status_payment = $request->statusPayment;
        $payment->paymen_date = now();
        $payment->total_amount = $totalPrice;
        $payment->status = 'pending';
       
        $redirectUrl = '';
        $statusPayment = ($request->method == 'QR') ? '0' : '1'; // '0' cho QR, '1' cho MoMo hoặc VNPAY
        $payment->status_payment = $statusPayment;
        switch ($request->method) {
            case 'MoMo':
                $payment->method = 'MoMo';
                $amount = $totalPrice;
                if (!is_numeric($amount) || (int) $amount < 1000) {
                    return response()->json(['error' => 'Số tiền không hợp lệ.'], 400);
                }
            
                $endpoint = env('MOMO_ENDPOINT');
                $partnerCode = env('MOMO_PARTNER_CODE');
                $accessKey = env('MOMO_ACCESS_KEY');
                $secretKey = env('MOMO_SECRET_KEY');
                $orderId =  time();
                $requestId = (string)time();
                $orderInfo = "Thanh toán qua QR MoMo";
                $redirectUrl = env('MOMO_RETURN_URL');
                $ipnUrl = env('MOMO_NOTIFY_URL');
                $extraData = ''; 
                $requestType = 'payWithATM';
        
                // Tạo chữ ký (signature)
                $rawData = "accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType";
                $signature = hash_hmac("sha256", $rawData, $secretKey);
                // Dữ liệu gửi đến MoMo API
                $data = [
                    'partnerCode' => $partnerCode,
                    'accessKey' => $accessKey,
                    'requestId' => $requestId,
                    'amount' =>  (string)$amount,
                    'orderId' =>  (string)$orderId,
                    'orderInfo' => $orderInfo,
                    'redirectUrl' => $redirectUrl,
                    'ipnUrl' => $ipnUrl,
                    'requestType' => 'payWithATM',
                    'lang' => 'vi',
                    'signature' => $signature,  
                    'extraData' => $extraData,
                ];
            
                // Gửi yêu cầu đến MoMo API
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                ])->post($endpoint, $data);
            
                $jsonResponse = $response->json();
            
                // Lưu giao dịch vào database nếu thành công
                if (isset($jsonResponse['payUrl']) && $jsonResponse['resultCode'] == 0) {
                    Transaction::create([
                        'order_id' => $orderId,
                        'amount' => $amount,
                        'order_info' => $orderInfo,
                        'result_code' => $jsonResponse['resultCode'],
                        'message' => $jsonResponse['message'],
                    ]);
                    
                        DetailPayment::create([
                            'payment_id' => $payment->id,
                            'booking_id' => $booking->id,
                            'user_id' => $userId,
                        ]);
                    
                    return response()->json(['payUrl' => $jsonResponse['payUrl'],
                    'message' => 'Booking and payment created successfully',
                    'booking' => $booking,
                    'payment' => $payment,
                    'status_code' => 201,
                ]);
                } else {
                    return response()->json([
                        'error' => 'Giao dịch thất bại',
                        'message' => $jsonResponse['message'] ?? 'N/A'
                    ], 400);
                }
                break;
                case 'VNPAY':
                    $payment->method = 'VNPAY';

                    // Khởi tạo VnPayController
                    $vnpay = new VnPayController;
                    
                    // Chuẩn bị request
                    $vnpayRequest = new Request([
                        'amount' => $totalPrice,
                        'booking' => $booking,
                        'bankcode' => $request->input('bankcode'), // Truyền mã ngân hàng nếu có
                    ]);
                    // Gọi hàm create
                    $response = $vnpay->create($vnpayRequest);
                   

                    // Lấy URL từ response
                    $redirectUrl = $response->getData()->url;
                    $statusPayment = 1;  // Đặt status_payment = 1 cho VNPAY
                    break;
                    

                case 'QR':
                    $payment->method = 'QR';
                    $redirectUrl = "https://qrpayment.vn/pay?amount={$totalPrice}&booking_id={$booking->id}";
                    $statusPayment = 0;  // Đặt status_payment = 0 cho QR
                    break;
                 
            default:
                return response()->json(['error' => 'Invalid payment method'], 400);
        }

        // Cập nhật status_payment

        $payment->save();
        $room = DetailRoom::with('hotel')->find($request->detail_room_id);

        // Gửi email thông báo thanh toán thành công
        if ($payment->status_payment == 1) {
            $email = Auth::user()->email;  // Lấy email của người dùng đã đăng nhập
            // Gửi email thông báo thanh toán thành công
            Mail::to($email)->send(new PaymentSuccessMail(Auth::user(), $booking, $payment, $room));
        }
        DetailPayment::create([
            'payment_id' => $payment->id,
            'booking_id' => $booking->id,
            'user_id' => $userId,
        ]);
        // Trả về phản hồi
        return response()->json([
            'message' => 'Booking and payment created successfully',
            'booking' => $booking,
            'payment' => $payment,
            'payUrl' => $redirectUrl,
            'status_code' => 201,
        ], 201);
    }

    public function show($id)
    {
        $payment = Payment::with('booking')->find($id);

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        return response()->json([
            'data' => $payment,
            'status_code' => 200,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        // Tìm Payment
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        // Cập nhật Payment
        if ($request->has('status')) {
            $payment->status = $request->status;
        }

        $payment->save();

        return response()->json([
            'data' => $payment,
            'message' => 'Payment updated successfully',
            'status_code' => 200,
        ], 200);
    }

    public function delete($id)
    {
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        $payment->delete();

        return response()->json([
            'message' => 'Payment deleted successfully',
            'status_code' => 200,
        ], 200);
    }
    public function PayCart(Request $request){
// Lấy ID người dùng
    $userId = Auth::id();
    $total_price = 0; // Tổng giá trị cho tất cả bookings
    $bookings = []; // Mảng lưu trữ các bookings

    // Tạo payment cho tất cả bookings
    $payment = Payment::create([
        'user_id' => $userId,
        'firstname' => $request->firstname,
        'lastname' => $request->lastname,
        'phone' => $request->phone,
        'paymen_date' => now(), // Ngày thanh toán
        'method' => $request->method, // Phương thức thanh toán
        'total_amount' => 0, // Tổng số tiền thanh toán sẽ được tính sau
        'status_payment' => 1, // Đã thanh toán
        'status' => 'complete', // Trạng thái thanh toán hoàn tất
    ]);

    // Lặp qua các sản phẩm (bookings)
    foreach ($request->products as $product) {
        // Lấy thông tin chi tiết phòng từ bảng DetailRoom
        $room = DetailRoom::find($product['detail_room_id']);
        if (!$room) {
            return response()->json(['error' => 'Room not found'], 404);
        }

        // Kiểm tra xem có đủ phòng không
        if ($room->available_rooms < $product['quantity']) {
            return response()->json(['error' => 'Not enough rooms available'], 400);
        }

        // Cập nhật lại số lượng phòng còn lại
        $room->available_rooms -= $product['quantity'];
        $room->save();

        // Chuyển đổi check_in và check_out thành đối tượng Carbon
        $checkIn = Carbon::parse($product['check_in']);
        $checkOut = Carbon::parse($product['check_out']);

        // Tính số ngày giữa check_in và check_out
        $days = $checkOut->diffInDays($checkIn);
        if ($days <= 0) {
            return response()->json(['error' => 'Invalid date range'], 400);
        }

        // Tính giá trị cho booking dựa trên số ngày và giá phòng
        $productPrice = $room->into_money;

        // Tính tổng giá trị cho booking hiện tại
        $totalBookingPrice = $days * $product['quantity'] * $productPrice;

        // Tạo mới một booking cho sản phẩm này
        $booking = Booking::create([
            'user_id' => $userId,
            'detail_room_id' => $product['detail_room_id'],
            'check_in' => $checkIn,
            'check_out' => $checkOut,
            'guests' => $product['adult'] + $product['children'],
            'adult' => $product['adult'],
            'total_price' => $totalBookingPrice,
            'children' => $product['children'],
            'quantity' => $product['quantity'],
            'status' => 'pending',
        ]);

        // Thêm booking vào mảng bookings
        $bookings[] = $booking;

        // Cộng dồn tổng giá trị cho tất cả bookings
        $total_price += $totalBookingPrice;
    }

    // Cập nhật lại tổng số tiền thanh toán trong payment
   
    $statusPayment = ($request->method == 'QR') ? '0' : '1'; // '0' cho QR, '1' cho MoMo hoặc VNPAY
    $payment->status_payment = $statusPayment;
    
    $payment->total_amount = $total_price;
    switch ($request->method) {
        case 'MoMo':
            $payment->method = 'MoMo';
            $amount = $total_price;
            if (!is_numeric($amount) || (int) $amount < 1000) {
                return response()->json(['error' => 'Số tiền không hợp lệ.'], 400);
            }
        
            $endpoint = env('MOMO_ENDPOINT');
            $partnerCode = env('MOMO_PARTNER_CODE');
            $accessKey = env('MOMO_ACCESS_KEY');
            $secretKey = env('MOMO_SECRET_KEY');
            $orderId =  time();
            $requestId = (string)time();
            $orderInfo = "Thanh toán qua QR MoMo";
            $redirectUrl = env('MOMO_RETURN_URL');
            $ipnUrl = env('MOMO_NOTIFY_URL');
            $extraData = ''; 
            $requestType = 'payWithATM';
    
            // Tạo chữ ký (signature)
            $rawData = "accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType";
            $signature = hash_hmac("sha256", $rawData, $secretKey);
            // Dữ liệu gửi đến MoMo API
            $data = [
                'partnerCode' => $partnerCode,
                'accessKey' => $accessKey,
                'requestId' => $requestId,
                'amount' =>  (string)$amount,
                'orderId' =>  (string)$orderId,
                'orderInfo' => $orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl' => $ipnUrl,
                'requestType' => 'payWithATM',
                'lang' => 'vi',
                'signature' => $signature,  
                'extraData' => $extraData,
            ];
        
            // Gửi yêu cầu đến MoMo API
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($endpoint, $data);
        
            $jsonResponse = $response->json();
            foreach ($bookings as $booking) {
                DetailPayment::create([
                    'payment_id' => $payment->id,
                    'booking_id' => $booking->id,
                    'user_id' => $userId,
                ]);
            }
            // Lưu giao dịch vào database nếu thành công
            if (isset($jsonResponse['payUrl']) && $jsonResponse['resultCode'] == 0) {
                Transaction::create([
                    'order_id' => $orderId,
                    'amount' => $amount,
                    'order_info' => $orderInfo,
                    'result_code' => $jsonResponse['resultCode'],
                    'message' => $jsonResponse['message'],
                ]);
        
                return response()->json(['payUrl' => $jsonResponse['payUrl'],
                'message' => 'Booking and payment created successfully',
                'booking' => $booking,
                'payment' => $payment,
                'status_code' => 201,
            ]);
            } else {
                return response()->json([
                    'error' => 'Giao dịch thất bại',
                    'message' => $jsonResponse['message'] ?? 'N/A'
                ], 400);
            }
            break;
            case 'VNPAY':
                $payment->method = 'VNPAY';

                // Khởi tạo VnPayController
                $vnpay = new VnPayController;
                
                // Chuẩn bị request
                $vnpayRequest = new Request([
                    'amount' => $total_price,
                    'booking' => $booking,
                    'bankcode' => $request->input('bankcode'), // Truyền mã ngân hàng nếu có
                ]);
                // Gọi hàm create
                $response = $vnpay->create($vnpayRequest);
               

                // Lấy URL từ response
                $redirectUrl = $response->getData()->url;
                $statusPayment = 1;  // Đặt status_payment = 1 cho VNPAY
                break;
                

            case 'QR':
                $payment->method = 'QR';
                $redirectUrl = "https://qrpayment.vn/pay?amount={$total_price}&booking_id={$booking->id}";
                $statusPayment = 0;  // Đặt status_payment = 0 cho QR
                break;
             
        default:
            return response()->json(['error' => 'Invalid payment method'], 400);
    }
    $payment->save();

    foreach ($bookings as $booking) {
        DetailPayment::create([
            'payment_id' => $payment->id,
            'booking_id' => $booking->id,
            'user_id' => $userId,
        ]);
    }
    return response()->json([
        'data' => $bookings,  // Trả về tất cả bookings đã tạo
        'payment' => $payment, // Trả về payment đã tạo
        'total_price' => $total_price,  // Tổng giá trị cho tất cả bookings
        'message' => 'Bookings and Payment created successfully',
        'status_code' => 201,
    ], 201);
    }
}