<?php

namespace App\Observers;

use App\Models\Audit;
use App\Models\City;
use Illuminate\Support\Facades\Auth;

class CityObserver
{
    /**
     * Handle the City "created" event.
     */
    public function created(City $city): void
    {
        // Lưu lại log thêm mới dưới dạng JSON
        Audit::create([
            'model_type' => 'City',
            'model_id' => $city->id,
            'user_id' => Auth::id(), // Người thực hiện thêm mới (hoặc null nếu không có user)
            'action' => 'create',
            'changes' => [
                'new' => $city->getAttributes(), // Lấy tất cả thuộc tính của bản ghi vừa được tạo
            ],
        ]);
    }

    /**
     * Handle the City "updated" event.
     */
    public function updated(City $city)
    {
        // Lấy ra các thay đổi so với giá trị ban đầu
        $changes = $city->getChanges();
        $original = $city->getOriginal();

        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'City',
            'model_id' => $city->id,
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
    public function deleted(City $city): void
    {
        $original = $city->getOriginal();
        $userId = Auth::check() ? Auth::id() : null;
        // Lưu lại log thay đổi dưới dạng mảng JSON
        Audit::create([
            'model_type' => 'City',
            'model_id' => $city->id,
            'user_id' => $userId, 
            'action' => 'delete',
            'changes' => [
                'original' => $original,
                'deleted' => true,
            ],
        ]);
    }

    /**
     * Handle the City "restored" event.
     */
    public function restored(City $city): void
    {
        //
    }

    /**
     * Handle the City "force deleted" event.
     */
    public function forceDeleted(City $city): void
    {
        //
    }
}
