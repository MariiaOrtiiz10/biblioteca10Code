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
            'capacity' => '6',
        ]);
        Floor::create([
            'floorNumber' => '2',
            'capacity' => '4',
        ]);
        Floor::create([
            'floorNumber' => '4',
            'capacity' => '2',
        ]);
        
    }
}
