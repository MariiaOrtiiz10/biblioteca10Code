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
            'genre' => 'Ficción',
        ]);
        Genre::create([
            'genre' => 'No Ficción',
        ]);
        Genre::create([
            'genre' => 'Literatura Infantil',
        ]);
        Genre::create([
            'genre' => 'Literatura Juvenil',
        ]);
        Genre::create([
            'genre' => 'Poesía',
        ]);
        Genre::create([
            'genre' => 'Teatro',
        ]);
        Genre::create([
            'genre' => 'Cómics y novelas gráficas',
        ]);
        Genre::create([
            'genre' => 'Géneros específicos:',
        ]);
        Genre::create([
            'genre' => 'Top leídos:',
        ]);



    }
}
