<?php

namespace App\searchBooks\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;


class SearchbookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with('loans')->get()->map(function ($book) {
            $book->available = !$book->loans->where('status', true)->count();
            return $book;
        });
        $floors = Floor::orderBy('floorNumber')->get(['id', 'floorNumber']);
        $zones = Zone::orderBy('zoneName')->get(['id', 'zoneName']);
        $bookshelves = Bookshelf::orderBy('bookshelfNumber')->get(['id', 'bookshelfNumber']);
        return Inertia::render('searchBooks/Index',[
            'books' => $books,
            'floors' => $floors,
            'zones' => $zones,
            'bookshelves' => $bookshelves,
        ]);
    }

}
