<?php

namespace Domain\Bookshelves\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Database\Factories\BookshelfFactory;
use Domain\Books\Models\Book;

class Bookshelf extends Model
{
    use HasFactory,HasUuids;

    protected static function newFactory()
    {
        return BookshelfFactory::new();
    }
    protected $fillable = [
        'id',
        'zone_id',
        'bookshelfNumber',
        'booksCapacity',
        'occupiedBooks',
    ];
    protected static function boot()
    {
        parent::boot();

        static::created(function ($bookshelf) {
            $bookshelf->zone->increment('occupiedBookshelves');
        });

        static::updated(function ($bookshelf) {
            if ($bookshelf->isDirty('zone_id')) {
                $originalZoneId = $bookshelf->getOriginal('zone_id');
                $newZoneId = $bookshelf->zone_id;

                Zone::find($originalZoneId)?->decrement('occupiedBookshelves');
                Zone::find($newZoneId)?->increment('occupiedBookshelves');
            }
        });

        static::deleted(function ($bookshelf) {
            $bookshelf->zone->decrement('occupiedBookshelves');
        });
    }



    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function floor()
    {
        return $this->through('zone')->has('floor');
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }




}
