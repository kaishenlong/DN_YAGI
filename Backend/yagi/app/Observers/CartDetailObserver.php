<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\CartDetail;
use Illuminate\Support\Facades\Auth;

class CartDetailObserver
{
    /**
     * Handle the CartDetail "created" event.
     */
    public function created(CartDetail $cartDetail): void
    {
        Audit::create([
            'model_type' => 'CartDetail',
            'model_id' => $cartDetail->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $cartDetail->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the CartDetail "updated" event.
     */
    public function updated(CartDetail $cartDetail): void
    {
        // Lấy ra các thay đổi so với giá trị ban đầu
        $changes = $cartDetail->getChanges();
        $original = $cartDetail->getOriginal();

        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'CartDetail',
            'model_id' => $cartDetail->id,
            'user_id' => Auth::id(),
            'action' => 'update',
            'changes' => [
                'original' => $original,
                'updated' => $changes,
            ],
        ]);
    }

    /**
     * Handle the CartDetail "deleted" event.
     */
    public function deleted(CartDetail $cartDetail): void
    {
        $original = $cartDetail->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'CartDetail',
            'model_id' => $cartDetail->id,
            'user_id' => $userId, // thêm middleware('auth:sanctum') tại route để lấy Auth::id() khi ghi lại sự kiện xóa
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the CartDetail "restored" event.
     */
    public function restored(CartDetail $cartDetail): void
    {
        //
    }

    /**
     * Handle the CartDetail "force deleted" event.
     */
    public function forceDeleted(CartDetail $cartDetail): void
    {
        //
    }
}
