<?php

namespace App\Charts\Controllers;

use App\Core\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Gate;

class ChartUserController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('statistics.view');
        $usersWithLoansReservation = User::withTrashed()
        ->withCount(['loans', 'reservations' => function($query) {
            $query->withTrashed();
        }])
        ->get()
        ->map(function ($user) {
            $user->total = $user->loans_count + $user->reservations_count;
            return $user;
        })
        ->sortByDesc('total')
        ->take(10)
        ->values()
        ->toArray();
        $usersWithLoans = User::withTrashed()
        ->withCount(['loans'])
        ->get()
        ->sortByDesc('loans_count')
        ->take(8)
        ->values()
        ->toArray();

        $usersWithReservations = User::withTrashed()
        ->withCount(['reservations' => function($query) {
            $query->withTrashed();
        }])
        ->get()
        ->sortByDesc('reservations_count')
        ->take(8)
        ->values()
        ->toArray();

        return Inertia::render('charts/users', [
            'usersWithLoansReservation' => $usersWithLoansReservation,
            'usersWithLoans' => $usersWithLoans,
            'usersWithReservations' => $usersWithReservations,

        ]);
    }
}
