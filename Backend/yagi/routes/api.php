<?php

use App\Http\Controllers\Api\RoomController;
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
