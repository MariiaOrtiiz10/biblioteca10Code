<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Genres\Models\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Genre::create([
            'genre' => 'Fiction',
        ]);
        Genre::create([
            'genre' => 'No fiction',
        ]);
        Genre::create([
            'genre' => 'Childrens literature',
        ]);
        Genre::create([
            'genre' => 'Youth literature',
        ]);
        Genre::create([
            'genre' => 'Poetry',
        ]);
        Genre::create([
            'genre' => 'Theater',
        ]);
        Genre::create([
            'genre' => 'Comics and graphic novels',
        ]);
        Genre::create([
            'genre' => 'Specific genres',
        ]);
        Genre::create([
            'genre' => 'Top read',
        ]);



    }
}
