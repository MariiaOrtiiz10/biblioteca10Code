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
            'floorNumber' => 2,
            'floorName' => 'Piso 2',
            'zonesCapacity' => 5,
        ]);
        Floor::create([
            'floorNumber' => 1,
            'floorName' => 'Piso 1',
            'zonesCapacity' => 3,
        ]);
        //Floor::factory()->count(10)->create();
    }
}
