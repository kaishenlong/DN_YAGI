<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\DetailRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ReqBooking;
class BookingsController extends Controller
{
        // public function store(ReqBooking $request)
        // {
        //     $room = DetailRoom::find($request->detail_room_id);
  
        //     if (!$room) {
        //         return response()->json(['error' => 'Room not found'], 404);
        //     }

        //     // Tính số ngày giữa check_in và check_out
        //     $checkIn = Carbon::parse($request->check_in);
        //     $checkOut = Carbon::parse($request->check_out);
        //     $days = $checkOut->diffInDays($checkIn);

        //     if ($days <= 0) {
        //         return response()->json(['error' => 'Invalid date range'], 400);
        //     }
            
        //     // Tính tổng giá tiền (số ngày * giá mỗi đêm * số phòng)
        //     $total_price = $days * $room->into_money * $request->quantity;
        //     $guests = $request->adult + $request->children;
        //     // Tạo booking mới
        //     $booking = new Booking();
        //     $booking->user_id = $request->user_id;
        //     $booking->detail_room_id = $request->detail_room_id;
        //     $booking->check_in = $request->check_in;
        //     $booking->check_out = $request->check_out;
        //     $booking->guests = $guests;
        //     $booking->adult = $request->adult;
        //     $booking->children = $request->children;
        //     $booking->quantity = $request->quantity;
        //     $booking->total_price = $total_price;
        //     $booking->status = 'pending';
        //     $booking->save();

        //     return response()->json([
        //         'data' => $booking,
        //         'message' => 'Booking created successfully',
        //         'status_code' => 201,
        //     ], 201);
        // }

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
        // Tìm booking hiện có
        $booking = Booking::find($id);
    
        if (!$booking) {
            return response()->json(['error' => 'Không tìm thấy booking'], 404);
        }
    
        // Tìm phòng
        $room = DetailRoom::find($request->detail_room_id);
    
        if (!$room) {
            return response()->json(['error' => 'Room not found'], 404);
        }
    
        // Tính số ngày giữa check_in và check_out
        $checkIn = Carbon::parse($request->check_in);
        $checkOut = Carbon::parse($request->check_out);
        $days = $checkOut->diffInDays($checkIn);
    
        if ($days <= 0) {
            return response()->json(['error' => 'Invalid date range'], 400);
        }
    
        // Tính tổng giá tiền (số ngày * giá mỗi đêm * số phòng)
        $totalMoney = $days * $room->into_money * $request->quantity;
        $guests = $request->adult + $request->children;
    
        // Cập nhật thông tin booking
        $booking->user_id = $request->user_id;
        $booking->detail_room_id = $request->detail_room_id;
        $booking->check_in = $request->check_in;
        $booking->check_out = $request->check_out;
        $booking->guests = $guests;
        $booking->adult = $request->adult;
        $booking->children = $request->children;
        $booking->quantity = $request->quantity;
        $booking->total_money = $totalMoney;
        $booking->status = 'pending';
        $booking->save();
    
        return response()->json([
            'data' => $booking,
            'message' => 'Booking updated successfully',
            'status_code' => 200,
        ], 200);
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