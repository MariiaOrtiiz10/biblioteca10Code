<?php

namespace Database\Seeders;

use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Zones\Models\Zone;

class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $floor1 = Floor::where('floorNumber', 1)->first();
        $genre1 = Genre::where('genre', 'Fantasy')->first();
        $floor2 = Floor::where('floorNumber', 1)->first();
        $genre2 = Genre::where('genre', 'Childrens literature')->first();
        $floor3 = Floor::where('floorNumber', 2)->first();
        $genre3 = Genre::where('genre', 'Childrens literature')->first();
        $floor4 = Floor::where('floorNumber', 2)->first();
        $genre4 = Genre::where('genre', 'Youth literature')->first();
        $floor5 = Floor::where('floorNumber', 2)->first();
        $genre5 = Genre::where('genre', 'Horror')->first();
        $floor6 = Floor::where('floorNumber', 2)->first();
        $genre6 = Genre::where('genre', 'Crime')->first();
        Zone::create([
            'zoneName' => 'Fantasy',
            'floor_id' => $floor1->id,
            'genre_id' => $genre1->id,
            'bookshelvesCapacity' => 5,
        ]);
        Zone::create([
            'zoneName' => 'Childrens literature 1',
            'floor_id' => $floor2->id,
            'genre_id' => $genre2->id,
            'bookshelvesCapacity' => 2,
        ]);
        Zone::create([
            'zoneName' => 'Childrens literature 2',
            'floor_id' => $floor3->id,
            'genre_id' => $genre3->id,
            'bookshelvesCapacity' => 4,
        ]);
        Zone::create([
            'zoneName' => 'Youth literature',
            'floor_id' => $floor4->id,
            'genre_id' => $genre4->id,
            'bookshelvesCapacity' => 4,
        ]);
        Zone::create([
            'zoneName' => 'Horror',
            'floor_id' => $floor5->id,
            'genre_id' => $genre5->id,
            'bookshelvesCapacity' => 5,
        ]);
        Zone::create([
            'zoneName' => 'Crime',
            'floor_id' => $floor6->id,
            'genre_id' => $genre6->id,
            'bookshelvesCapacity' => 3,
        ]);
        //Zone::factory()->count(10)->create();
    }
}
