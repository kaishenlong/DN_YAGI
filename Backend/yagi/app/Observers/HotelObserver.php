<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\Hotel;
use Illuminate\Support\Facades\Auth;

class HotelObserver
{
    /**
     * Handle the Hotel "created" event.
     */
    public function created(Hotel $hotel): void
    {
        Audit::create([
            'model_type' => 'Hotel',
            'model_id' => $hotel->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $hotel->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the Hotel "updated" event.
     */
    public function updated(Hotel $hotel): void
    {
        // Lấy ra các thay đổi so với giá trị ban đầu
        $changes = $hotel->getChanges();
        $original = $hotel->getOriginal();

        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'Hotel',
            'model_id' => $hotel->id,
            'user_id' => Auth::id(),
            'action' => 'update',
            'changes' => [
                'original' => $original,
                'updated' => $changes,
            ],
        ]);
    }

    /**
     * Handle the Hotel "deleted" event.
     */
    public function deleted(Hotel $hotel): void
    {
        $original = $hotel->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'Hotel',
            'model_id' => $hotel->id,
            'user_id' => $userId, // thêm middleware('auth:sanctum') tại route để lấy Auth::id() khi ghi lại sự kiện xóa
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the Hotel "restored" event.
     */
    public function restored(Hotel $hotel): void
    {
        //
    }

    /**
     * Handle the Hotel "force deleted" event.
     */
    public function forceDeleted(Hotel $hotel): void
    {
        //
    }
}
