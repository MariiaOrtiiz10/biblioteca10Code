<?php

namespace Database\Factories;

use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Book::class;

    public function definition(): array
    {
        $genres = Genre::all()->pluck('genre');
        return [
            'name' => fake()->name(),
            'author' => fake()->name(),
            'editorial' => fake()->company(),
            'pages' => fake()->numberBetween(20, 3000),
            'genres'=>implode(', ', fake()->randomElements($genres, fake()->numberBetween(1, 3))),
            'bookshelf_id' => Bookshelf::inRandomOrder()->first()->id,

        ];
    }
}
