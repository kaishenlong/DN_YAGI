<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailRoom extends Model
{
    use HasFactory;
    protected $table = 'detailrooms';
    protected $fillable = ['room_id', 'hotel_id','name', 'price', 'price_surcharge','available','description','image','gallery_id','into_money'];
    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    
    public function gallery(){
        return $this->hasMany(gallery::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
