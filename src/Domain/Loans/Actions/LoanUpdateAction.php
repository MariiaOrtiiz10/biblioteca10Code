<?php

namespace Domain\Loans\Actions;

use Carbon\Carbon;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;


class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $updateData = [];

        if (isset($data['loan_duration'])) {
            $start_date = Carbon::parse($loan->start_date);
            $end_date = $start_date->copy()->addDays($data['loan_duration']);
            $updateData['loan_duration'] = $data['loan_duration'];
            $updateData['end_date'] = $end_date;
        }

        if (isset($data['status'])) {
            $updateData['status'] = $data['status'];
        }

        if (isset($data['returned_at'])) {
            $returnedAt = Carbon::parse($data['returned_at']);
            $updateData['returned_at'] = $returnedAt;

            $endDate = Carbon::parse($loan->end_date);
            $diffInDays = $endDate->diffInDays($returnedAt, false);
            if ($diffInDays > 0) {
                $updateData['delayed_days'] = $diffInDays;
            }
            else {
                $updateData['delayed_days'] = $diffInDays;
            }
        }

        $loan->update($updateData);

        return LoanResource::fromModel($loan->fresh());
    }
}
