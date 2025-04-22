<?php

namespace App\searchBooks\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
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

        return Inertia::render('searchBooks/Index',[
            'books' => $books
        ]);
    }

}
