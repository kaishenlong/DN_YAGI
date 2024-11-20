<?php

namespace App\Http\Controllers\Api;

use App\Models\DetailRoom;
use Carbon\Carbon;
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
            'status' => $request->status,
            'user_id' => $request->user_id,

        ];
        $data['image'] = "";
        if ($request->hasFile('image')) {
            $data_image_path = $request->file('image')->store('images');
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
        return response()->json($hotel);
    }



    public function update(ResHote $request, Hotel $hotel)
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
         message' => 'Hotel deleted successfully'
        ]);
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

    public function search(Request $request)
    {
        // Lấy các tham số từ request
        $cityName = $request->input('city_name');
        $name = $request->input('name');
        $rating = $request->input('rating');

        // Khởi tạo query builder
        $query = Hotel::query();

        // Nếu có tên thành phố, tìm thành phố đó
        if ($cityName) {
            // Tìm thành phố theo tên
            $city = City::where('name', 'like', '%' . $cityName . '%')->first();

            if ($city) {
                // Nếu tìm thấy thành phố, tìm khách sạn có city_id tương ứng
                $query->where('city_id', $city->id);
            } else {
                // Nếu không tìm thấy thành phố, trả về lỗi
                return response()->json([
                    'message' => 'Nơi bạn tìm kiếm hiện tại chúng tôi chưa có khách sạn liên kết.',
                    'status_code' => 404
                ], 404);
            }
        }

        // Thêm các điều kiện tìm kiếm khác (tên khách sạn, rating)
        if ($name) {
            $query->where('name', 'like', '%' . $name . '%');
        }

        if ($rating) {
            $query->where('rating', '>=', $rating);
        }

        // Lấy kết quả tìm kiếm
        $hotels = $query->get();

        // Trả về kết quả dưới dạng JSON
        return response()->json([
            'data' => $hotels,
            'status_code' => 200,
            'message' => 'Hotels fetched successfully',
        ], 200);
    }
    /**
     * Tìm kiếm khách sạn trống theo ngày bắt đầu và ngày kết thúc
     */
    public function searchAvailableHotels(Request $request)
    {
        // Lấy ngày bắt đầu và ngày kết thúc từ request
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Kiểm tra nếu không có ngày bắt đầu hoặc ngày kết thúc
        if (!$startDate || !$endDate) {
            return response()->json([
                'message' => 'Ngày bắt đầu và ngày kết thúc là bắt buộc.',
                'status_code' => 400
            ], 400);
        }

        // Đảm bảo ngày bắt đầu và ngày kết thúc hợp lệ
        try {
            $startDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ngày bắt đầu và ngày kết thúc không hợp lệ.',
                'status_code' => 400
            ], 400);
        }

        // Tìm các khách sạn không có booking trong khoảng thời gian từ $startDate đến $endDate
        $hotels = Hotel::whereDoesntHave('detailRooms.bookings', function ($query) use ($startDate, $endDate) {
            // Lọc booking trùng với khoảng thời gian người dùng yêu cầu
            $query->where(function ($query) use ($startDate, $endDate) {
                $query->where('check_in', '<', $endDate)
                    ->where('check_out', '>', $startDate);
            });
        })->get();

        // Trả về kết quả
        return response()->json([
            'data' => $hotels,
            'status_code' => 200,
            'message' => 'Khách sạn trống được tìm thấy.'
        ], 200);
    }


}
