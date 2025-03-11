<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Roles\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rol = Role::create([
            'name' => 'admin',
            'display_name' => 'Administrador',
            'description' => 'Administrador de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
    }
}
