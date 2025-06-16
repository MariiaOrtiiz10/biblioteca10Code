<?php

namespace Domain\Loans\Actions;

use App\Notifications\LoanUserNotification;
use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {
        $user = User::where('email', $data['email'])->firstOrFail();

        $book = Book::where('isbn', $data['isbn'])
            ->whereDoesntHave('loans', fn ($q) => $q->where('status', true))
        ->firstOrFail();

        $start_date = now();

        $end_date = $start_date->copy()->addDays($data['loan_duration']);

        $loan = Loan::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_duration' => $data['loan_duration'],
            'start_date' => $start_date,
            'end_date' => $end_date,
            'status' => true,
        ]);
        $user->notify(new LoanUserNotification(
        $book,
        $user,
        $start_date->format('d/m/Y'),
        $end_date->format('d/m/Y')
    ));


        return LoanResource::fromModel($loan);
    }
}
