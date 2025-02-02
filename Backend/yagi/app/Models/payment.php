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
    public function bookings()
    {
        $this->belongsToMany(Booking::class, 'detail_payments');
        return $this->hasManyThrough(Booking::class, DetailPayment::class);
    }
    protected $fillable = [
        'user_id',
        'paymen_date',
        'method',
        'total_amount',
        'status',
    ];
    public function service()
    {
        return $this->hasMany(service::class);
    }
    public function detailPayments()
    {
        return $this->hasMany(DetailPayment::class);
    }
}
