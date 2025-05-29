<?php

namespace App\searchBooks\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
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
    public function edit(Request $request, Book $book)
    {
        $genres = Genre::select(['id','genre'])->get()->toArray();
        $genresData = $book->genres()->pluck('id')->toArray();
        $zonesData = Zone::select(['zones.id','zones.zoneName','zones.floor_id','zones.bookshelvesCapacity','occupiedBookshelves','zones.genre_id', 'genres.genre'])->join('genres', 'genres.id', '=', 'zones.genre_id')->get()->toArray();
        $floorsData = Floor::select(['id','floorNumber', 'zonesCapacity', 'occupiedZones'])->get()->toArray();

        $bookshelvesData = Bookshelf::select(['id','bookshelfNumber','zone_id','booksCapacity','occupiedBooks'])->get()->toArray();
        return Inertia::render('books/Edit', [
            'book' => $book,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'genres' => $genres,
            'zonesData' => $zonesData,
            'floorsData' => $floorsData,
            'bookshelvesData' => $bookshelvesData,
            'genresData' => $genresData,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book, BookUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'isbn' => ['required','regex:/^\d{10}(\d{3})?$/'],
            'title' => ['required','string','min:2'],
            'author' => ['required'],
            'editorial' => ['required'],
            'pages' =>  ['required', 'integer','min:0'],
            'genres' =>  [''],
            'bookshelf_id' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($book, $validator->validated());
        $redirectUrl = route('searchBooks.index');

        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.books.updated'));
    }

}
