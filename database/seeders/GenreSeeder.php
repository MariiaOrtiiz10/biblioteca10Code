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
        $genres = [
            'Science Fiction',
            'Fantasy',
            'Historical',
            'Mystery',
            'Horror',
            'Biography',
            'Autobiography',
            'Self-help',
            'Travel',
            'Cooking',
            'Childrens literature',
            'Youth literature',
        ];

        foreach ($genres as $genre) {
            Genre::create([
                'genre' => $genre,
            ]);
        }


    }
}
