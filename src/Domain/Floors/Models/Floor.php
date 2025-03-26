<?php

namespace Domain\Floors\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Floor extends Model
{
    use HasFactory,HasUuids;

    protected $fillable = [        
        'floorNumber', 
        'capacity',    
    ];

    public function zones(): HasMany
    {
        //return $this->hasOne(UserSetting::class, 'user_id');
    }
}
