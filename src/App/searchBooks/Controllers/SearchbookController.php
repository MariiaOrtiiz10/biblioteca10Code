<?php

namespace App\searchBooks\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class SearchbookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('books.searchBooks');
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

     public function destroy(Book $book, BookDestroyAction $action)
    {
        Gate::authorize('books.delete');
            $success = $action($book);
        if (!$success) {
            return redirect()->route('searchBooks.index')
                ->with('error', __('messages.books.noDeleted'));
        }
        return redirect()->route('searchBooks.index')
            ->with('success', __('messages.books.deleted'));
    }

}
