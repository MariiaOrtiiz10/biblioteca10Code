<?php

namespace Domain\Floors\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Floor extends Model
{
    use HasFactory;


    public function zones(): HasMany
    {
        //return $this->hasOne(UserSetting::class, 'user_id');
    }
}
