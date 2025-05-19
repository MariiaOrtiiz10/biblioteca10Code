<?php

namespace Domain\Reservations\Actions;

use Carbon\Carbon;
use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;

class ReservationHistoryAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {

         $email = $search[0];
        $isbn = $search[1];
        $title = $search[2];

        $reservations = Reservation::onlyTrashed()
        ->with(['user', 'book'])
        ->orderBy('created_at', 'desc')
        ->join('users', 'reservations.user_id', '=', 'users.id')
        ->join('books', 'reservations.book_id', '=', 'books.id')
        ->select('reservations.*')
        ->when($email != "null", function ($query) use ($email){
            $query->where('users.email', 'ILIKE', "%".$email."%");
        })
        ->when($isbn != "null", function ($query) use ($isbn){
            $query->where('books.isbn', 'ILIKE', "%".$isbn."%");
        })
        ->when($title != "null", function ($query) use ($title){
            $query->where('books.title', 'ILIKE', "%".$title."%");
        })
        ->latest()
        ->paginate($perPage);
        return $reservations->through(fn ($reservation) => ReservationResource::fromModel($reservation));
    }
}
