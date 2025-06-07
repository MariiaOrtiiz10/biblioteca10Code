<?php

namespace App\Loans\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use App\Notifications\Notify;
use Domain\Books\Models\Book;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanReturnAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('loans.view');
        return Inertia::render('loans/Index');
    }


    public function create()
    {
        Gate::authorize('loans.create');
        $allBooksISBN = Book::orderBy('isbn')->get(['id', 'isbn'])->toArray();
        $usersData = User::get()->toArray();
        return Inertia::render('loans/Create',[
            'allBooksISBN' => $allBooksISBN,
            'usersData' => $usersData,
        ]);
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
        Gate::authorize('loans.edit');
        $allBooksISBN = Book::orderBy('isbn')->get(['id', 'isbn'])->toArray();
        $usersData = User::get()->toArray();
        return Inertia::render('loans/Edit', [
            'loan' => $loan,
            'email' => $loan->user->email,
            'isbn' => $loan->book->isbn,
            'usersData' => $usersData,
            'allBooksISBN' => $allBooksISBN,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),

        ]);
    }

    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $status = $loan->status;
        if ($request->status == '0') {
        $validator = Validator::make($request->all(), [
            'status' => ['required', 'boolean'],
            'returned_at' => ['required'],
        ]);

        } else {
            $validator = Validator::make($request->all(), [
                'email' => ['required', 'email', 'exists:users,email'],
                'isbn' => ['required', 'exists:books,isbn'],
                'loan_duration' => ['required', 'integer'],
            ]);
        }

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());

        if($status == true && $loan->status == false){
            $reservation = Reservation::where('book_id', $loan->book_id)
            ->orderBy('created_at', 'asc')
            ->first();
            if($reservation){
                $reservation->user->notify(new Notify($loan->book));
                $reservation->delete();
            }
        }

        $redirectUrl = route('loans.index');

        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

    return redirect($redirectUrl)
        ->with('success', $request->has('status')
            ? __('messages.loans.returned')
            : __('messages.loans.updated'));

    }

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        Gate::authorize('loans.delete');
        $action($loan);
        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.deleted'));
    }


}
