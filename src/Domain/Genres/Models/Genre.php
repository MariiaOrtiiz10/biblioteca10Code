<?php

namespace Domain\Genres\Models;

use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Genre extends Model
{
    use HasFactory,HasUuids;

    protected $fillable = [
        'id',
        'genre',
    ];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_genre', 'genre_id', 'book_id');
    }







}

