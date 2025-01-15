<?php

use App\Http\Controllers\Api\AuditController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BackupController;
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
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ThongKeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VnPayController;
use App\Http\Controllers\Api\Cart;
use App\Http\Controllers\Api\DetailPaymentController;
use App\Models\DetailPayment;
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

Route::post('/contact', [App\Http\Controllers\Api\AuthController::class, 'sendContactEmail']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages', [ChatController::class, 'index']);
    Route::post('/messages', [ChatController::class, 'store']);
    Route::put('/users/{user}/status', [UserController::class, 'changeStatus'])->middleware('role:admin');
    Route::apiResource('reviews', ReviewController::class);
});
// lỗi token, giờ web client thì chỉ để token của client thôi, admin thì xóa đi, làm như tôi vừa xóa ý 
Route::middleware('auth:sanctum')->put('/change-password', [AuthController::class, 'changePassword']);
Route::get('city/', [CityController::class, 'City']);
Route::prefix('city')->group(function () {

    Route::post('store', [CityController::class, 'store']);
    Route::get('/{id}', [CityController::class, 'cityid']);
    Route::put('/update/{city}', [CityController::class, 'update']);
    Route::delete('/delete/{city}', [CityController::class, 'delete']);
});
// Group các route liên quan đến HotelController
Route::controller(HotelController::class)->prefix('hotel')->group(function () {
    Route::get('/', 'index'); // Route để liệt kê tất cả khách sạn
    Route::middleware('auth:sanctum')->post('/', 'store'); // Route để thêm mới khách sạn
    Route::get('/{hotel}', 'show'); // Route để xem thông tin chi tiết khách sạn
    Route::middleware('auth:sanctum')->put('/{hotel}', 'update'); // Route để cập nhật khách sạn
    Route::middleware('auth:sanctum')->delete('/{hotel}', 'destroy'); // Route để xóa khách sạn
    // Các route tùy chỉnh khác
    Route::get('/search', 'search'); // Tìm kiếm khách sạn
    Route::get('/search/available', 'searchAvailableHotels'); // Tìm kiếm khách sạn trống
    Route::get('/search/price', 'searchByPrice'); // Tìm kiếm khách sạn theo giá
});

Route::get('/hotelandroom', [HotelController::class, 'hotelAndRoom']);

Route::prefix('hotel')->group(function () {
    Route::get('search-by-city/{city}', [HotelController::class, 'searchByCity']);
    Route::put('/{hotel}/status', [HotelController::class, 'changeStatus'])->middleware('role:business');
});
Route::middleware(['auth:sanctum'])->get('/rooms/{hotelId}/{userId}', [RoomController::class, 'showRoomsByUser']);
Route::get('/reviewsall', [ReviewController::class, 'indexAll']);
Route::prefix('room')->group(function () {
    Route::get('rooms', [RoomController::class, 'detailroom']);
    Route::post('rooms', [RoomController::class, 'store']);
    Route::get('/rooms/{id}', [RoomController::class, 'showroom']);
    Route::put('/rooms/{detail}', [RoomController::class, 'update']);
    Route::delete('/rooms/{detail}', [RoomController::class, 'destroyDetail']);
    Route::get('/check', [RoomController::class, 'checkPhong']);
    Route::get('/show', [RoomController::class, 'showAb']);
});

Route::prefix('room-type')->group(function () {
    Route::get('/', [RoomTypeController::class, 'room']);
    Route::post('store', [RoomTypeController::class, 'store']);
    Route::get('/rooms/{id}', [RoomTypeController::class, 'showroom']);
    Route::put('/update/{id}', [RoomTypeController::class, 'update']);
    Route::delete('/delete/{id}', [RoomTypeController::class, 'delete']);
});

