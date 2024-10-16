<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gallery extends Model
{
    use HasFactory;
    protected $fillable =[
        'images',
        'detailroom_id'
    ];
    public function detailroom(){
        return $this->belongsTo(DetailRoom::class);
    }
}
