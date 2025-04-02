<?php

namespace App\Bookshelves\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Bookshelves\Actions\BookshelfDestroyAction;
use Domain\Bookshelves\Actions\BookShelfIndexAction;
use Domain\Bookshelves\Models\Bookshelf;
use Illuminate\Http\Request;

class BookshelfApiController extends Controller{
    public function index(Request $request, BookShelfIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }
    public function destroy(Bookshelf $bookshelf, BookshelfDestroyAction $action)
    {
        $action($bookshelf);
        return response()->json([
            'message' => __('messages.bookshelf.deleted')
        ]);
    }
}
