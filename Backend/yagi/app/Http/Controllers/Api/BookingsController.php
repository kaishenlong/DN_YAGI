<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Requests\ReqBooking;
class BookingsController extends Controller
{
    public function store(ReqBooking $request)
    {
        $data = [
            'user_id' =>  $request->user_id,
            'detail_room_id' =>  $request->detail_room_id,
            'check_in' =>  $request->check_in,
            'check_out' =>  $request->check_out,
            'guests' =>  $request->guests,
            'adult' =>  $request->adult,
            'children' =>  $request->children,
            'quantity' =>  $request->quantity,
            'total_price' =>  $request->total_price,    
            'status' =>  $request->status,
        ];

        $booking = Booking::create($data);

        return response()->json([
            'data' => $booking,
            'message' => 'Booking created successfully',
            'status_code' => 201,
        ], 201);
    }

    public function show($id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Không tìm thấy phòng đã đặt '], 404);
        }

        return response()->json([
            'data' => $booking,
            'status_code' => 200,
        ]);
    }

    public function update(ReqBooking $request, $id)
    {
        $booking = Booking::find($id);
        $data = [
            'user_id' => $request->user_id,
            'detail_room_id' => $request->detail_room_id,
            'check_in' => $request->check_in,
            'check_out' => $request->check_out,
            'guests' => $request->guests,
            'adult' => $request->adult,
            'children' => $request->children,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price,
            'status' => $request->status,
        ];
    

        $booking->update($data);

        return response()->json([
            'data' => $booking,
            'message' => 'Booking updated successfully',
            'status_code' => 200,
        ]);
    }

    public function destroy($id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Không tìm thấy phòng'], 404);
        }

        $booking->delete();

        return response()->json(['message' => 'Đã xóa thành công '], 200);
    }
  
}