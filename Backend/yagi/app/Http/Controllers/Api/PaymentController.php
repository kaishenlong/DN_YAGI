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
class PaymentController extends Controller
{
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
            $redirectUrl = "https://momo.vn/payment?amount={$totalPrice}&booking_id={$booking->id}";
            $statusPayment = 1;  // Đặt status_payment = 1 cho MoMo
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

    // Trả về phản hồi
    return response()->json([
        'message' => 'Booking and payment created successfully',
        'booking' => $booking,
        'payment' => $payment,
        'redirect_url' => $redirectUrl,
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
}