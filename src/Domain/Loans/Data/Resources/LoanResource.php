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
        public readonly ?int $delayed_days,
        public readonly ?string $returned_at,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }


    public static function fromModel(Loan $loan): self
    {
        return new self(
            id: $loan->id,
            user_id: $loan->user_id,
            email: $loan->user->email,
            book_id: $loan->book_id,
            isbn: $loan->book->isbn,
            title: $loan->book->title,
            start_date: $loan->start_date,
            loan_duration: $loan->loan_duration,
            end_date:  $loan->end_date,
            status: $loan->status,
            delayed_days: $loan->delayed_days,
            returned_at: $loan->returned_at,
            created_at: $loan->created_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
            updated_at: $loan->updated_at->setTimezone('Europe/Madrid')->format('Y-m-d H:i:s'),
        );
    }
}

