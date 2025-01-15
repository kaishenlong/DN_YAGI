<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class room extends Model
{
    use HasFactory;
    protected $fillable=['type_room','bed'];
    public function getBedNameAttribute()
    {
        $bed = [
            1 => 'Single Bed (Giường đơn)',
            2 => 'Twin Bed (Giường đôi nhỏ)',
            3 => 'Double Bed (Giường đôi)',
            4 => 'Queen Bed (Giường cỡ Queen)',
            5 => 'King Bed (Giường cỡ King)',
            6 => 'Extra Bed (Giường phụ)',
            7 => 'Sofa Bed (Giường sofa)',
            8 => 'Bunk Bed (Giường tầng)',
        ];

        // Trả về loại giường tương ứng với giá trị cột 'bed'
        return $bed[$this->bed] ?? 'Unknown Bed Type';
    }
    public function detailrooms()
    {
        return $this->hasMany(DetailRoom::class, 'room_id');
    }
}