<?php
namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;

class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {

        $loan_duration = $search[0];

        $loans = Loan::query()
        ->when($loan_duration != "null", function ($query) use ($loan_duration){
            $query->where('loan_duration', 'ILIKE', "%".$loan_duration."%");
        })
        ->latest()
        ->paginate($perPage);

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));



    }
}
