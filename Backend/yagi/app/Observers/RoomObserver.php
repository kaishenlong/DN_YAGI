<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\room;
use Illuminate\Support\Facades\Auth;

class RoomObserver
{
    /**
     * Handle the room "created" event.
     */
    public function created(room $room): void
    {
        Audit::create([
            'model_type' => 'room',
            'model_id' => $room->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $room->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the room "updated" event.
     */
    public function updated(room $room): void
    {
        // Lấy ra các thay đổi so với giá trị ban đầu
        $changes = $room->getChanges();
        $original = $room->getOriginal();

        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'room',
            'model_id' => $room->id,
            'user_id' => Auth::id(),
            'action' => 'update',
            'changes' => [
                'original' => $original,
                'updated' => $changes,
            ],
        ]);
    }

    /**
     * Handle the room "deleted" event.
     */
    public function deleted(room $room): void
    {
        $original = $room->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'room',
            'model_id' => $room->id,
            'user_id' => $userId, // thêm middleware('auth:sanctum') tại route để lấy Auth::id() khi ghi lại sự kiện xóa
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the room "restored" event.
     */
    public function restored(room $room): void
    {
        //
    }

    /**
     * Handle the room "force deleted" event.
     */
    public function forceDeleted(room $room): void
    {
        //
    }
}
