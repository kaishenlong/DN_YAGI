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
        // Lấy tất cả dữ liệu ngoại trừ 'image'
        $data = $request->except('image');

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            // Xóa hình ảnh cũ nếu tồn tại
            if ($city->image && file_exists(storage_path('app/public/' . $city->image))) {
                unlink(storage_path('app/public/' . $city->image));
            }

            // Lưu hình ảnh mới vào thư mục 'images' trên disk 'public'
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        // Cập nhật dữ liệu
        $updateCity = $city->update($data);

        // Trả về phản hồi JSON
        return response()->json([
            'data' => $city, // Trả về dữ liệu thành phố sau khi cập nhật
            'message' => 'City updated successfully',
            'status_code' => 201,
        ], 201);
    }
}
