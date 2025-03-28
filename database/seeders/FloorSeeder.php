<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Floors\Models\Floor;

class FloorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Floor::create([
            'floorNumber' => '1',
            'floorName' => 'Patata',
            'zonesCapacity' => '6',
        ]);

        Floor::factory(3)->create();

    }
}
