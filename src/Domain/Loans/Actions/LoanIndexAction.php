<?php
namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Carbon\Carbon;

class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {

        $isbn = $search[0];
        $email = $search[1];
        $loan_duration = $search[2];
        $start_date = $search[3];
        $end_date = $search[4];
        $title = $search[5];
        $status = $search[6];

        $loans = Loan::query()
        ->join('users', 'loans.user_id', '=', 'users.id')
        ->join('books', 'loans.book_id', '=', 'books.id')
        ->select('loans.*')
        ->when($isbn != "null", function ($query) use ($isbn){
            $query->where('books.isbn', 'ILIKE', "%".$isbn."%");
        })
        ->when($email != "null", function ($query) use ($email){
            $query->where('users.email', 'ILIKE', "%".$email."%");
        })
        ->when($loan_duration != "null", function ($query) use ($loan_duration){
            $query->where('loans.loan_duration', 'ILIKE', "%".$loan_duration."%");
        })
        ->when($start_date != "null", function ($query) use ($start_date) {
            $query->whereDate('loans.start_date', '=', Carbon::parse($start_date));
        })
        ->when($end_date != "null", function ($query) use ($end_date) {
            $query->whereDate('loans.end_date', '=', Carbon::parse($end_date));
        })
        ->when($title != "null", function ($query) use ($title){
            $query->where('books.title', 'ILIKE', "%".$title."%");
        })
        ->when($status != "null", function ($query) use ($status){
            $query->where('loans.status', 'ILIKE', "%".$status."%");
        })


        ->latest()
        ->paginate($perPage);

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));



    }
}
