<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartObserver
{
    /**
     * Handle the Cart "created" event.
     */
    public function created(Cart $cart): void
    {
        Audit::create([
            'model_type' => 'Cart',
            'model_id' => $cart->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $cart->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the Cart "updated" event.
     */
    public function updated(Cart $cart): void
    {
        // Lấy ra các thay đổi so với giá trị ban đầu
        $changes = $cart->getChanges();
        $original = $cart->getOriginal();

        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'Cart',
            'model_id' => $cart->id,
            'user_id' => Auth::id(),
            'action' => 'update',
            'changes' => [
                'original' => $original,
                'updated' => $changes,
            ],
        ]);
    }

    /**
     * Handle the Cart "deleted" event.
     */
    public function deleted(Cart $cart): void
    {
        $original = $cart->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'Cart',
            'model_id' => $cart->id,
            'user_id' => $userId, // thêm middleware('auth:sanctum') tại route để lấy Auth::id() khi ghi lại sự kiện xóa
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the Cart "restored" event.
     */
    public function restored(Cart $cart): void
    {
        //
    }

    /**
     * Handle the Cart "force deleted" event.
     */
    public function forceDeleted(Cart $cart): void
    {
        //
    }
}
