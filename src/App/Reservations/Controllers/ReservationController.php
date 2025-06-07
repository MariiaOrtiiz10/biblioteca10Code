<?php

namespace App\Reservations\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Domain\Reservations\Actions\ReservationDestroyAction;
use Domain\Reservations\Actions\ReservationStoreAction;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class      ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('reservations.view');
        return Inertia::render('reservations/Index');
    }

    public function history()
    {
        Gate::authorize('reservations.record');
        return Inertia::render('reservations/History');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         Gate::authorize('reservations.create');
        $usersData = User::get()->toArray();
        return Inertia::render('reservations/Create',[
            'usersData'=>$usersData,
        ]);
    }

    public function store(Request $request, ReservationStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users,email'],
            'isbn' => ['required', 'exists:books,isbn'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('reservations.index')
            ->with('success', __('messages.reservations.created'));
    }


    public function destroy(Reservation $reservation, ReservationDestroyAction $action)
    {
         Gate::authorize('reservations.delete');
        $action($reservation);
        return redirect()->route('reservations.index')
            ->with('success', __('messages.reservations.deleted'));

    }


}
