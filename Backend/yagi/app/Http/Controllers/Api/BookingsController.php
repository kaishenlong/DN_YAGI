<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\DetailRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ReqBooking;
use App\Models\DetailPayment;
use App\Models\service;
use Illuminate\Support\Facades\Auth;

class BookingsController extends Controller
{
    public function index()
    {
        // Lấy ID của người dùng đã đăng nhập
        $userId = Auth::id();

        // Lọc các booking của người dùng hiện tại
        $bookings = Booking::where('user_id', $userId)->with(['detailrooms.room', 'detailrooms.hotel'])
            ->orderBy("created_at", "desc")
            ->get();

        // Kiểm tra nếu không có booking nào
        if ($bookings->isEmpty()) {
            return response()->json([
                'message' => 'No bookings found',
                'status_code' => 404,
            ], 404);
        }

        // Trả về danh sách booking của người dùng hiện tại
        return response()->json([
            'data' => $bookings,
            'message' => 'Bookings retrieved successfully',
            'status_code' => 200,
        ], 200);
    }

    // public function store(Request $request)
    // {
    //     // Lấy ID người dùng
    //     $userId = Auth::id();
    //     $total_price = 0; // Tổng giá trị cho tất cả bookings

    //     $bookings = []; // Mảng lưu trữ các bookings

    //     foreach ($request->products as $product) {
    //         // Lấy thông tin chi tiết phòng từ bảng DetailRoom
    //         $room = DetailRoom::find($product['detail_room_id']);
    //         if (!$room) {
    //             return response()->json(['error' => 'Room not found'], 404);
    //         }

    //         // Kiểm tra xem có đủ phòng không
    //         if ($room->available_rooms < $product['quantity']) {
    //             return response()->json(['error' => 'Not enough rooms available'], 400);
    //         }

    //         // Cập nhật lại số lượng phòng còn lại
    //         $room->available_rooms -= $product['quantity'];
    //         $room->save();

    //         // Chuyển đổi check_in và check_out thành đối tượng Carbon
    //         $checkIn = Carbon::parse($product['check_in']);
    //         $checkOut = Carbon::parse($product['check_out']);

    //         // Tính số ngày giữa check_in và check_out
    //         $days = $checkOut->diffInDays($checkIn);
    //         if ($days <= 0) {
    //             return response()->json(['error' => 'Invalid date range'], 400);
    //         }

    //         // Tính giá trị cho booking dựa trên số ngày và giá phòng
    //         $productPrice = $room->into_money;

    //         // Tính tổng giá trị cho booking hiện tại
    //         $totalBookingPrice = $days * $product['quantity'] * $productPrice;

    //         // Tạo mới một booking cho sản phẩm này
    //         $booking = Booking::create([
    //             'user_id' => $userId,
    //             'detail_room_id' => $product['detail_room_id'], // Truy cập đúng ID phòng
    //             'check_in' => $checkIn,
    //             'check_out' => $checkOut,
    //             'guests' => $product['adult'] + $product['children'],
    //             'adult' => $product['adult'],
    //             'total_price' => $totalBookingPrice, // Lưu tổng giá trị cho từng booking
    //             'children' => $product['children'],
    //             'quantity' => $product['quantity'], // Sử dụng quantity của sản phẩm
    //             'status' => 'pending',
    //         ]);

    //         // Thêm booking vào mảng bookings
    //         $bookings[] = $booking;

    //         // Cộng dồn tổng giá trị cho tất cả bookings
    //         $total_price += $totalBookingPrice;
    //     }

    //     return response()->json([
    //         'data' => $bookings,  // Trả về tất cả bookings đã tạo
    //         'total_price' => $total_price,  // Tổng giá trị cho tất cả bookings
    //         'message' => 'Booking created successfully',
    //         'status_code' => 201,
    //     ], 201);
    // }


