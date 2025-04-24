<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bs1 = Bookshelf::where('bookshelfNumber', 1)->first();
        $zoneGenre1 = $bs1->zone->genre->genre;
        $bs2 = Bookshelf::where('bookshelfNumber', 12)->first();
        $zoneGenre2 = $bs2->zone->genre->genre;
        $bs3 = Bookshelf::where('bookshelfNumber', 8)->first();
        $zoneGenre3 = $bs3->zone->genre->genre;
        $bs4 = Bookshelf::where('bookshelfNumber', 24)->first();
        $zoneGenre4 = $bs4->zone->genre->genre;

        Book::create([
            'bookshelf_id' => $bs1->id,
            'isbn' => '9788478884557',
            'title' => 'Harry Potter y la piedra filosofal',
            'author' => 'J.K. Rowling',
            'editorial' => 'Salamandra',
            'pages' => 256,
            'genres' => $zoneGenre1,
        ]);
        Book::create([
            'bookshelf_id' => $bs1->id,
            'isbn' => '9780618002213',
            'title' => 'El Hobbit',
            'author' => 'J.R.R. Tolkien',
            'editorial' => 'Minotauro',
            'pages' => 320,
            'genres' => $zoneGenre1,
        ]);
        Book::create([
            'bookshelf_id' => $bs2->id,
            'isbn' => '9788478884557',
            'title' => 'Harry Potter y la piedra filosofal',
            'author' => 'J.K. Rowling',
            'editorial' => 'Salamandra',
            'pages' => 256,
            'genres' => $zoneGenre2,
        ]);
        Book::create([
            'bookshelf_id' => $bs3->id,
            'isbn' => '9788498672220',
            'title' => 'Diario de Greg 1: Un pringao total',
            'author' => 'Jeff Kinney',
            'editorial' => 'Molino',
            'pages' => 224,
            'genres' => $zoneGenre3,
        ]);
        Book::create([
            'bookshelf_id' => $bs4->id,
            'isbn' => '9780307743657',
            'title' => 'It',
            'author' => 'Stephen King',
            'editorial' => 'Anchor',
            'pages' => 1184,
            'genres' => $zoneGenre4,
        ]);

        Book::create([
            'bookshelf_id' => $bs4->id,
            'isbn' => '9780307947306',
            'title' => 'Bird Box',
            'author' => 'Josh Malerman',
            'editorial' => 'Ecco',
            'pages' => 272,
            'genres' => $zoneGenre4,
        ]);

        Book::create([
            'bookshelf_id' => $bs4->id,
            'isbn' => '9781982137274',
            'title' => 'The Silent Patient',
            'author' => 'Alex Michaelides',
            'editorial' => 'Celadon Books',
            'pages' => 336,
            'genres' => $zoneGenre4,
        ]);
        //Book::factory()->count(25)->create();
    }
}
