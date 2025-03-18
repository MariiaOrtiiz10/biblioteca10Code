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
        $rolAdmin = Role::create([
            'name' => 'admin',
            'display_name' => 'Administrador',
            'description' => 'Administrador de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $rolEmployer = Role::create([
            'name' => 'employer',
            'display_name' => 'Empleado',
            'description' => 'Empleado de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $rolEditor = Role::create([
            'name' => 'editor',
            'display_name' => 'Editor',
            'description' => 'Editor de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $rolReader = Role::create([
            'name' => 'reader',
            'display_name' => 'Lector',
            'description' => 'Lector de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $rolAdmin ->syncPermissions([
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'reports.view',
            'reports.export',
            'reports.print',
            'settings.access',
            'settings.modify',     
        ]);
        $rolEmployer ->syncPermissions([
            'users.view',
            'products.view',
            'products.create',
            'reports.view',
            'reports.export',
            'reports.print',
            'settings.access',
            'settings.modify',     
        ]);
        $rolEditor ->syncPermissions([
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'reports.view',   
        ]);
        $rolReader ->syncPermissions([
            'users.view',
            'products.view',
            'reports.view',
        ]);

        
    }
}
