<?php

namespace App\Loans\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanIndexAction;
use Illuminate\Http\Request;

class LoanApiController extends Controller{
    public function index(Request $request, LoanIndexAction $action)
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
