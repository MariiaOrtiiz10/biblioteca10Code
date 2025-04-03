<?php

namespace Domain\Floors\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Database\Factories\FloorFactory;
use Domain\Zones\Models\Zone;

class Floor extends Model
{
    use HasFactory,HasUuids;

    protected static function newFactory()
    {
        return FloorFactory::new();
    }

    protected $fillable = [
        'id',
        'floorNumber',
        'floorName',
        'zonesCapacity',
    ];

    public function zones()
    {
        return $this->hasMany(Zone::class);
    }

}
