<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAuditLog extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'updated_by', 'changes'];

    protected $casts = [
        'changes' => 'array',
    ];
}
