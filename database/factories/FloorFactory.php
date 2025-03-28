<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Floors\Models\Floor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\..\Domain\Floors\Models\Floor>
 */
class FloorFactory extends Factory
{
    protected $model = Floor::class;
    public function definition(): array
    {
        return [
            'floorNumber' => $this->faker->unique()->numberBetween(1, 10),
            'floorName' => $this->faker->word(),
            'zonesCapacity' => $this->faker->numberBetween(1, 8),
        ];
    }
}
