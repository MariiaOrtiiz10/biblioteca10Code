<?php

namespace Database\Factories;

use Domain\Bookshelves\Models\Bookshelf;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class BookshelfFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Bookshelf::class;


    public function definition(): array
    {
        $zone = Zone::inRandomOrder()->first();
        return [
            'zone_id' =>$zone->id,
            'bookshelfNumber' => $this->faker->unique()->numberBetween(1, 100),
            'booksCapacity' => $this->faker->numberBetween(10, 100),
        ];
    }
}
