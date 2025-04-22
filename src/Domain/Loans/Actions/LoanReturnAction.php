<?php

namespace Domain\Loans\Actions;

use Carbon\Carbon;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;

class LoanReturnAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $returned_at = now();
        $end_date = Carbon::parse($loan->end_date);
        $delayed_days = (int) $returned_at->diffInDays($end_date, false);

    $updateData = [
        'status' => false,
        'returned_at' => $returned_at,
        'delayed_days' => $delayed_days,
    ];

    $loan->update($updateData);

    return LoanResource::fromModel($loan->fresh());
    }
}
