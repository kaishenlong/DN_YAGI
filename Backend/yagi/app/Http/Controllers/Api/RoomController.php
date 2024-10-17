<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\room;
use App\Models\DetailRoom;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Requests\DetailRoomRequest;
class RoomController extends Controller
{
    public function room(){
        $listRoom = room::select('type_room','bed')->get();

        return response()->json([
            'data' => $listRoom,
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
    public function showroom(Request $req,$id){
        $room = DetailRoom::find($id);

        return response()->json([
            'data' => $room,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function store(Request $req)
{
    $data = [
        'room_id' => $req->room_id,
        'hotel_id' => $req->hotel_id,
        'price' => $req->price,
        'price_surcharge' => $req->price_surcharge,
        'available' => $req->available,
        'description' => $req->description,
        'into_money' => $req->into_money,
        'image' => '',
       
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
    // Trả về JSON response
    return response()->json([
        'data' => $newDetailroom,
        'message' => 'DetailRoom created successfully',
        'status_code' => 200,
    ], 200);
}
public function update(Request $req, DetailRoom $detail)
{
    
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
        if($request->hasFile('images')) {
            $images = $request->file('images');
            foreach($images as $image) {
                // Lưu ảnh vào thư mục public/images
                $image->move(public_path('images'), $image->getClientOriginalName());
            }

            return response()->json(['success' => 'Images uploaded successfully.']);
        }

        return response()->json(['error' => 'No images found.']);
    }
    public function destroyDetail(DetailRoom $detail){
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
