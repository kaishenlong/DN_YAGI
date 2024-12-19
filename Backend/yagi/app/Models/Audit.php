<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'model_type', 'model_id', 'action', 'changes',
    ];

    protected $casts = [
        'changes' => 'array', // Tự động chuyển JSON thành mảng
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
