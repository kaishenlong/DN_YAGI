<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
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
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required',
            'city_id'=>'required',
            'address'=>'required',
            'email' => 'required|email',
            'phone' => 'required',
            'rating' => ' required',
            'description' => 'required',
            'map' => 'required',
            'user_id' => 'required'
        ]);
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            $img = $request->file('image');
            $imgName = time() . '.' . $img->getClientOriginalExtension();
            $img->move(public_path('images/'), $imgName);
            $data['image'] = $imgName;
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

   
  
    public function update(Request $request, Hotel $hotel)
    {
        // $request->validate([
        //     'name' => 'required|max:255',
        //     'city_id' => 'required',
        //     'address' => 'required',
        //     'email' => 'required|email',
        //     'phone' => 'required',
        //     'rating' => 'required',
        //     'description' => 'required',
        //     'image' => 'required|image',
        //     'map' => 'required',
        //     'user_id' => 'required'
        // ]);
    
        // Lấy tất cả dữ liệu trừ image
        $data = $request->except('image');
    
        // Kiểm tra xem có file ảnh mới được tải lên không
        if ($request->hasFile('image')) {
            // Đường dẫn tới ảnh cũ
            $imgOld = public_path('images/') . $hotel->image;
    
            // Xóa ảnh cũ nếu tồn tại
            if (File::exists($imgOld)) {
                File::delete($imgOld);
            }
    
            // Lưu ảnh mới
            $img = $request->file('image');
            $imgName = time() . '.' . $img->getClientOriginalExtension(); // Sử dụng `time()` để tránh trùng lặp tên file
            $img->move(public_path('images/'), $imgName);
            $data['image'] = $imgName; // Cập nhật tên ảnh mới vào dữ liệu
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
        $imgOld="images/".$hotel->image;
        if(FacadesFile::exists($imgOld)){
            FacadesFile::delete($imgOld);
        }
        $hotel->delete();
        return response()->json(['
         message' => 'Hotel deleted successfully']);
    }
}
