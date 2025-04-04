<?php

namespace Domain\Zones\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Database\Factories\ZoneFactory;
use Domain\Bookshelves\Models\Bookshelf;

class Zone extends Model
{
    use HasFactory,HasUuids;

    protected static function newFactory()
    {
        return ZoneFactory::new();
    }

    protected $fillable = [
        'id',
        'zoneName',
        'floor_id',
        'genre_id',
        'bookshelvesCapacity'
    ];

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($zone) {
            $zone->floor->increment('occupiedZones');
        });

        static::updated(function ($zone) {
            if ($zone->isDirty('floor_id')) {
                $originalFloorId = $zone->getOriginal('floor_id');
                $newFloorId = $zone->floor_id;

                Floor::find($originalFloorId)?->decrement('occupiedZones');

                Floor::find($newFloorId)?->increment('occupiedZones');
            }
        });

        static::deleted(function ($zone) {
            $zone->floor->decrement('occupiedZones');
        });
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
    public function bookshelves()
    {
        return $this->hasMany(Bookshelf::class);
    }

}
