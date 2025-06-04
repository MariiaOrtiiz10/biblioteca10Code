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
        $user1 = User::where('email', 'mortiz10@gmail.com')->first();
        $user2 = User::where('email', 'jmerino@gmail.com')->first();
        $user3 = User::where('email', 'andresdia@gmail.com')->first();
        $user4 = User::where('email', 'cales2@gmail.com')->first();
        $user5 = User::where('email', 'mirimar24@gmail.com')->first();
        $user6 = User::where('email', 'pmerino@gmail.com')->first();
        $user7 = User::where('email', 'jfernandez@gmail.com')->first();
        $user8 = User::where('email', 'ddmejias@gmail.com')->first();
        $user9 = User::where('email', 'reyes.castro18@gmail.com')->first();
        $user10 = User::where('email', 'lucia.gil9@gmail.com')->first();
        $user11 = User::where('email', 'isco22@gmail.com')->first();
        $user12 = User::where('email', 'mcampos@gmail.com')->first();






        //Loan::factory(30)->create();
    }
}
