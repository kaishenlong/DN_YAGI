<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use App\Http\Requests\ResHote;
class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listHotel = Hotel::all();

        return response()->json([
            'data' => $listHotel,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(ResHote $request)
    {
       
        $data = $request->except('image');
        $data_image_path = $request->file('image')->store('images');
        $data['image'] = $data_image_path;
        $newHotel = Hotel::create($data);
        return response()->json([
            'data' => $newHotel,
            'message' => 'Hotel created successfully',
            'status_code' => 201,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hotel $hotel)
    {
        return  response()->json($hotel);
    }

   
  
   public function update(ResHote  $request, Hotel $hotel)
    {
        // Lấy tất cả dữ liệu trừ image
        $data = $request->except('image');
    
        if($request->hasFile('image')){
            if($request->image != null){
               if(file_exists('storage/'. $hotel->image)){
                    unlink('storage/'. $hotel->image);
            }
        }
        $data_image_path = $request->file('image')->store('images');
        $data['image'] = $data_image_path;
        }
        // Cập nhật thông tin hotel
        $hotel->update($data);
    
        return response()->json([
            'data' => $hotel,
            'message' => 'Hotel updated successfully',
            'status_code' => 200,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        if(file_exists('storage/'. $hotel->image)){
            unlink('storage/'. $hotel->image);
    }
        $hotel->delete();
        return response()->json(['
         message' => 'Hotel deleted successfully']);
    }
    public function changeStatus(Hotel $hotel){
        $hotel->status = $hotel->status === 'active' ? 'inactive' : 'active';
        $hotel->save();
        return response()->json(['message' => 'User status updated successfully', 'data' => $hotel], 200);
    }
}