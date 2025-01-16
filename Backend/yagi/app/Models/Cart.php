<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'cart';
    protected $fillable = [
        'user_id',
        'total_price',
        'detail_room_id',
        'check_in',
        'check_out',
        'guests',
        'adult',
        'guests',
        'children',
        'quantity',
    ];


    public function cartDetails()
    {
        return $this->hasMany(CartDetail::class, 'cart_id');
    }
    public function detailrooms()
    {
        return $this->belongsTo(DetailRoom::class, 'detail_room_id', 'id'); 
    }
}
