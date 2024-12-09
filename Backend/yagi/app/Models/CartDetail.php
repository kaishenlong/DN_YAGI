<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartDetail extends Model
{
    use HasFactory;

    protected $fillable = ['cart_id', 'detail_room_id', 'quantity', 'price'];
    public function cart(){
        return $this->belongsTo(Cart::class, 'cart_id','id');
    }
    
    public function detailRoom(){
        return $this->belongsTo(DetailRoom::class, 'detail_room_id','id');
    }
 
}