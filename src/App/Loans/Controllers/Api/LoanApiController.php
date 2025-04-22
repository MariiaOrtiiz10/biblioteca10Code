<?php

namespace App\Loans\Controllers\Api;
use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanIndexAction;
use Domain\Loans\Actions\LoanReturnAction;
use Domain\Loans\Models\Loan;
use Illuminate\Http\Request;

class LoanApiController extends Controller{
    public function index(Request $request, LoanIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);
        return response()->json([
            'message' => __('messages.loans.deleted')
        ]);
    }
    // public function return(Loan $loan, LoanReturnAction $action)
    // {
    //     $updatedloan = $action($loan,[]);
    //     return response()->json([
    //         'message' => __('messages.loans.returned'),
    //         'loan' => $updatedloan
    //     ]);
    // }
}
