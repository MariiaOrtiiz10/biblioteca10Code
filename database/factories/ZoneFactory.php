<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class ZoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Zone::class;

    public function definition(): array
    {
        return [
            'zoneName' => $this->faker->unique()->word(),
            'floor_id' => Floor::inRandomOrder()->first()->id,
            'genre_id' => Genre::inRandomOrder()->first()->id ,
            'bookshelvesCapacity' => $this->faker->numberBetween(0, 10),
        ];
    }
}
