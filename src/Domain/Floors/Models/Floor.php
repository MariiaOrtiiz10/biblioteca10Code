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
        'floorName',
        'capacityZones',
    ];


}
