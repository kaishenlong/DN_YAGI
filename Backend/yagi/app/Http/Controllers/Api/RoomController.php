<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\room;
use App\Models\DetailRoom;
use App\Models\RoomAvailability;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Requests\DetailRoomRequest;
class RoomController extends Controller
{
    public function showRoomsByUser(Request $req, $hotelId)
    {
        // Lấy người dùng đã đăng nhập
        $user = Auth::user(); // Sử dụng Auth::user() để lấy người dùng đã đăng nhập

        // Kiểm tra xem người dùng có tồn tại không
        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated',
                'status_code' => '401' // 401 cho trường hợp chưa đăng nhập
            ], 401);
        }

        // Tìm khách sạn thuộc người dùng đã đăng nhập
        $hotel = $user->hotels()->find($hotelId);

        // Kiểm tra xem khách sạn có tồn tại không
        if (!$hotel) {
            \Log::error('Hotel not found for User ID: ' . $user->id . ' and Hotel ID: ' . $hotelId); // Ghi log nếu không tìm thấy khách sạn
            return response()->json([
                'message' => 'Hotel not found for this user',
                'status_code' => '404'
            ], 404);
        }

        // Lấy tất cả các phòng của khách sạn
        $rooms = $hotel->detailRooms;

        // Kiểm tra xem khách sạn có phòng không
        if ($rooms->isEmpty()) {
            return response()->json([
                'message' => 'No rooms found for this hotel',
                'status_code' => '404'
            ], 404);
        }

        return response()->json([
            'data' => $rooms,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }


    public function detailroom()
    {
        $listRoom = DetailRoom::get();

        return response()->json([
            'data' => $listRoom,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function showroom(Request $req, $id)
    {
        $room = DetailRoom::orderBy('created_at', 'desc')->find($id);

        return response()->json([
            'data' => $room,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function store(Request $req)
    {
        $into_money = $req->price + $req->price_surcharge;
        $available = $req->available_rooms > 0 ? 1 : 0;
        $is_active = $req->available_rooms > 0 ? 1 : 0;

        // Tạo bản ghi chi tiết phòng
        $newDetailroom = DetailRoom::create([
            'room_id' => $req->room_id,
            'hotel_id' => $req->hotel_id,
            'price' => $req->price,
            'price_surcharge' => $req->price_surcharge,
            'available' => $available,
            'description' => $req->description,
            'into_money' => $into_money,
            'image' => '',
            'available_rooms' => $req->available_rooms,
            'is_active' => $is_active,
        ]);

        // Tạo bản ghi phòng cho các ngày (room_availability)
        $startDate = Carbon::now(); // Ngày bắt đầu
        $endDate = Carbon::now()->addMonths(3); // Ngày kết thúc

        $currentDate = $startDate;
        while ($currentDate->lte($endDate)) {
            RoomAvailability::create([
                'detail_room_id' => $newDetailroom->id,
                'date' => $currentDate->toDateString(),
                'available_rooms' => $req->available_rooms,
            ]);
            $currentDate->addDay(); // Tiến đến ngày tiếp theo
        }

        return response()->json([
            'data' => $newDetailroom,
            'message' => 'DetailRoom created successfully',
            'status_code' => 200,
        ], 200);
    }

    public function update(Request $req, DetailRoom $detail)
    {
        // Tính toán lại 'into_money' nếu có thay đổi
        if ($req->has('price') && $req->has('price_surcharge')) {
            $into_money = $req->price + $req->price_surcharge;
            $data['into_money'] = $into_money;
        }
    
        // Cập nhật dữ liệu khác từ request
        $data = $req->except('image');
    
        // Cập nhật hình ảnh nếu có
        if ($req->hasFile('image')) {
            // Xóa hình ảnh cũ nếu có
            if ($detail->image) {
                if (file_exists(storage_path('app/public/' . $detail->image))) {
                    unlink(storage_path('app/public/' . $detail->image));
                }
            }
            // Lưu hình ảnh mới
            $data['image'] = $req->file('image')->store('images');
        }
    
        // Cập nhật thông tin chi tiết phòng
        $detail->update($data);
    
        // Cập nhật giá trị available dựa trên available_rooms
        if ($detail->available_rooms <= 0) {
            $detail->available = 0; // Đánh dấu là hết phòng
            $detail->is_active = 0;  // Đánh dấu là phòng không còn hoạt động
        } else {
            $detail->available = 1; // Đánh dấu là còn phòng
            $detail->is_active = 1;  // Đánh dấu là phòng còn hoạt động
        }
    
        // Lưu lại sự thay đổi về available
        $detail->save();
    
        // Cập nhật gallery nếu có hình ảnh mới
        if ($req->hasFile('gallery')) {
            // Xóa các hình ảnh cũ trong gallery
            $detail->gallery()->delete();
            // Lưu các hình ảnh mới vào gallery
            foreach ($req->file('gallery') as $image) {
                $imagePath = $image->store('images/gallery'); // Lưu từng ảnh
                // Tạo bản ghi mới trong bảng gallery
                $detail->gallery()->create(['images' => $imagePath]);
            }
        }
    
        // Cập nhật số lượng phòng cho từng ngày trong bảng room_availabilities
        if ($req->has('available_rooms')) {
            // Lấy số lượng phòng mới
            $newAvailableRooms = $req->available_rooms;
    
            // Cập nhật lại số lượng phòng cho tất cả các ngày trong room_availabilities
            // Dựa trên thời gian mà phòng được cập nhật
            $roomAvailabilities = $detail->roomAvailabilities;
            foreach ($roomAvailabilities as $roomAvailability) {
                $roomAvailability->update([
                    'available_rooms' => $newAvailableRooms
                ]);
            }
        }
    
        return response()->json([
            'data' => $detail, // Trả về chi tiết phòng đã cập nhật
            'message' => 'DetailRoom updated successfully',
            'status_code' => 200,
        ], 200);
    }
    
    public function destroyDetail(DetailRoom $detail)
    {
        // Xóa tất cả bản ghi liên quan trong bảng room_availabilities
        $detail->roomAvailabilities()->delete();
        // Tìm chi tiết phòng cần xóa dựa vào ID
        if ($detail->image) {
            if (file_exists('storage/' . $detail->image)) {
                unlink('storage/' . $detail->image);
            }
        }
        foreach ($detail->gallery as $image) {
            if (file_exists('storage/' . $image->images)) {
                unlink('storage/' . $image->images);
            }
        }
        $detail->gallery()->delete();
        $detail->delete();

        // Xóa chi tiết phòng

        return response()->json(['message' => 'Chi tiết phòng đã được xóa'], 200);
    }


    public function search(Request $request)
    {
        $rooms = Room::with('details')
            ->where('type_room', 'like', '%' . $request->type . '%')
            ->whereHas('details', function ($query) use ($request) {
                $query->where('price', '>=', $request->min_price)
                    ->where('price', '<=', $request->max_price);
            })
            ->get();

        return response()->json($rooms);
    }
}