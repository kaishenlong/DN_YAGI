<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomAvailability extends Model
{
    use HasFactory;
    protected $fillable = [
        'detail_room_id',
        'date',
        'available_rooms',
    ];
    public function roomAvailabilities()
    {
        return $this->belongsToMany(RoomAvailability::class);
    }
}
