<?php

namespace App\Books\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookIndexAction;
use Domain\Books\Models\Book;
use Illuminate\Http\Request;

class BookApiController extends Controller{
    public function index(Request $request, BookIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

}
