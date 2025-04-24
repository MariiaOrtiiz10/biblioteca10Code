<?php
namespace Domain\Reservations\Actions;

use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Carbon\Carbon;

class ReservationIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {

        $isbn = $search[0];
        $email = $search[1];

        $reservations = Reservation::query()
        ->join('users', 'reservations.user_id', '=', 'users.id')
        ->join('books', 'reservations.book_id', '=', 'books.id')
        ->select('reservations.*')
        ->when($isbn != "null", function ($query) use ($isbn){
            $query->where('books.isbn', 'ILIKE', "%".$isbn."%");
        })
        ->when($email != "null", function ($query) use ($email){
            $query->where('users.email', 'ILIKE', "%".$email."%");
        })

        ->latest()
        ->paginate($perPage);

        return $reservations->through(fn ($reservation) => ReservationResource::fromModel($reservation));


    }
}
