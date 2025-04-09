<?php

namespace App\Books\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Bookshelves\Actions\BookDestroyAction;
use Domain\Books\Actions\BookIndexAction;
use Domain\Bookshelves\Models\Bookshelf;
use Illuminate\Http\Request;

class BookApiController extends Controller{
    public function index(Request $request, BookIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    // public function destroy(Bookshelf $bookshelf, BookDestroyAction $action)
    // {
    //     $action($bookshelf);
    //     return response()->json([
    //         'message' => __('messages.bookshelf.deleted')
    //     ]);
    // }
}
