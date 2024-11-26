<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use App\Http\Requests\ResHote;
use App\Models\City;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listHotel = Hotel::orderBy('id','desc')->get();

        return response()->json([
            'data' => $listHotel,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function hotelAndRoom()
    {
        $listHotel = Hotel::with('detailrooms')->get();

        return response()->json([
            'data' => $listHotel,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = [
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'city_id' => $request->city_id,
            'address' => $request->address,
            'email' => $request->email,
            'phone' => $request->phone,
            'rating' => $request->rating,
            'description' => $request->description,
            'map' => $request->map,
            'status' => "active",
            'user_id' => $request->user_id,
        ];
        $data['image'] = "";
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $data_image_path = $request->file('image')->store('images', 'public');
            $data['image'] = $data_image_path;
        } else {
            $data['image'] = ""; // Hoặc bạn có thể gán giá trị null hoặc không gán gì cả
        }
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

        if ($request->hasFile('image')) {
            if ($request->image != null) {
                if (file_exists('storage/' . $hotel->image)) {
                    unlink('storage/' . $hotel->image);
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
        if (file_exists('storage/' . $hotel->image)) {
            unlink('storage/' . $hotel->image);
        }
        $hotel->delete();
        return response()->json(['
         message' => 'Hotel deleted successfully']);
    }
    public function changeStatus(Hotel $hotel)
    {
        $hotel->status = $hotel->status === 'active' ? 'inactive' : 'active';
        $hotel->save();
        return response()->json(['message' => 'User status updated successfully', 'data' => $hotel], 200);
    }
    public function searchByCity(Request $request, $cityId)
    {
        // Lấy city_id từ request
        // $cityId = $request->input('city_id');

        // // Kiểm tra nếu city_id không được truyền
        // if (!$cityId) {
        //     return response()->json(['error' => 'City ID is required'], 400);
        // }

        // Lấy danh sách khách sạn theo city_id
        $hotels = Hotel::where('city_id', $cityId)->get();

        return response()->json([
            'data' => $hotels,
            'status_code' => 200,
            'message' => 'Hotels fetched successfully'
        ], 200);
    }
}
