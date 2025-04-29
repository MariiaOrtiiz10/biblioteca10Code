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
        $title = $search[2];
        $created_at = $search[3];

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
        ->when($title != "null", function ($query) use ($title){
            $query->where('books.title', 'ILIKE', "%".$title."%");
        })
        ->when($created_at != "null", function ($query) use ($created_at) {
            $query->whereDate('reservations.created_at', '=', Carbon::parse($created_at));
        })
        ->latest()
        ->paginate($perPage);
        return $reservations->through(fn ($reservation) => ReservationResource::fromModel($reservation));
    }
}
