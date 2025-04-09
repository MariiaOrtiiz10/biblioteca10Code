<?php

namespace App\searchBooks\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Inertia\Inertia;
use Inertia\Response;

class SearchbookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('searchBooks/Index');
    }

}
