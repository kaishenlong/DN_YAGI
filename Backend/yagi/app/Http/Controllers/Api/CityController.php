<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use App\Http\Requests\ResCity;
class CityController extends Controller
{
    public function City(){
        $listCity = City::get();

        return response()->json([
            'data' => $listCity,
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
    public function store(ResCity $request) {
        $request->validate([
            'name' => 'required',
        ]);
        $data = ['name' => $request->name];
        $newcity = City::create($data);
    
        return response()->json([
            'data' => $newcity,
            'message' => 'city created successfully',
            'status_code' => 201,
        ], 201); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function delete(City $city)  {
        $city->delete();
        return response()->json([
            
            'message' => 'City deleted successfully',
            'status_code' => 200,
        ], 200); // Đặt mã trạng thái HTTP ở đây là 201 cho nhất quán
    }
    public function update(ResCity $request, City $city)  {

        $data = ['name' => $request->name];
       $updateCity= $city->update($data);
        return response()->json([
            'data' => $updateCity,
            'message' => 'City updated successfully',
            'status_code' => 201,
        ], 201);
    }
}