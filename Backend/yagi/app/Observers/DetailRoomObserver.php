<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\DetailRoom;
use Illuminate\Support\Facades\Auth;

class DetailRoomObserver
{
    /**
     * Handle the DetailRoom "created" event.
     */
    public function created(DetailRoom $detailRoom): void
    {
        Audit::create([
            'model_type' => 'DetailRoom',
            'model_id' => $detailRoom->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $detailRoom->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the DetailRoom "updated" event.
     */
    public function updated(DetailRoom $detailRoom): void
    {
       // Lấy ra các thay đổi so với giá trị ban đầu
       $changes = $detailRoom->getChanges();
       $original = $detailRoom->getOriginal();

       // Lưu lại log thay đổi dưới dạng mảng JSON
       Audit::create([
           'model_type' => 'DetailRoom',
           'model_id' => $detailRoom->id,
           'user_id' => Auth::id(),
           'action' => 'update',
           'changes' => [
               'original' => $original,
               'updated' => $changes,
           ],
       ]);
    }

    /**
     * Handle the DetailRoom "deleted" event.
     */
    public function deleted(DetailRoom $detailRoom): void
    {
        $original = $detailRoom->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'DetailRoom',
            'model_id' => $detailRoom->id,
            'user_id' => $userId, // thêm middleware('auth:sanctum') tại route để lấy Auth::id() khi ghi lại sự kiện xóa
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the DetailRoom "restored" event.
     */
    public function restored(DetailRoom $detailRoom): void
    {
        //
    }

    /**
     * Handle the DetailRoom "force deleted" event.
     */
    public function forceDeleted(DetailRoom $detailRoom): void
    {
        //
    }
}
