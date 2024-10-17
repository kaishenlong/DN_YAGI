<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
       'order_id', 'amount', 'order_info', 'transaction_id', 
        'result_code', 'message', 'pay_url'
    ];
}