Route::get('payments/search', [PaymentController::class, 'search']);
Route::prefix('payment')->group(function () {
    Route::get('/', [PaymentController::class, 'index']); // Danh sách thanh toán
    Route::post('/create', [PaymentController::class, 'store'])->middleware('auth:sanctum'); // Tạo thanh toán
    Route::post('/pay-cart', [PaymentController::class, 'payCart'])->middleware('auth:sanctum');
    Route::get('/show/{id}', [PaymentController::class, 'show']); // Chi tiết thanh toán
    Route::get('/showUser/{id}', [PaymentController::class, 'showid']); // Chi tiết thanh toán
    Route::put('/update/{id}', [PaymentController::class, 'update']); // Cập nhật thanh toán
    Route::delete('/delete/{id}', [PaymentController::class, 'delete']); // Xóa thanh toán
    Route::post('/callback', [PaymentController::class, 'paymentCallback']); // Xử lý callback thanh toán
});;
Route::prefix('service')->group(function (){
    Route::get('/',[ServiceController::class,'index']);
    Route::get('/{paymentId}',[ServiceController::class,'index']);
    Route::post('/store', [ServiceController::class,'store']);
    Route::put('/update/{service}', [ServiceController::class,'update']);

});
Route::prefix('dashboard')->group(function () {
    Route::get('/', [ThongKeController::class, 'index']);
    // Route::post('store', [RoomTypeController::class, 'store']);
    // Route::get('/rooms/{id}', [RoomTypeController::class, 'showroom']);
    // Route::put('/update/{id}', [RoomTypeController::class, 'update']);
    // Route::delete('/delete/{id}', [RoomTypeController::class, 'delete']);
});
Route::prefix('booking')->middleware('auth:sanctum')->group(function () {
    Route::post('/addbooking', [BookingsController::class, 'store']);
    Route::get('/{id}', [BookingsController::class, 'show']);
    Route::get('/', [BookingsController::class, 'index']);
    Route::put('/{id}/update', [BookingsController::class, 'update']);
    Route::delete('/{id}/delete', [BookingsController::class, 'destroy']);
});
Route::prefix('detailspayment')->group(function () {
    Route::get('{bookingId}/show', [DetailPaymentController::class, 'show']);
    Route::get('{paymentId}/details', [DetailPaymentController::class, 'index']);
    Route::get('{bookingId}/detail', [DetailPaymentController::class, 'show']);

    // Cập nhật một payment detail
    Route::put('paymentdetails/{id}', [DetailPaymentController::class, 'update']);

    // Xóa một payment detail
    Route::delete('paymentdetails/{id}', [DetailPaymentController::class, 'delete']);
});
// thêm middleware('auth:sanctum') để lấy Auth::id() khi ghi lại sự kiện xóa, sửa
Route::apiResource('users', UserController::class);
Route::get('user/search', [UserController::class, 'search']);

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
    Route::delete('/{id}', [CartController::class, 'deleteCartById']);
    Route::post('/add',  [CartController::class, 'addToCart']);
    Route::delete('/delete', [CartController::class, 'deleteFromCart']);
    Route::get('/',  [CartController::class, 'getAllID']);
    Route::get('/{id}',  [CartController::class, 'show']);
});

Route::get('audits', [AuditController::class, 'index']);
Route::get('audits/{id}', [AuditController::class, 'show']);

Route::get('backups', [BackupController::class, 'getBackups'])->middleware('auth:sanctum')->name('api.backups.list');
Route::get('backups/download/{filename}', [BackupController::class, 'downloadBackup'])->middleware('auth:sanctum');
Route::post('backup', [BackupController::class, 'runBackup']); // chưa thêm được auth:sanctum vì lỗi 401 không sửa đc
Route::delete('backup/{filename}', [BackupController::class, 'deleteBackup'])->middleware('auth:sanctum');


// lỗi load booking và payment ngay từ đầu kể cả khi không có dữ liệu 2 bảng này trong database 
// => chỉ load 2 bảng này khi chọn lịch sử đặt hàng

// lỗi khi bấm đặt phòng, thông báo thanh toán thành công luôn trong khi chưa thanh toán xong

// lỗi khi thanh toán xong, không cập nhật trạng thái thanh toán trong payment

// lỗi kiểm tra lịch sử đặt phòng, hiển thị toàn bộ lịch sử trong database, không lọc theo user

// lỗi gọi api bên client, sẽ bị lỗi 429 khi reload trang liên tục (quá tải server)
// => reload trang chỉ 2 lần mỗi phút để đảm bảo server không bị quá tải

// thêm useState vào các nút như login, thanh toán 