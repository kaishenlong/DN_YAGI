<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        Audit::create([
            'model_type' => 'User',
            'model_id' => $user->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $user->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user)
    {
        // Lấy ra các thay đổi so với giá trị ban đầu
        $changes = $user->getChanges();
        $original = $user->getOriginal();

        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'User',
            'model_id' => $user->id,
            'user_id' => Auth::id(),
            'action' => 'update',
            'changes' => [
                'original' => $original,
                'updated' => $changes,
            ],
        ]);
    }


    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        $original = $user->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'User',
            'model_id' => $user->id,
            'user_id' => $userId, // thêm middleware('auth:sanctum') tại route để lấy Auth::id() khi ghi lại sự kiện xóa
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
