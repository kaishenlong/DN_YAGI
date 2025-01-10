<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use App\Http\Requests\ResCity;

class CityController extends Controller
{
    public function City()
    {
        $listCity = City::get();

        return response()->json([
            'data' => $listCity,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function Cityid($id)
    {
        $City = City::find($id);
        return response()->json([
            'data' => $City,
            'message' => 'success'
        ], 200);
    }
    public function store(ResCity $request)
    {

        $data = ['name' => $request->name];
        $data['image'] = "";
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $data_image_path = $request->file('image')->store('images', 'public');
            $data['image'] = $data_image_path;
        } else {
            $data['image'] = ""; // Hoặc bạn có thể gán giá trị null hoặc không gán gì cả
        }
        $newcity = City::create($data);

        return response()->json([
            'data' => $newcity,
            'message' => 'city created successfully',
            'status_code' => 201,
        ], 201); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function delete(City $city)
    {
        $city->delete();
        return response()->json([

            'message' => 'City deleted successfully',
            'status_code' => 200,
        ], 200); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function update(ResCity $request, City $city)
    {

        $data = $request->except('image');
        if ($request->hasFile('image')) {
            // Xóa hình ảnh cũ nếu có
            if ($city->image) {
                if (file_exists('storage/' . $city->image)) {
                    unlink('storage/' . $city->image);
                }
            }
            // Lưu hình ảnh mới
            $data['image'] = $request->file('image')->store('images');
        }

        $updateCity = $city->update($data);
        return response()->json([
            'data' => $updateCity,
            'message' => 'City updated successfully',
            'status_code' => 201,
        ], 201);
    }
}
