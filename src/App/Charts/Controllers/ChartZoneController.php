<?php

namespace App\Charts\Controllers;

use App\Core\Controllers\Controller;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChartZoneController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $zones = Zone::with([
            'floor',
            'genre',
            'bookshelves.books.loans',
            'bookshelves.books.reservations' => function ($query) {
                $query->withTrashed();
            }
        ])->get();

        $zonesWithMoreActivity = $zones->map(function ($zone) {
            $totalLoans = 0;
            $totalReservations = 0;

            foreach ($zone->bookshelves as $shelf) {
                foreach ($shelf->books as $book) {
                    $totalLoans += $book->loans->count();
                    $totalReservations += $book->reservations->count();
                }
            }

            $zone->loans_count = $totalLoans;
            $zone->reservations_count = $totalReservations;
            $zone->total_activity = $totalLoans + $totalReservations;

            return $zone;
        })
        ->sortByDesc('total_activity')
        ->take(10)
        ->values()
        ->toArray();

        $zonesWithMoreActivityLoans = $zones->map(function ($zone) {
            $totalLoans = 0;
            $totalReservations = 0;

            foreach ($zone->bookshelves as $shelf) {
                foreach ($shelf->books as $book) {
                    $totalLoans += $book->loans->count();
                    $totalReservations += $book->reservations->count();
                }
            }

            $zone->loans_count = $totalLoans;
            $zone->reservations_count = $totalReservations;
            $zone->total_activity = $totalLoans + $totalReservations;

            return $zone;
        })
        ->sortByDesc('totalLoans')
        ->take(8)
        ->values()
        ->toArray();

        $zonesWithMoreActivityReservations = $zones->map(function ($zone) {
            $totalLoans = 0;
            $totalReservations = 0;

            foreach ($zone->bookshelves as $shelf) {
                foreach ($shelf->books as $book) {
                    $totalLoans += $book->loans->count();
                    $totalReservations += $book->reservations->count();
                }
            }

            $zone->loans_count = $totalLoans;
            $zone->reservations_count = $totalReservations;
            $zone->total_activity = $totalLoans + $totalReservations;

            return $zone;
        })
        ->sortByDesc('totalReservations')
        ->take(8)
        ->values()
        ->toArray();



        return Inertia::render('charts/zones', [
            'zonesWithMoreActivity' => $zonesWithMoreActivity,
            'zonesWithMoreActivityLoans' => $zonesWithMoreActivityLoans,
            'zonesWithMoreActivityReservations' => $zonesWithMoreActivityReservations,
        ]);
    }
}
