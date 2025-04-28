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
        $bs2 = Bookshelf::where('bookshelfNumber', 13)->first();
        $zoneGenre2 = $bs2->zone->genre->genre;
        $bs3 = Bookshelf::where('bookshelfNumber', 8)->first();
        $zoneGenre3 = $bs3->zone->genre->genre;
        $bs4 = Bookshelf::where('bookshelfNumber', 17)->first();
        $zoneGenre4 = $bs4->zone->genre->genre;
        $bs5 = Bookshelf::where('bookshelfNumber', 6)->first();
        $zoneGenre5 = $bs5->zone->genre->genre;
        $bs6 = Bookshelf::where('bookshelfNumber', 22)->first();
        $zoneGenre6 = $bs6->zone->genre->genre;

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
            'bookshelf_id' => $bs5->id,
            'isbn' => '9788498672220',
            'title' => 'Diario de Greg 1: Un pringao total',
            'author' => 'Jeff Kinney',
            'editorial' => 'Molino',
            'pages' => 224,
            'genres' => $zoneGenre5,
        ]);
        Book::create([
            'bookshelf_id' => $bs5->id,
            'isbn' => '9788469807471',
            'title' => 'Los Futbolísimos 1: El misterio de los árbitros dormidos',
            'author' => 'Roberto Santiago',
            'editorial' => 'SM',
            'pages' => 288,
            'genres' => $zoneGenre5,
        ]);
        Book::create([
            'bookshelf_id' => $bs5->id,
            'isbn' => '9788469808454',
            'title' => 'Los Futbolísimos 2: El misterio del obelisco mágico',
            'author' => 'Roberto Santiago',
            'editorial' => 'SM',
            'pages' => 304,
            'genres' =>  $zoneGenre5,
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
        Book::create([
            'bookshelf_id' => $bs4->id,
            'isbn' => '9780312924584',
            'title' => 'The Silence of the Lambs',
            'author' => 'Thomas Harris',
            'editorial' => 'St. Martin\'s Press',
            'pages' => 338,
            'genres' => $zoneGenre4,
        ]);
        Book::create([
            'bookshelf_id' => $bs6->id,
            'isbn' => '9780312924584',
            'title' => 'The Silence of the Lambs',
            'author' => 'Thomas Harris',
            'editorial' => 'St. Martin\'s Press',
            'pages' => 338,
            'genres' => $zoneGenre6,
        ]);


        //Book::factory()->count(25)->create();
    }
}
