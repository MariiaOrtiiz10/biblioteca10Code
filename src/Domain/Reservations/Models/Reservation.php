<?php

namespace Domain\Reservations\Models;

use Database\Factories\ReservationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;

class Reservation extends Model
{
    use HasFactory,HasUuids;



    protected static function newFactory()
    {
        return ReservationFactory::new();
    }

    protected $fillable = [
        'id',
        'user_id',
        'book_id',
    ];



    public function book()
    {
        return $this->belongsTo(Book::class);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
