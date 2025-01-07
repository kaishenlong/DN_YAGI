<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\booking;
use Illuminate\Support\Facades\Auth;

class bookingObserver
{
    /**
     * Handle the booking "created" event.
     */
    public function created(booking $booking): void
    {
        Audit::create([
            'model_type' => 'booking',
            'model_id' => $booking->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $booking->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the booking "updated" event.
     */
    public function updated(booking $booking): void
    {
        // Lấy ra các thay đổi so với giá trị ban đầu
        $changes = $booking->getChanges();
        $original = $booking->getOriginal();

        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'booking',
            'model_id' => $booking->id,
            'user_id' => Auth::id(),
            'action' => 'update',
            'changes' => [
                'original' => $original,
                'updated' => $changes,
            ],
        ]);
    }

    /**
     * Handle the booking "deleted" event.
     */
    public function deleted(booking $booking): void
    {
        $original = $booking->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'booking',
            'model_id' => $booking->id,
            'user_id' => $userId, // thêm middleware('auth:sanctum') tại route để lấy Auth::id() khi ghi lại sự kiện xóa
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the booking "restored" event.
     */
    public function restored(booking $booking): void
    {
        //
    }

    /**
     * Handle the booking "force deleted" event.
     */
    public function forceDeleted(booking $booking): void
    {
        //
    }
}
