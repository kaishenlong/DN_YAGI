<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\payment;
use Illuminate\Support\Facades\Auth;

class paymentObserver
{
    /**
     * Handle the payment "created" event.
     */
    public function created(payment $payment): void
    {
        Audit::create([
            'model_type' => 'payment',
            'model_id' => $payment->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $payment->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the payment "updated" event.
     */
    public function updated(payment $payment): void
    {
        // Lấy ra các thay đổi so với giá trị ban đầu
        $changes = $payment->getChanges();
        $original = $payment->getOriginal();

        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'payment',
            'model_id' => $payment->id,
            'user_id' => Auth::id(),
            'action' => 'update',
            'changes' => [
                'original' => $original,
                'updated' => $changes,
            ],
        ]);
    }

    /**
     * Handle the payment "deleted" event.
     */
    public function deleted(payment $payment): void
    {
        $original = $payment->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'payment',
            'model_id' => $payment->id,
            'user_id' => $userId, // thêm middleware('auth:sanctum') tại route để lấy Auth::id() khi ghi lại sự kiện xóa
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the payment "restored" event.
     */
    public function restored(payment $payment): void
    {
        //
    }

    /**
     * Handle the payment "force deleted" event.
     */
    public function forceDeleted(payment $payment): void
    {
        //
    }
}
