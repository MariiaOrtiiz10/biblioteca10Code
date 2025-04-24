<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Models\Reservation;

class ReservationDestroyAction
{
    public function __invoke(Reservation $reservation): void
    {
        $reservation->delete();
    }
}
