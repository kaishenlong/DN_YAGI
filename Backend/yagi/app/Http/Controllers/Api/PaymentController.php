<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\DetailRoom;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ResPayment;

class PaymentController extends Controller
{
    public function store(ResPayment $request)
    {
        // Kiểm tra phòng
        $room = DetailRoom::find($request->detail_room_id);
        if (!$room) {
            return response()->json(['error' => 'Room not found'], 404);
        }

        // Tính số ngày và tổng tiền
        $checkIn = Carbon::parse($request->check_in);
        $checkOut = Carbon::parse($request->check_out);
        $days = $checkOut->diffInDays($checkIn);

        if ($days <= 0) {
            return response()->json(['error' => 'Invalid date range'], 400);
        }

        $totalPrice = $days * $room->into_money * $request->quantity;
        $guests = $request->adult + $request->children;

        // Tạo Booking
        $booking = new Booking();
        $booking->user_id = $request->user_id;
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

        // Tạo Payment
        $payment = new Payment();
       
        $payment->user_id = $request->user_id;
        $payment->firstname = $request->firstname;
        $payment->lastname = $request->lastname;
        $payment->phone = $request->phone;
        $payment->paymen_date = now();
        $payment->total_amount = $totalPrice;
        $payment->status = 'pending';

        // Xử lý theo phương thức thanh toán
        $redirectUrl = '';
        switch ($request->method) {
            case 'MoMo':
                $payment->method = 'MoMo';
                $redirectUrl = "https://momo.vn/payment?amount={$totalPrice}&booking_id={$booking->id}";
                break;

            case 'VNPAY':
                $payment->method = 'VNPAY';
                $redirectUrl = "https://vnpay.vn/payment?amount={$totalPrice}&booking_id={$booking->id}";
                break;

            case 'QR':
                $payment->method = 'QR';
                $redirectUrl = "https://qrpayment.vn/pay?amount={$totalPrice}&booking_id={$booking->id}";
                break;

            default:
                return response()->json(['error' => 'Invalid payment method'], 400);
        }

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