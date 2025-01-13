<?php

namespace App\Http\Controllers\Api;

use App\Models\Transaction;
use App\Http\Controllers\Controller;
use App\Models\payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MoMoController extends Controller
{
    public function createPayment(Request $request)
    {
        $amount = $request->amount;
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
    
            return response()->json(['payUrl' => $jsonResponse['payUrl']]);
        } else {
            return response()->json([
                'error' => 'Giao dịch thất bại',
                'message' => $jsonResponse['message'] ?? 'N/A'
            ], 400);
        }
    }
    public function returnPayment(Request $request)
    {
        $data = $request->all();
        $transaction = Transaction::where('order_id', $data['orderId'])->first();

        if ($transaction) {
            $transaction->update([
                'transaction_id' => $data['transId'] ?? null,
                'result_code' => $data['resultCode'],
                'message' => $data['message'] ?? 'N/A',
            ]);
        }

        if ($data['resultCode'] == '0') {
            payment::where('id',$request->id_hoadon)->update(['status_payment'=>'1','status'=>'complete']);
            // return response()->json([
            //     'id_hoadon'=>$request->id_hoadon,
            // ]);
            return redirect('http://localhost:5174');
        } else {
            payment::where('id',$request->id_hoadon)->update(['status_payment'=>'1','status'=>'failed']);
            // return "Thanh toán thất bại!";
            return redirect('http://localhost:5174');
        }
    }
}