    public function show($id)
    {
        $booking = Booking::orderBy("created_at", "desc")->find($id);

        if (!$booking) {
            return response()->json(['message' => 'Không tìm thấy phòng đã đặt '], 404);
        }

        return response()->json([
            'data' => $booking,
            'status_code' => 200,
        ]);
    }

    // public function update(ReqBooking $request, $id)
    // {

    //     if (!Auth::check()) {
    //         return response()->json(['error' => 'User not logged in'], 401);
    //     }

    //     // Lấy ID người dùng hiện tại
    //     $userId = Auth::id();

    //     // Tìm booking hiện có

    //     // Tìm booking hiện có
    //     $booking = Booking::find($id);
    //     $detailbooking =  DetailPayment::where('booking_id', $id)->first();  // Tải thông tin liên quan (payment và booking)
    //     $service = service::get();

    //     if (!$booking) {
    //         return response()->json(['error' => 'Không tìm thấy booking'], 404);
    //     }

    //     $booking->user_id = $userId;
    //     // Cập nhật chỉ status của booking
    //     if ($request->has('status')) {
    //         $booking->status = $request->status;
    //         $booking->save();
    //         foreach ($service as $service){
    //             $totalmoney = $service->price + $booking->total_price;
    //             $booking->total_price = $totalMoney; // Cập nhật lại tổng tiền của booking
    //             $booking->save();
    //             $data = [
    //                 'payment_id'=> $detailbooking->payment_id,
    //                 'booking_id'=> $booking,
    //                 'service_id'=> $service,
    //             ];

    //             $data2 = [
    //                 'total_price'=>$totalmoney,
    //             ];

    //             DetailPayment::create($data);  
    //         }

    //     } else {
    //         return response()->json(['error' => 'Status is required'], 400);
    //     }

    //     return response()->json([
    //         'data' => $booking,
    //         'message' => 'Booking status updated successfully',
    //         'status_code' => 200,
    //     ], 200);
    // }
    public function update(ReqBooking $request, $id)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'User not logged in'], 401);
        }

        // Lấy ID người dùng hiện tại
        $userId = Auth::id();

        // Tìm booking hiện có
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json(['error' => 'Không tìm thấy booking'], 404);
        }

        // Lấy thông tin chi tiết payment
        $detailbooking = DetailPayment::where('booking_id', $id)->first(); // Lấy 1 bản ghi nếu có

        // Kiểm tra và lấy danh sách dịch vụ đã chọn từ request
        $selectedServiceIds = $request->input('services', []);
        if (empty($selectedServiceIds)) {
            return response()->json(['error' => 'Không có dịch vụ nào được chọn'], 400);
        }

        // Lấy danh sách dịch vụ từ cơ sở dữ liệu theo các ID đã chọn
        $services = Service::whereIn('id', $selectedServiceIds)->get();

        // if ($services->isEmpty()) {
        //     return response()->json(['error' => 'Dịch vụ không tồn tại'], 404);
        // }

        // Cập nhật status cho booking
        if ($request->has('status')) {
            $booking->user_id = $userId;
            $booking->status = $request->status;
            $booking->save();

            // Tính tổng tiền mới của booking (cộng thêm tiền các dịch vụ đã chọn)
            $totalPrice = $booking->total_price;
            foreach ($services as $service) {
                $totalPrice += $service->price;
            }

            // Cập nhật lại tổng tiền cho booking
            $booking->total_price = $totalPrice;
            $booking->save();

            // Lưu thông tin các dịch vụ vào bảng DetailPayment
            foreach ($services as $service) {
                $data = [
                    'payment_id' => $detailbooking->payment_id,
                    'booking_id' => $booking->id,
                    'service_id' => $service->id,
                    'user_id' => $userId
                ];

                DetailPayment::create($data);  // Thêm mới thông tin vào bảng DetailPayment
            }

            // Trả về kết quả
            return response()->json([
                'data' => $booking,
                'message' => 'Booking status updated and services added successfully',
                'status_code' => 200,
            ], 200);
        } else {
            return response()->json(['error' => 'Status is required'], 400);
        }
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