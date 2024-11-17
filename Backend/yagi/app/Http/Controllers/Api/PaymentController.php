<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Requests\ResPayment;

class PaymentController extends Controller
{
    public function index() {
        $payments = Payment::all();
        return response()->json([
            'data' => $payments,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }

    public function store(ResPayment $request) {
        // Tìm booking theo `booking_id` từ request
        $booking = Booking::find($request->booking_id);

        // Kiểm tra nếu booking không tồn tại
        if (!$booking) {
            return response()->json(['error' => 'Booking not found'], 404);
        }

        // Lấy giá trị total_money từ Booking và gán vào total_amount của Payment
        $totalAmount = $booking->total_money;

        // Tạo payment mới và gán các giá trị
        $payment = new Payment();
        $payment->booking_id = $request->booking_id;
        $payment->user_id = $request->user_id;
        $payment->paymen_date = $request->paymen_date;

        // Kiểm tra phương thức thanh toán
        if ($request->method === 'MoMo') {      
            $payment->method = 'MoMo';         
        } elseif ($request->method === 'QR') {           
            $payment->method = 'QR';           
        } else {
            $payment->method = 'Credit Card';
        }
        $payment->total_amount = $totalAmount;
        $payment->status = 'pending';

        // Lưu payment vào cơ sở dữ liệu
        $payment->save();
        return response()->json([
            'data' => $payment,
            'message' => 'Payment created successfully',
            'status_code' => 201,
        ], 201);
    }

    public function show($id) {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        return response()->json([
            'data' => $payment,
            'status_code' => 200,
        ], 200);
    }

    public function update(ResPayment $request, $id) {
        // Tìm Payment theo ID từ request
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        if ($request->has('booking_id')) {
            $booking = Booking::find($request->booking_id);

            if (!$booking) {
                return response()->json(['error' => 'Booking not found'], 404);
            }
            $payment->total_amount = $booking->total_money;
        }

        if ($request->has('user_id')) {
            $payment->user_id = $request->user_id;
        }
        if ($request->has('paymen_date')) {
            $payment->paymen_date = $request->paymen_date;
        }
        if ($request->has('method')) {
            if ($request->method === 'MoMo') {
                $payment->method = 'MoMo';
                // Gọi hàm xử lý MoMo ở đây
            } elseif ($request->method === 'QR') {
                $payment->method = 'QR';
                // Gọi hàm xử lý QR ở đây
            } else {
                $payment->method = 'Credit Card';
            }
        }
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

    public function delete($id) {
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