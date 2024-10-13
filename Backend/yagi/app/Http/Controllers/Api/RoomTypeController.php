<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\room;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{
    public function room(){
        $listRoomType = room::all();

        return response()->json([
            'data' => $listRoomType,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function store(Request $request) {
        $request->validate([
            'type_room' => 'required|max:255',
            'bed' => 'nullable' // Thêm vào nếu 'bed' có thể không được cung cấp
        ],[
            'type_room.required' => 'Vui lòng nhập tên loại phòng',
            'type_room.max' => 'Không được nhập quá 255 ký tự'
        ]);
    
        $newRoom = Room::create($request->only('type_room', 'bed'));
    
        return response()->json([
            'data' => $newRoom,
            'message' => 'Room created successfully',
            'status_code' => 201,
        ], 201); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function delete($id)  {
        Room::where('id',$id)->delete();
        return response()->json([
            
            'message' => 'Room deleted successfully',
            'status_code' => 200,
        ], 200); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function update(Request $request, $id)  {
        $request->validate([
            'type_room'=>'required|max:255'
        ],[
            'type_room.required'=>'Vui lòng nhập tên loại phòng',
            'type_room.max'=>'Không được nhập quá 255 ký tự'
        ]);
       $newRoom= Room::where('id',$id)->update($request->all('type_room','bed'));
        return response()->json([
            'data' => $newRoom,
            'message' => 'Room created successfully',
            'status_code' => 201,
        ], 201);
    }
    
}
