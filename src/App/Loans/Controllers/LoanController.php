<?php

namespace App\Loans\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Books\Models\Book;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanReturnAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('loans/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('loans/Create');
    }

    public function store(Request $request, LoanStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users,email'],
            'isbn' => ['required', 'exists:books,isbn'],
            'loan_duration' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.created'));

    }

    public function edit(Request $request, Loan $loan)
    {
        return Inertia::render('loans/Edit', [
            'loan' => $loan,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users,email'],
            'isbn' => ['required', 'exists:books,isbn'],
            'loan_duration' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());
        $redirectUrl = route('loans.index');

        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.loans.updated'));
    }

    // public function return(Loan $loan, LoanReturnAction $action)
    // {
    //     $action($loan);
    //     return response()->json([
    //         'message' => __('messages.loans.returned'),
    //         'loan' => $loan->fresh()
    //     ]);
    // }

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);
        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.deleted'));
    }


}
