<?php

namespace App\Books\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Loans\Models\Loan;
use Domain\Zones\Models\Zone;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genres = Genre::orderBy('genre')->get(['id', 'genre']);
        return Inertia::render('books/Index', [
            'genres' => $genres,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $genres = Genre::select(['id','genre'])->get()->toArray();
        $zonesData = Zone::with(['genre'])->get()->toArray();
        $floorsData = Floor::get()->toArray();
        $bookshelvesData = Bookshelf::select(['id','bookshelfNumber','zone_id','booksCapacity','occupiedBooks'])->get()->toArray();
        $booksData = Book::get()->toArray();
        return Inertia::render('books/Create', [
            'genres' => $genres,
            'zonesData' => $zonesData,
            'floorsData' => $floorsData,
            'bookshelvesData' => $bookshelvesData,
            'booksData' => $booksData,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, BookStoreAction $action)
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

        $action($validator->validated());

        return redirect()->route('books.index')
            ->with('success', __('messages.books.created'));

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Book $book)
    {
        $genres = Genre::select(['id','genre'])->get()->toArray();
        $genresData = $book->genres()->pluck('id')->toArray();
         $zonesData = Zone::with(['genre'])->get()->toArray();
        $floorsData = Floor::get()->toArray();
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
        $redirectUrl = route('books.index');

        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.books.updated'));
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book, BookDestroyAction $action)
    {
            $success = $action($book);

        if (!$success) {
            return redirect()->route('books.index')
                ->with('error', __('messages.books.noDeleted'));
        }

        return redirect()->route('books.index')
            ->with('success', __('messages.books.deleted'));
    }
}
