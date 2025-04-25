<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::where('email', 'jmerino@example.com')->first();
        $book1 = Book::where('isbn', '9780307743657')->first();
        $book2 = Book::where('isbn', '9780307947306')->first();

        Reservation::create([
            'user_id' => $user1->id,
            'book_id' => $book1->id,
        ]);
        Reservation::create([
            'user_id' => $user1->id,
            'book_id' => $book2->id,
        ]);


    }
}
