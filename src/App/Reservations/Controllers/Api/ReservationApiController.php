<?php

namespace App\Reservations\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Reservations\Actions\ReservationDestroyAction;
use Domain\Reservations\Actions\ReservationHistoryAction;
use Domain\Reservations\Actions\ReservationIndexAction;
use Domain\Reservations\Models\Reservation;
use Illuminate\Http\Request;

class ReservationApiController extends Controller{
    public function index(Request $request, ReservationIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }
    public function history(Request $request, ReservationHistoryAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function destroy(Reservation $reservation, ReservationDestroyAction $action)
    {
        $action($reservation);
        return response()->json([
            'message' => __('messages.reservations.deleted')
        ]);
    }

}
