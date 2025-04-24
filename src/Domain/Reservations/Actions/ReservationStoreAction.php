<?php

namespace Domain\Reservations\Actions;

use Domain\Books\Models\Book;
use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class ReservationStoreAction
{
    public function __invoke(array $data): ReservationResource
    {
        $user = User::where('email', $data['email'])->firstOrFail();

        $book = Book::where('isbn', $data['isbn'])
        ->whereHas('loans', function($query) {
            $query->where('status', true);
        })
        ->firstOrFail();

        $reservation = Reservation::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        return ReservationResource::fromModel($reservation);
    }
}
