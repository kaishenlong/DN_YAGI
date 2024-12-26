<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\DetailRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ReqBooking;
use Illuminate\Support\Facades\Auth;

class BookingsController extends Controller
{
    public function index()
        {
            $bookings = Booking::all();
    
            if ($bookings->isEmpty()) {
                return response()->json([
                    'message' => 'No bookings found',
                    'status_code' => 404,
                ], 404);
            }    
            return response()->json([
                'data' => $bookings,
                'message' => 'Bookings retrieved successfully',
                'status_code' => 200,
            ], 200);
        }
    
    public function store(Request $request)
    {
        $userId = Auth::id();
        $total_price = 0; // Tổng giá trị cho tất cả bookings
    
        $bookings = []; // Mảng lưu trữ các bookings
    
        foreach ($request->products as $product) {
            // Lấy thông tin chi tiết phòng từ bảng DetailRoom
            $room = DetailRoom::find($product['detail_room_id']);
            if (!$room) {
                return response()->json(['error' => 'Room not found'], 404);
            }
    
            // Chuyển đổi check_in và check_out thành đối tượng Carbon
            $checkIn = Carbon::parse($request->check_in);
            $checkOut = Carbon::parse($request->check_out);
            
            // Tính số ngày giữa check_in và check_out
            $days = $checkOut->diffInDays($checkIn);
            if ($days <= 0) {
                return response()->json(['error' => 'Invalid date range'], 400);
            }
    
            // Tính giá trị cho booking dựa trên số ngày và giá phòng
            $productPrice = $room->into_money;
    
            // Tính tổng giá trị cho booking hiện tại
            $totalBookingPrice = $days * $product['quantity'] * $productPrice;
    
            // Tạo mới một booking cho sản phẩm này
            $booking = Booking::create([
                'user_id' => $userId,
                'detail_room_id' => $product['detail_room_id'], // Truy cập đúng ID phòng
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
                'guests' => $request->adult + $request->children,
                'adult' => $request->adult,
                'total_price' => $totalBookingPrice, // Lưu tổng giá trị cho từng booking
                'children' => $request->children,
                'quantity' => $product['quantity'], // Sử dụng quantity của sản phẩm
                'status' => 'pending',
            ]);
    
            // Thêm booking vào mảng bookings
            $bookings[] = $booking;
    
            // Cộng dồn tổng giá trị cho tất cả bookings
            $total_price += $totalBookingPrice;
        }
    
        return response()->json([
            'data' => $bookings,  // Trả về tất cả bookings đã tạo
            'total_price' => $total_price,  // Tổng giá trị cho tất cả bookings
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
        $booking->total_price = $totalMoney;
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