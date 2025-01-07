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
    public function showroom($id){
        $detailRoom = room::find($id);

        return response()->json([
            'data' => $detailRoom,
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
        $room= Room::where('id',$id)->first();
        $room->delete();
        return response()->json([
            
            'message' => 'Room deleted successfully',
            'status_code' => 200,
        ], 200); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function update(ResRoomType $request, $id)  {
       
       $newRoom= Room::where('id',$id)->first();
    //    $newRoom->type_room=$request->type_room;
    //    $newRoom->bed=$request->bed;
       $newRoom->update(["type_room"=>$request->type_room,"bed"=>$request->bed]);
        return response()->json([
            'data' => $newRoom,
            'message' => 'Room created successfully',
            'status_code' => 201,
        ], 201);
    }

    
}