<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('room')->group(function () {
    Route::get('rooms', [RoomController::class, 'detailroom']);
    Route::post('rooms', [RoomController::class, 'store']);
    Route::get('/rooms/{id}', [RoomController::class, 'showroom']);
    Route::put('/rooms/{detail}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroyDetail']);
});

Route::prefix('room-type')->group(function () {
    Route::get('/', [RoomTypeController::class, 'room']);
    Route::post('store', [RoomTypeController::class, 'store']);
    Route::get('/rooms/{id}', [RoomTypeController::class, 'showroom']);
    Route::put('/update/{id}', [RoomTypeController::class, 'update']);
    Route::delete('/delete/{id}', [RoomTypeController::class, 'delete']);
});
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->post('/logout',[AuthController::class,'logout']);
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('city')->group(function () {
        Route::get('/', [CityController::class, 'City']);
        Route::post('store', [CityController::class, 'store']);
        Route::put('/update/{city}', [CityController::class, 'update']);
        Route::delete('/delete/{city}', [CityController::class, 'delete']);
    });
    Route::apiResource('hotel',HotelController::class);

});