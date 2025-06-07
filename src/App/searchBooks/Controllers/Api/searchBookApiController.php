<?php

namespace App\searchBooks\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\SearchbookIndexAction;
use Domain\Books\Models\Book;
use Illuminate\Http\Request;

class searchBookApiController extends Controller{
    public function index(Request $request, SearchbookIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

        public function destroy(Book $book, BookDestroyAction $action)
    {
        $success = $action($book);

        if (!$success) {
            return response()->json([
                'message' => __('messages.books.noDeleted')
            ]);
        }

        return response()->json([
            'message' => __('messages.books.deleted')
        ]);
    }


}
