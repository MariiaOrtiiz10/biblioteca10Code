<?php

namespace Database\Seeders;

use Domain\Bookshelves\Models\Bookshelf;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookshelfSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bookshelf::factory()->count(5)->create();
    }
}
