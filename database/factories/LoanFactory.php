<?php

namespace Database\Factories;

use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;
use Domain\Loans\Models\Loan;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Loan::class;

    public function definition(): array
    {
        $loan_duration = fake()->numberBetween(0, 15);
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'book_id' => Book::inRandomOrder()->first()->id,
            'start_date' => Carbon::now()->toDateString(),
            'loan_duration' => $loan_duration,
            'end_date' => Carbon::now()->addDays($loan_duration)->toDateString(),
            'status' => $this->faker->boolean(),
        ];
    }
}
