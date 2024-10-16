<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\MoMoController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomTypeController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
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


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->post('/logout',[AuthController::class,'logout']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages', [ChatController::class, 'index']);
    Route::post('/messages', [ChatController::class, 'store']);
});
Route::prefix('city')->group(function () {
    Route::get('/', [CityController::class, 'City']);
    Route::post('store', [CityController::class, 'store']);
    Route::put('/update/{city}', [CityController::class, 'update']);
    Route::delete('/delete/{city}', [CityController::class, 'delete']);
});
Route::apiResource('hotel',HotelController::class);
Route::put('/hotel/{hotel}/status', [HotelController::class, 'changeStatus'])->middleware('role:business');
Route::apiResource('reviews', ReviewController::class);
Route::prefix('room')->group(function () {
    Route::get('rooms', [RoomController::class, 'detailroom']);
    Route::post('rooms', [RoomController::class, 'store']);
    Route::get('/rooms/{id}', [RoomController::class, 'showroom']);
    Route::put('/rooms/{detail}', [RoomController::class, 'update']);
    Route::delete('/rooms/{detail}', [RoomController::class, 'destroyDetail']);
});

Route::prefix('room-type')->group(function () {
    Route::get('/', [RoomTypeController::class, 'room']);
    Route::post('store', [RoomTypeController::class, 'store']);
    Route::get('/rooms/{id}', [RoomTypeController::class, 'showroom']);
    Route::put('/update/{id}', [RoomTypeController::class, 'update']);
    Route::delete('/delete/{id}', [RoomTypeController::class, 'delete']);
});
Route::apiResource('users', UserController::class);
Route::put('/users/{user}/status', [UserController::class, 'changeStatus'])->middleware('role:admin');
Route::post('/momo/create', [MoMoController::class, 'createPayment']);
Route::get('/momo/return', [MoMoController::class, 'returnPayment']);