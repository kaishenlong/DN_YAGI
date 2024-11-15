<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VnPayController extends Controller
{
    public function create(Request $request)
{
    session(['cost_id' => $request->id]);
    session(['url_prev' => url()->previous()]);
    $vnp_TmnCode = "WHZTB667"; // Mã website tại VNPAY
    $vnp_HashSecret = "NERH92PNZO7HABOX3B5KYJDE0PDVQSRS"; // Chuỗi bí mật
    $vnp_Url = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    $vnp_Returnurl = "http://localhost:8000/api/return-vnpay";
    $vnp_TxnRef = date("YmdHis"); // Mã đơn hàng
    $vnp_OrderInfo = "Thanh toán hóa đơn phí dịch vụ";
    $vnp_BankCode = $request->input('bankcode');
    $vnp_OrderType = 'billpayment';
    $vnp_Amount = $request->input('amount') * 100;
    $vnp_Locale = 'vn';
    $vnp_IpAddr = request()->ip();

    

    $inputData = array(
        "vnp_Version" => "2.1.0",
        "vnp_TmnCode" => $vnp_TmnCode,
        "vnp_Amount" => $vnp_Amount,
        "vnp_Command" => "pay",
        "vnp_CreateDate" => date('YmdHis'),
        "vnp_CurrCode" => "VND",
        "vnp_IpAddr" => $vnp_IpAddr,
        "vnp_Locale" => $vnp_Locale,
        "vnp_OrderInfo" => "Thanh toan GD:" . (string)$vnp_TxnRef,
        "vnp_OrderType" => "other",
        "vnp_ReturnUrl" => $vnp_Returnurl,
        "vnp_TxnRef" => $vnp_TxnRef,

    );
    
    if (isset($vnp_BankCode) && $vnp_BankCode != "") {
        $inputData['vnp_BankCode'] = $vnp_BankCode;
    }
    
    ksort($inputData);
    $query = "";
    $i = 0;
    $hashdata = "";
    foreach ($inputData as $key => $value) {
        if ($i == 1) {
            $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
        } else {
            $hashdata .= urlencode($key) . "=" . urlencode($value);
            $i = 1;
        }
        $query .= urlencode($key) . "=" . urlencode($value) . '&';
    }
    
    $vnp_Url = $vnp_Url . "?" . $query;
    if (isset($vnp_HashSecret)) {
        $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret);//  
        $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
    }


    // Trả về JSON chứa URL thay vì redirect
    return response()->json(['url' => $vnp_Url]);
}



    public function vnpayReturn(Request $request)
    {
        $vnp_HashSecret = "NERH92PNZO7HABOX3B5KYJDE0PDVQSRS"; // Chuỗi bí mật
        
        $vnp_SecureHash = $request->vnp_SecureHash;
        $inputData = array();
        foreach ($_GET as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }
        
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        if ($secureHash == $vnp_SecureHash) {
            if ($inputData['vnp_ResponseCode'] == '00') {
                // Xử lý thanh toán thành công
                return response()->json(['status' => 'success']);
            } else {
                // Thanh toán thất bại
                return response()->json(['status' => 'failed', 'message' => 'Transaction failed']);
            }
        } else {
            // Chữ ký không hợp lệ
            return response()->json(['status' => 'error', 'message' => 'Invalid signature']);
        }
    }
}
