<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class booking extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detailroom()
    {
        return $this->belongsTo(DetailRoom::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    protected $fillable = [
        'user_id',
        'detail_room_id',
        'check_in',
        'check_out',
        'adult',
        'children',
        'quantity',
        'total_price',
        'status',
        
        // thêm các trường khác nếu cần
    ];
}