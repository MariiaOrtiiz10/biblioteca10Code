<?php

namespace App\Charts\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChartBookController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $bookswithLoansReservations = Book::withTrashed()
        ->with(['loans', 'reservations' => function($query) {
            $query->withTrashed();
        }])
        ->get()
        ->groupBy('isbn')
        ->map(function ($books) {
            $totalLoans = $books->sum(function ($book) {
                return $book->loans->count();
            });
            $totalReservations = $books->sum(function ($book) {
                return $book->reservations->count();
            });
            $representativeBook = $books->first();
            $result = clone $representativeBook;
            $result->loans_count = $totalLoans;
            $result->reservations_count = $totalReservations;
            $result->total = $totalLoans + $totalReservations;
            return $result;
        })
        ->sortByDesc('total')
        ->take(10)
        ->values()
        ->toArray();

        $bookswithLoans = Book::withTrashed()
        ->with(['loans',])
        ->get()
        ->groupBy('isbn')
        ->map(function ($books) {
            $totalLoans = $books->sum(function ($book) {
                return $book->loans->count();
            });
            $representativeBook = $books->first();
            $result = clone $representativeBook;
            $result->loans_count = $totalLoans;
            $result->total = $totalLoans;
            return $result;
        })
        ->sortByDesc('total')
        ->take(8)
        ->values()
        ->toArray();

        $bookswithReservations = Book::withTrashed()
        ->with(['reservations' => function($query) {
            $query->withTrashed();
        }])
        ->get()
        ->groupBy('isbn')
        ->map(function ($books) {
            $totalReservations = $books->sum(function ($book) {
                return $book->reservations->count();
            });
            $representativeBook = $books->first();
            $result = clone $representativeBook;
            $result->reservations_count = $totalReservations;
            $result->total = $totalReservations;
            return $result;
        })
        ->sortByDesc('total')
        ->take(8)
        ->values()
        ->toArray();
        return Inertia::render('charts/books', [
            'bookswithLoansReservations' => $bookswithLoansReservations,
            'bookswithLoans' => $bookswithLoans,
            'bookswithReservations' => $bookswithReservations,

        ]);
    }
}
