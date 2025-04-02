<?php

namespace Domain\Bookshelves\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Database\Factories\BookshelfFactory;

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
        'bookshelfCode',
        'booksCapacity'
    ];
    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function floor()
    {
        return $this->through('zone')->has('floor');
    }



}
