<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;


class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $start_date = $loan->start_date;
        $end_date = $start_date->copy()->addDays($data['loan_duration']);

        $updateData = [
            'loan_duration' => $data['loan_duration'],
            'end_date' => $end_date,
        ];
        $loan->update($updateData);
        return LoanResource::fromModel($loan->fresh());
    }
}
