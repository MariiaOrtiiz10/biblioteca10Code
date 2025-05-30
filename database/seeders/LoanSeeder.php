<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::where('email', 'mortiz@example.com')->first();
        $user2 = User::where('email', 'mortiz@example.com')->first();
        $book1 = Book::where('isbn', '9788469808454')->first();
        $book3 = Book::where('isbn', '9780307947306')->first();
        $book2 = Book::where('isbn', '9788498672220')->first();
        $book4 = Book::where('isbn', '9781982137274')->first();
        Loan::create([
            'user_id' => $user1->id,
            'book_id' => $book1->id,
            'start_date' => '2025-04-14',
            'loan_duration' => 15,
            'end_date' => '2025-04-29',
            'status' => true,
        ]);
        Loan::create([
            'user_id' => $user2->id,
            'book_id' => $book3->id,
            'start_date' => '2025-04-16',
            'loan_duration' => 10,
            'end_date' => '2025-04-26',
            'status' => true,
        ]);
        Loan::create([
            'user_id' => $user1->id,
            'book_id' => $book1->id,
            'start_date' => '2025-05-10',
            'loan_duration' => 5,
            'end_date' => '2025-05-25',
            'status' => false,
            'returned_at' => '2025-05-29',
            'delayed_days' => 4
        ]);
        Loan::create([
            'user_id' => $user2->id,
            'book_id' => $book4->id,
            'start_date' => '2025-04-15',
            'loan_duration' => 10,
            'end_date' => '2025-04-25',
            'status' => false,
            'returned_at' => '2025-04-25',
            'delayed_days' => 0
        ]);
        //Loan::factory(30)->create();
    }
}
