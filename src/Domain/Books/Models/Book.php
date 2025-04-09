<?php

namespace Domain\Books\Models;

use Database\Factories\BookFactory;
use Domain\Bookshelves\Models\Bookshelf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    use HasFactory,HasUuids;



    protected static function newFactory()
    {
        return BookFactory::new();
    }

    protected $fillable = [
        'id',
        'bookshelf_id',
        'isbn',
        'title',
        'editorial',
        'pages',
        'genres',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($book) {
            $book->bookshelf->increment('occupiedBooks');
        });

        static::updated(function ($book) {
            if ($book->isDirty('bookshelf_id')) {
                $originalBookshelfId = $book->getOriginal('bookshelf_id');
                $newBookshelfId = $book->bookshelf_id;

                Bookshelf::find($originalBookshelfId)?->decrement('occupiedBooks');

                Bookshelf::find($newBookshelfId)?->increment('occupiedBooks');
            }
        });

        static::deleted(function ($book) {
            $book->bookshelf->decrement('occupiedBooks');
        });
    }


    public function bookshelf()
    {
        return $this->belongsTo(Bookshelf::class);
    }


    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, "book_genre", 'book_id', 'genre_id');
    }

}
