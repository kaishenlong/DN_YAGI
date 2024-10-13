<?php

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
    Route::put('/rooms/{id}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroyDetail']);
});

Route::prefix('room-type')->group(function () {
    Route::get('/', [RoomTypeController::class, 'room']);
    Route::post('store', [RoomTypeController::class, 'store']);
    Route::get('/rooms/{id}', [RoomTypeController::class, 'showroom']);
    Route::put('/update/{id}', [RoomTypeController::class, 'update']);
    Route::delete('/delete/{id}', [RoomTypeController::class, 'delete']);
});
