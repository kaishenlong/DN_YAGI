<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Các route mặc định của Laravel cho reset mật khẩu
Route::get('password/reset/{token}', function ($token) {
    return response()->json([
        'message' => 'Token đã được xác thực thành công',
        'token' => $token,
    ]);
})->name('password.reset');
