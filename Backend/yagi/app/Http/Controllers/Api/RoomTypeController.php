<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\room;
use Illuminate\Http\Request;
use App\Http\Requests\ResRoomType;
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
    public function store(ResRoomType $request) {
      
    
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
    public function update(ResRoomType $request, $id)  {
       
       $newRoom= Room::where('id',$id)->update($request->all('type_room','bed'));
        return response()->json([
            'data' => $newRoom,
            'message' => 'Room created successfully',
            'status_code' => 201,
        ], 201);
    }
    
}