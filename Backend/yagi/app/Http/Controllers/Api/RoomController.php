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
        'gallery_id' => $req->gallery_id,
        'into_money' => $req->into_money,
        'image' => '',
    ];
    
    // Kiểm tra nếu có file ảnh được gửi    lên
    if ($req->hasFile('image')) {
        $img = $req->file('image');
        // Sử dụng time() để tạo tên ảnh duy nhất
        $imgName = time() . '.' . $img->getClientOriginalExtension();
        $img->move(public_path('images/'), $imgName);
        $data['image'] = $imgName; // Lưu tên ảnh vào dữ liệu
    }

    // Tạo bản ghi mới
    $newDetailroom = detailroom::create($data);

    // Trả về JSON response
    return response()->json([
        'data' => $newDetailroom,
        'message' => 'DetailRoom created successfully',
        'status_code' => 200,
    ], 200);
}
public function update(Request $req, detailroom $detail)
{
    
    $data = $req->except('image');

    if ($req->hasFile('image')) {
        $imgOld = public_path('images/') . $detail->image;

        if (File::exists($imgOld)) {
            File::delete($imgOld);
        }

        $img = $req->file('image');
        $imgName = time() . '.' . $img->getClientOriginalExtension();
        $img->move(public_path('images/'), $imgName);
        $data['image'] = $imgName;
    }

    $updateDetailRoom = $detail->update($data);

    return response()->json([
        'data' => $updateDetailRoom,
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
    public function destroyDetail(Room $room, $detailId){
        // Tìm chi tiết phòng cần xóa dựa vào ID
        $detailRoom = $room->details()->find($detailId);

        if (!$detailRoom) {
            return response()->json(['message' => 'Chi tiết phòng không tồn tại'], 404);
        }

        // Xóa chi tiết phòng
        $detailRoom->delete();

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
