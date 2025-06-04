<?php

namespace Domain\Books\Models;

use Database\Factories\BookFactory;
use Domain\Bookshelves\Models\Bookshelf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Genres\Models\Genre;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Book extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasFactory,HasUuids;
    use SoftDeletes;




    protected static function newFactory()
    {
        return BookFactory::new();
    }

    protected $fillable = [
        'id',
        'bookshelf_id',
        'isbn',
        'title',
        'author',
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

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }


    public function bookshelf()
    {
        return $this->belongsTo(Bookshelf::class);
    }

    //N:M
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, "book_genre", 'book_id', 'genre_id');
    }

        public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function activeLoan(){
        return $this->hasOne(Loan::class)->where('status', true);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    public function getImageAttribute()
{
    return $this->getFirstMediaUrl('images');
}



}
