<?php

namespace Database\Seeders;


use Domain\Users\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user if it doesn't exist
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'admin@example.com',
            ]);
        }
        // User::factory()->create([
        //     'name' => 'Maria Ortiz',
        //     'email' => 'mortiz@example.com',
        // ]);
        // User::factory()->create([
        //     'name' => 'Javier Garcia',
        //     'email' => 'jgarcia@example.com',
        // ]);

        // User::factory()->create([
        //     'name' => 'Jose Merino',
        //     'email' => 'jmerino@example.com',
        // ]);

        // User::factory()->create([
        //     'name' => 'David Dominguez',
        //     'email' => 'ddominguez@example.com',
        // ]);

        // User::factory()->create([
        //     'name' => 'Pablo Merino',
        //     'email' => 'pmerino@example.com',
        // ]);


        // User::factory(5)->create();

    }
}
