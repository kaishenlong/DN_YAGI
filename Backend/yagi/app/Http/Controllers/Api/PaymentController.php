<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\PayMangEmail;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Cart;
use App\Models\RoomAvailability;
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
        $payments = Payment::orderBy('created_at', 'desc')->get();

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

    // tìm kiếm
    public function search(Request $request)
    {
        $name = $request->input('name');
        $payment_date = $request->input('payment_date');

        if (empty($name) && empty($payment_date)) {
            return response()->json(['error' => 'Bắt buộc phải nhập tên người dùng hoặc ngày'], 400);
        }

        $payments = Payment::query()
            ->when($name, function ($query) use ($name) {
                $query->where('firstname', 'like', "%$name%")
                    ->orWhere('lastname', 'like', "%$name%");
            })
            ->when($payment_date, function ($query) use ($payment_date) {
                // Convert payment_date thành đối tượng Carbon và lấy phần ngày
                $payment_date = Carbon::createFromFormat('Y-m-d', $payment_date)->startOfDay();
                return $query->whereDate('created_at', '>=', $payment_date);
            })
            ->get();

        if ($payments->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy khoản thanh toán nào cho tiêu chí tìm kiếm được cung cấp',
                'status_code' => 404,
            ], 404);
        }

        return response()->json([
            'data' => $payments,
            'message' => 'Đã truy xuất thanh toán thành công',
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

        // Kiểm tra số phòng còn trong khoảng thời gian đặt
        $checkIn = Carbon::parse($request->check_in);
        $checkOut = Carbon::parse($request->check_out);
        $days = $checkOut->diffInDays($checkIn);

        // Nếu phạm vi ngày không hợp lệ
        if ($days < 1) {
            return response()->json(['error' => 'Phạm vi ngày không hợp lệ'], 400);
        }

        // Lặp qua tất cả các ngày trong khoảng thời gian từ check-in đến check-out
        for ($i = 0; $i <= $days; $i++) {  // Thay đổi vòng lặp để bao gồm cả ngày check-out
            $currentDate = $checkIn->copy()->addDays($i);

            // Kiểm tra số phòng có sẵn cho ngày hiện tại
            $roomAvailability = RoomAvailability::where('detail_room_id', $room->id)
                ->where('date', $currentDate->toDateString())
                ->first();

            if (!$roomAvailability || $roomAvailability->available_rooms < $request->quantity) {
                return response()->json(['error' => "Không đủ phòng trống cho ngày này: " . $currentDate->toDateString()], 400);
            }
        }

        //Sau khi kiểm tra, giảm số lượng phòng cho tất cả các ngày trong khoảng thời gian đặt (bao gồm cả check-in và check-out)
        for ($i = 0; $i <= $days; $i++) {  // Thay đổi vòng lặp để bao gồm cả ngày check-out
            $currentDate = $checkIn->copy()->addDays($i);

            // Giảm số lượng phòng cho ngày hiện tại
            $roomAvailability = RoomAvailability::where('detail_room_id', $room->id)
                ->where('date', $currentDate->toDateString())
                ->first();

            if ($roomAvailability) {
                $roomAvailability->available_rooms -= $request->quantity;
                $roomAvailability->save();
            }
        }

        // Tính tổng giá tiền
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
        $payment->paymen_date = now();
        $payment->total_amount = $totalPrice;
        $payment->status = 'pending';

        $redirectUrl = '';
        $statusPayment = ($request->method == 'QR') ? '0' : '1'; // '0' cho QR, '1' cho MoMo hoặc VNPAY
        $payment->status_payment = $statusPayment;
        $payment->method = $request->method;
        // Lưu thông tin thanh toán vào database
        $payment->save();
        $room = DetailRoom::with('hotel')->find($request->detail_room_id);
        DetailPayment::create([
            'payment_id' => $payment->id,
            'booking_id' => $booking->id,
            'user_id' => $userId,
        ]);
        $roomType = DetailRoom::with('roomType')->find($request->detail_room_id);
        // Gửi email thông báo thanh toán thành công
        if ($payment->status_payment == 1 || $payment->status_payment == 0) {
            $email = Auth::user()->email;
            Mail::to($email)->send(new PaymentSuccessMail(Auth::user(), $booking, $payment, $room, $roomType));
        }

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
                $orderId = time();
                $requestId = (string) time();
                $orderInfo = "Thanh toán qua QR MoMo";
                $redirectUrl = env('MOMO_RETURN_URL') . '/api/momo/return?id_hoadon=' . $payment->id;
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
                    'amount' => (string) $amount,
                    'orderId' => (string) $orderId,
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

                    // Lưu thông tin thanh toán vào database
                    $payment->save();
                    $room = DetailRoom::with('hotel')->find($request->detail_room_id);
                    DetailPayment::create([
                        'payment_id' => $payment->id,
                        'booking_id' => $booking->id,
                        'user_id' => $userId,
                    ]);
                    $roomType = DetailRoom::with('roomType')->find($request->detail_room_id);
                    // Gửi email thông báo thanh toán thành công
                    if ($payment->status_payment == 1 || $payment->status_payment == 0) {
                        $email = Auth::user()->email;
                        Mail::to($email)->send(new PaymentSuccessMail(Auth::user(), $booking, $payment, $room,$roomType));
                    }

                    return response()->json([
                        'payUrl' => $jsonResponse['payUrl'],
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
                    'id_hoadon' => $payment->id,
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

                break;

            case 'QR':
                $payment->method = 'QR';
                $redirectUrl = "https://qrpayment.vn/pay?amount={$totalPrice}&booking_id={$booking->id}";
                $statusPayment = 0; // Đặt status_payment = 0 cho QR
                break;

            default:
                return response()->json(['error' => 'Invalid payment method'], 400);
        }


        // // Cập nhật thông tin thanh toán và trả về phản hồi
        $payment->save();
        $room = DetailRoom::with('hotel')->find($request->detail_room_id);
        $roomType = DetailRoom::with('roomType')->find($request->detail_room_id);
        DetailPayment::create([
            'payment_id' => $payment->id,
            'booking_id' => $booking->id,
            'user_id' => $userId,
        ]);
        // Gửi email thông báo thanh toán thành công
        if ($payment->status_payment == 1 || $payment->status_payment == 0) {
            $email = Auth::user()->email;  // Lấy email của người dùng đã đăng nhập
            // Gửi email thông báo thanh toán thành công
            Mail::to($email)->send(new PaymentSuccessMail(Auth::user(), $booking, $payment, $room,$roomType));
        }
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

        // Kiểm tra trạng thái Payment và cập nhật số lượng phòng nếu là hủy (failed)
        if ($request->has('status') && $request->status == 'failed') {
            // Tìm tất cả các DetailPayment liên quan đến Payment này
            $detailPayments = DetailPayment::where('payment_id', $payment->id)->get();

            // Duyệt qua các DetailPayment để lấy các booking
            foreach ($detailPayments as $detailPayment) {
                // Tìm booking tương ứng với detailPayment
                $booking = Booking::find($detailPayment->booking_id);

                if ($booking) {
                    // Lấy thông tin phòng chi tiết tương ứng với booking
                    $roomAvailability = RoomAvailability::where('detail_room_id', $booking->detail_room_id)
                        ->whereBetween('date', [$booking->check_in, $booking->check_out])
                        ->get();

                    // Duyệt qua các ngày trong booking và cập nhật lại số lượng phòng
                    foreach ($roomAvailability as $availability) {
                        // Trả lại phòng cho từng ngày
                        $availability->available_rooms += $booking->quantity; // Cộng lại số phòng đã đặt
                        $availability->save(); // Lưu lại thay đổi
                    }
                }
            }
        }

        // Kiểm tra và cập nhật trạng thái Payment nếu có
        if ($request->has('status')) {
            $payment->status = $request->status;
        }

        // Lưu lại Payment
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







    // PAYCART 
    public function payCart(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'User not logged in'], 401);
        }

        // Lấy ID người dùng hiện tại
        $userId = Auth::id();

        // Lấy `cartId` từ request body (có thể là một số hoặc một mảng)
        $cartIds = $request->input('cartIds');

        if (!$cartIds || !is_array($cartIds)) {
            return response()->json(['error' => 'Cart IDs are required and must be an array'], 400);
        }

        // Lấy tất cả các sản phẩm trong giỏ hàng mà người dùng chọn
        $cartItems = Cart::where('user_id', $userId)
            ->whereIn('id', $cartIds)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'No cart items found for the provided IDs'], 404);
        }

        $totalBookingPrice = 0;
        $bookings = [];
        $payment = [];
        $payments = [];

        // Duyệt qua từng sản phẩm trong giỏ hàng
        foreach ($cartItems as $cartItem) {
            $room = DetailRoom::find($cartItem->detail_room_id);

            if (!$room) {
                return response()->json(['error' => "Room not found for cart ID: {$cartItem->id}"], 404);
            }

            // Kiểm tra số phòng còn trong khoảng thời gian đặt
            $checkIn = Carbon::parse($request->check_in);
            $checkOut = Carbon::parse($request->check_out);


            // Tạo Booking
            $booking = new Booking();
            $booking->user_id = $userId;
            $booking->detail_room_id = $cartItem->detail_room_id;
            $booking->check_in = $cartItem->check_in;
            $booking->check_out = $cartItem->check_out;
            $booking->guests = $cartItem->adult + $cartItem->children;
            $booking->adult = $cartItem->adult;
            $booking->total_price = $cartItem->total_price;
            $booking->children = $cartItem->children;
            $booking->quantity = $cartItem->quantity;
            $booking->status = 'pending';
            $booking->save();

            $totalBookingPrice += $cartItem->total_price;
            $bookings[] = $booking;
        }

        // Tạo Payment
        $payment = new Payment();
        $payment->user_id = $userId;
        $payment->firstname = $request->firstname;
        $payment->lastname = $request->lastname;
        $payment->phone = $request->phone;
        $payment->paymen_date = now();
        $payment->total_amount = $totalBookingPrice;
        $payment->status = 'pending';


        $redirectUrl = '';
        $statusPayment = ($request->method == 'QR') ? '0' : '1'; // '0' cho QR, '1' cho MoMo hoặc VNPAY
        $payment->status_payment = $statusPayment;
        switch ($request->method) {
            case 'MoMo':
                $payment->method = 'MoMo';
                $amount = $totalBookingPrice;
                if (!is_numeric($amount) || (int) $amount < 1000) {
                    return response()->json(['error' => 'Số tiền không hợp lệ.'], 400);
                }

                $endpoint = env('MOMO_ENDPOINT');
                $partnerCode = env('MOMO_PARTNER_CODE');
                $accessKey = env('MOMO_ACCESS_KEY');
                $secretKey = env('MOMO_SECRET_KEY');
                $orderId = time();
                $requestId = (string) time();
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
                    'amount' => (string) $amount,
                    'orderId' => (string) $orderId,
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
                    $payment->save();
                    DetailPayment::create([
                        'payment_id' => $payment->id,
                        'booking_id' => $booking->id,
                        'user_id' => $userId,
                    ]);
                    
                    $room = DetailRoom::with('hotel')->find($cartItem->detail_room_id);
                    $type = DetailRoom::with('roomType')->find($cartItem->detail_room_id);
                
                    // Gửi email thông báo thanh toán thành công
                    if ($payment->status_payment == 1 || $payment->status_payment == 0) {
                        $email = Auth::user()->email;  // Lấy email của người dùng đã đăng nhập
                        // Gửi email thông báo thanh toán thành công
                        Mail::to($email)->send(new PayMangEmail(Auth::user(), $bookings, $payment, $room, $type));
                    }
                    return response()->json([
                        'payUrl' => $jsonResponse['payUrl'],
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
                    'amount' => $totalBookingPrice,
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
                $redirectUrl = "https://qrpayment.vn/pay?amount={$totalBookingPrice}&booking_id={$booking->id}";
                $statusPayment = 0;  // Đặt status_payment = 0 cho QR
                break;

            default:
                return response()->json(['error' => 'Invalid payment method'], 400);
        }

        // Cập nhật status_payment

        $payment->save();
        // $room = DetailRoom::with('hotel')->find($cartItem->detail_room_id);
        // $roomType = DetailRoom::with('roomType')->find($request->detail_room_id);




        // xóa sản phảm trong giỏ hàng đã thanh toán 
        Cart::whereIn('id', $cartIds)->delete();





        // Gửi email thông báo thanh toán thành công
        // if ($payment->status_payment == 1 || $payment->status_payment == 0) {
        //     $email = Auth::user()->email;  // Lấy email của người dùng đã đăng nhập
        //     // Gửi email thông báo thanh toán thành công
        //     Mail::to($email)->send(new PayMangEmail(Auth::user(), $bookings, $payment, $room,$roomType));
        // }
        DetailPayment::create([
            'payment_id' => $payment->id,
            'booking_id' => $booking->id,
            'user_id' => $userId,
        ]);



        // Trả về phản hồi
        return response()->json([
            'bookings' => $bookings,
            'booking' => $booking,
            'payment' => $payment,
            'payments' => $payments,
            'total_price' => $totalBookingPrice,
            'payUrl' => $redirectUrl,
            'message' => 'Payment completed successfully',
            'status_code' => 201,
        ], 201);
    }
    public function showid($id)
    {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'Bạn cần phải đăng nhập để xem thông tin'
            ], 401); // Trả về lỗi 401 nếu người dùng chưa đăng nhập
        }

        // Lấy tất cả payment của người dùng và sắp xếp theo thời gian tạo (mới nhất lên trên)
        $payments = $user->payment()->orderBy('created_at', 'desc')->get();

        // Kiểm tra nếu không tìm thấy payment nào
        if ($payments->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy lịch sử thanh toán của bạn'
            ], 404); // Lỗi 404 nếu không tìm thấy payment
        }

        // Tìm payment có ID tương ứng trong danh sách đã sắp xếp
        $payment = $payments->firstWhere('id', $id);

        // Kiểm tra nếu không tìm thấy payment với ID cụ thể
        if (!$payment) {
            return response()->json([
                'message' => 'Không tìm thấy lịch sử thanh toán hoặc bạn không có quyền truy cập'
            ], 404); // Lỗi 404 nếu không tìm thấy payment với ID
        }

        // Trả về payment nếu tìm thấy
        return response()->json([
            'data' => $payment,
            'message' => 'Lịch sử thanh toán được tìm thấy'
        ], 200);
    }

}