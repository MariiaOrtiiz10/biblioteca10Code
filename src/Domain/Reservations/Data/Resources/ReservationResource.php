<?php

namespace Domain\Reservations\Data\Resources;

use Domain\Reservations\Models\Reservation;
use Spatie\LaravelData\Data;
use Carbon\Carbon;

class ReservationResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $email,
        public readonly string $book_id,
        public readonly string $isbn,
        public readonly string $title,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }


    public static function fromModel(Reservation $reservation): self
    {
        return new self(
            id: $reservation->id,
            user_id: $reservation->user_id,
            email: $reservation->user->email,
            book_id: $reservation->book_id,
            isbn: $reservation->book->isbn,
            title: $reservation->book->title,
            created_at: $reservation->created_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
            updated_at: $reservation->updated_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
        );
    }
}


