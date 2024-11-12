<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResPayment;
use App\Models\payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index() {
        $payments=payment::all();
        return response()->json([
            'data' => $payments,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function store(ResPayment $request) {
      
    
        $payment = payment::create($request->only('booking_id', 'user_id','paymen_date', 'method','total_amount', 'status'));
    
        return response()->json([
            'data' => $payment,
            'message' => 'payment created successfully',
            'status_code' => 201,
        ], 201); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function show($id) {
      
    
        $payment=payment::find($id);
    
        return response()->json([
            'data' => $payment,
            
            'status_code' => 200,
        ], 200); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function update(Request $request, $id)  {
       
        payment::where('id',$id)->update($request->all('status'));
        $payment=payment::find($id);
         return response()->json([
             'data' => $payment,
             'message' => 'payment updated successfully',
             'status_code' => 201,
         ], 201);
     }
     public function delete($id) {
        payment::where('id',$id)->delete();
        return response()->json([
            
            'message' => 'payment deleted successfully',
            'status_code' => 201,
        ], 201);
     }
}
