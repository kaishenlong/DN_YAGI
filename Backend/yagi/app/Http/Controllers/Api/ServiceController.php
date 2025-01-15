<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\service;
use App\Models\Payment;

use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
       $data = service::limit(10)->orderByDesc('id')->get();
        return response()->json([
            'data' => $data,
            'status_code' => 200,
        ]);
    }
    public function show($paymentId) {
        $details = service::where('payment_id', $paymentId)->with(['payment'])  // Tải thông tin liên quan (payment và booking)
            ->get();

        // Nếu không tìm thấy chi tiết nào
        if ($details->isEmpty()) {
            return response()->json(['message' => 'No payment details found.'], 404);
        }

        // Trả về dữ liệu dưới dạng JSON
        return response()->json([
            'data' => $details,
            'status_code' => 200,
            'message' => 'Payment  retrieved successfully.'
        ]);
    }
    public function store(Request $request){
        $service = new service();
        $service->payment_id = $request->payment_id;
        $service->name = $request->name;
        $service->price = $request->price;
        $service->hotel_id = $request->hotel_id;
        $service->save();
        return response()->json([
            'data' => $service,
           'message' => 'Service created successfully',
           'status_code' => 201,
        ], 201);
    }
    public function update(Request $request, service $service){
    $abc= $service->update(["name" => $request->name, "price" => $request->price,"payment_id" => $request->payment_id,"hotel_id" => $request->hotel_id]);
    return response()->json([
        'data' => $abc,
        'message' => 'updated successfully',
        'status_code' => 201,
    ], 201);
    
    }
}
