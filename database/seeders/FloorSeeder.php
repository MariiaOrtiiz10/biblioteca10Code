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
            'floorName' => 'Patata1',
            'zonesCapacity' => '8',
        ]);
        Floor::factory()->count(5)->create();




    }
}
