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


class DetailPaymentController extends Controller
{
    public function index($paymentId){
        $details = DetailPayment::where('payment_id', $paymentId)->with(['payment', 'booking'])  // Tải thông tin liên quan (payment và booking)
        ->get();

        // Nếu không tìm thấy chi tiết nào
        if ($details->isEmpty()) {
            return response()->json(['message' => 'No payment details found.'], 404);
        }

        // Trả về dữ liệu dưới dạng JSON
        return response()->json([
            'data' => $details,
            'status_code' => 200,
            'message' => 'Payment details retrieved successfully.'
        ]);
    }
    public function update(Request $request, $id)
{
    // Tìm PaymentDetail theo ID
    $paymentDetail = DetailPayment::find($id);

    // Kiểm tra xem PaymentDetail có tồn tại không
    if (!$paymentDetail) {
        return response()->json(['error' => 'PaymentDetail not found'], 404);
    }

    // Cập nhật các trường trong PaymentDetail
    if ($request->has('status')) {
        $paymentDetail->status = $request->status;  // Ví dụ: cập nhật trạng thái
    }

    // Lưu lại các thay đổi
    $paymentDetail->save();

    return response()->json([
        'data' => $paymentDetail,
        'message' => 'PaymentDetail updated successfully',
    ], 200);
}

}
