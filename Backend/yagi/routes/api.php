<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingsController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\MoMoController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomTypeController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ThongKeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VnPayController;
use App\Http\Controllers\Api\Cart;
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


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages', [ChatController::class, 'index']);
    Route::post('/messages', [ChatController::class, 'store']);
    Route::put('/users/{user}/status', [UserController::class, 'changeStatus'])->middleware('role:admin');
    Route::apiResource('reviews', ReviewController::class);
});
Route::middleware('auth:sanctum')->put('/change-password', [AuthController::class, 'changePassword']);
Route::prefix('city')->group(function () {
    Route::get('/', [CityController::class, 'City']);
    Route::post('store', [CityController::class, 'store']);
    Route::put('/update/{city}', [CityController::class, 'update']);
    Route::delete('/delete/{city}', [CityController::class, 'delete']);
});
Route::apiResource('hotel', HotelController::class);

Route::get('/hotelandroom', [HotelController::class, 'hotelAndRoom']);

Route::prefix('hotel')->group(function () {
    Route::get('search-by-city/{city}', [HotelController::class, 'searchByCity']);
    Route::put('/{hotel}/status', [HotelController::class, 'changeStatus'])->middleware('role:business');
});
Route::get('/reviewsall', [ReviewController::class, 'indexAll']);
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

Route::prefix('payment')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [PaymentController::class, 'index']); // Danh sách thanh toán
    Route::post('/create', [PaymentController::class, 'store']); // Tạo thanh toán
    Route::post('/add-pay', [PaymentController::class, 'PayCart']); // Tạo thanh toán
    Route::get('/show/{id}', [PaymentController::class, 'show']); // Chi tiết thanh toán
    Route::put('/update/{id}', [PaymentController::class, 'update']); // Cập nhật thanh toán
    Route::delete('/delete/{id}', [PaymentController::class, 'delete']); // Xóa thanh toán
    Route::post('/callback', [PaymentController::class, 'paymentCallback']); // Xử lý callback thanh toán
});;

Route::prefix('dashboard')->group(function () {
    Route::get('/', [ThongKeController::class, 'index']);
    // Route::post('store', [RoomTypeController::class, 'store']);
    // Route::get('/rooms/{id}', [RoomTypeController::class, 'showroom']);
    // Route::put('/update/{id}', [RoomTypeController::class, 'update']);
    // Route::delete('/delete/{id}', [RoomTypeController::class, 'delete']);
});
Route::prefix('booking')->middleware('auth:sanctum')->group(function () {
    Route::get('/{id}', [BookingsController::class, 'show']);
    Route::put('/{id}/update', [BookingsController::class, 'update']);
    Route::delete('/{id}/delete', [BookingsController::class, 'destroy']);
});

// thêm middleware('auth:sanctum') để lấy Auth::id() khi ghi lại sự kiện xóa, sửa
Route::apiResource('users', UserController::class);

Route::post('/momo/create', [MoMoController::class, 'createPayment']);
Route::get('/momo/return', [MoMoController::class, 'returnPayment']);

// api gửi mail
Route::post('/forgot-password', [AuthController::class, 'sendResetLinkEmail']);
Route::post('password/reset', [AuthController::class, 'resetPassword']);

// VNPay
Route::post('vnpay-create', [VnPayController::class, 'create']);
Route::get('/return-vnpay', [VnPayController::class, 'vnpayReturn']);

///QR
Route::prefix('cart')->middleware('auth:sanctum')->group(function () {

    Route::post('/add',  [CartController::class, 'addToCart']);
});
