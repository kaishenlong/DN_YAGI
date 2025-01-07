<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPayment extends Model
{
    use HasFactory;
    protected $fillable = [
        'payment_id',
        'booking_id',
        'user_id',
    ];
     public function payment()
     {
         return $this->belongsTo(Payment::class);
     }
 
     public function booking()
     {
         return $this->belongsTo(Booking::class);
     }
}
