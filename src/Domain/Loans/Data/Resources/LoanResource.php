<?php

namespace Domain\Loans\Data\Resources;

use Domain\Loans\Models\Loan;
use Spatie\LaravelData\Data;
use Carbon\Carbon;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $email,
        public readonly string $book_id,
        public readonly string $isbn,
        public readonly string $title,
        public readonly string $start_date,
        public readonly int $loan_duration,
        public readonly string $end_date, //start_dtae + loan_duration
        public readonly string $status,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }


    public static function fromModel(Loan $loan): self
    {
        $startDate = $startDate = Carbon::now();
        $endDate = $startDate->copy()->addDays($loan->loan_duration);

        return new self(
            id: $loan->id,
            user_id: $loan->user_id,
            email: $loan->user->email,
            book_id: $loan->book_id,
            isbn: $loan->book->isbn,
            title: $loan->book->title,
            start_date: $startDate->format('d-m-Y'),
            loan_duration: $loan->loan_duration,
            end_date: $endDate->format('d-m-Y'),
            status: $loan->status,
            created_at: $loan->created_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
            updated_at: $loan->updated_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
        );
    }
}

