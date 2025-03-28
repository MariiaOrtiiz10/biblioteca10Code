<?php

namespace Domain\Zones\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Database\Factories\ZoneFactory;

class Zone extends Model
{
    use HasFactory,HasUuids;

    protected static function newFactory()
    {
        return ZoneFactory::new();
    }

    protected $fillable = [
        'id',
        'floor_id',
        'genre_id',
        'bookshelvesCapacity'
    ];

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

}
