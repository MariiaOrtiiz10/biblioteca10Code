<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\..\Domain\Floors\Models\Floor>
 */
class FloorFactory extends Factory
{
    protected $model = Floor::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'floorNumber' => $this->faker->unique()->numberBetween(1, 10), 
            'name' => $this->faker->word(), 
            'capacity' => $this->faker->numberBetween(1, 20),
        ];
    }
}
