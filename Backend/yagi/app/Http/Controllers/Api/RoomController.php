<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\room;
use App\Models\DetailRoom;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Requests\DetailRoomRequest;
class RoomController extends Controller
{
    public function room()
    {
        $listRoom = room::select('type_room', 'bed')->get();

        return response()->json([
            'data' => $listRoom,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
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
        $room = DetailRoom::find($id);

        return response()->json([
            'data' => $room,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function store(Request $req)
    {
        $into_money = $req->price + $req->price_surcharge;
        $available = $req->available_rooms > 0 ? 1 : 0; // 0 còn phòng, 1 hết phòng
        $is_active = $req->available_rooms > 0 ? 1 : 0; // 1 nếu phòng còn hoạt động, 0 nếu phòng không hoạt động
        $data = [
            'room_id' => $req->room_id,
            'hotel_id' => $req->hotel_id,
            'price' => $req->price,
            'price_surcharge' => $req->price_surcharge,
            'available' => $available,
            'description' => $req->description,
            'into_money' => $into_money,
            'image' => '',
            'available_rooms' => $req->available_rooms, // Số lượng phòng hiện có
            'is_active' => $is_active, // Trạng thái phòng còn hoạt động hay không

        ];

        if ($req->hasFile('image')) {
            $data['image'] = $req->file('image')->store('images'); // Lưu ảnh đơn
        }
        // Tạo bản ghi mới
        $newDetailroom = DetailRoom::create($data);
        if ($req->hasFile('gallery')) {
            foreach ($req->file('gallery') as $image) {
                $imagePath = $image->store('images'); // Lưu từng ảnh
                // Tạo bản ghi trong bảng images
                $newDetailroom->gallery()->create(['images' => $imagePath]);
            }
        }
        // Cập nhật số lượng phòng khi đặt phòng
        $newDetailroom->available_rooms -= $req->quantity; // Giảm số lượng phòng theo số lượng người đặt
        // Kiểm tra lại số lượng phòng, nếu = 0 thì đổi available thành 1 (hết phòng) và đổi trạng thái phòng thành không hoạt động
        if ($newDetailroom->available_rooms <= 0) {
            $newDetailroom->available = 0; // Đánh dấu là hết phòng
            $newDetailroom->is_active = 0; // Đánh dấu phòng không còn hoạt động
        } else {
            $newDetailroom->available = 1; // Đánh dấu là còn phòng
            $newDetailroom->is_active = 1; // Đánh dấu phòng còn hoạt động
        }
        $newDetailroom->save();
        // Trả về JSON response
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
        $data = $req->except('image');
        if ($req->hasFile('image')) {
            // Xóa hình ảnh cũ nếu có
            if ($detail->image) {
                if (file_exists('storage/' . $detail->image)) {
                    unlink('storage/' . $detail->image);
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
        // Cập nhật gallery
        if ($req->hasFile('gallery')) {
            $detail->gallery()->delete();
            foreach ($req->file('gallery') as $image) {
                $imagePath = $image->store('images/gallery'); // Lưu từng ảnh
                // Tạo bản ghi mới trong bảng gallery
                $detail->gallery()->create(['images' => $imagePath]);
            }
        }

        return response()->json([
            'data' => $detail, // Trả về chi tiết phòng đã cập nhật
            'message' => 'DetailRoom updated successfully',
            'status_code' => 200,
        ], 200);
    }

    public function uploadImages(Request $request)
    {
        // Kiểm tra xem có ảnh không
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            foreach ($images as $image) {
                // Lưu ảnh vào thư mục public/images
                $image->move(public_path('images'), $image->getClientOriginalName());
            }

            return response()->json(['success' => 'Images uploaded successfully.']);
        }

        return response()->json(['error' => 'No images found.']);
    }
    public function destroyDetail(DetailRoom $detail)
    {
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