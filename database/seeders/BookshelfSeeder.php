<?php

namespace Database\Seeders;

use Domain\Bookshelves\Models\Bookshelf;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookshelfSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $zone1 = Zone::where('zoneName', 'Fantasy')->first();
        $zone2 = Zone::where('zoneName', 'Childrens literature 1')->first();
        $zone3 = Zone::where('zoneName', 'Childrens literature 2')->first();
        $zone4 = Zone::where('zoneName', 'Youth literature')->first();
        $zone5 = Zone::where('zoneName', 'Horror')->first();
        $zone6 = Zone::where('zoneName', 'Crime')->first();

        Bookshelf::create([
            'bookshelfNumber' => 1,
            'zone_id' => $zone1->id,
            'booksCapacity' => 20,
        ]);
        Bookshelf::create([
            'bookshelfNumber' => 2,
            'zone_id' => $zone1->id,
            'booksCapacity' => 10,
        ]);
        Bookshelf::create([
            'bookshelfNumber' => 6,
            'zone_id' => $zone2->id,
            'booksCapacity' => 20,
        ]);
        Bookshelf::create([
            'bookshelfNumber' => 8,
            'zone_id' => $zone3->id,
            'booksCapacity' => 10,
        ]);
        Bookshelf::create([
            'bookshelfNumber' => 13,
            'zone_id' => $zone4->id,
            'booksCapacity' => 25,
        ]);
        Bookshelf::create([
            'bookshelfNumber' => 17,
            'zone_id' => $zone5->id,
            'booksCapacity' => 25,
        ]);
        Bookshelf::create([
            'bookshelfNumber' => 22,
            'zone_id' => $zone6->id,
            'booksCapacity' => 15,
        ]);
        //Bookshelf::factory()->count(10)->create();
    }
}
