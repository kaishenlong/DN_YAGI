<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class payment extends Model
{
    use HasFactory;
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
    public function user()
    {
        return $this->belongsTo(user::class);
    }
    protected $fillable = [
        'booking_id',
        'user_id',
        'paymen_date',
        'method',
        'total_amount',
        'status',
    ];
}
