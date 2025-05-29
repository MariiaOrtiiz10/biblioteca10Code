<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Roles\Models\Role;
use Domain\Permissions\Models\Permission;

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
        $rolEditor = Role::create([
            'name' => 'editor',
            'display_name' => 'Editor',
            'description' => 'Editor de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $rolReader = Role::create([
            'name' => 'reader',
            'display_name' => 'Reader',
            'description' => 'Lector de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $rolUser = Role::create([
            'name' => 'user',
            'display_name' => 'User',
            'description' => 'Usuario de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);



        $rolAdmin ->givePermissionTo([
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'floors.view',
            'floors.create',
            'floors.edit',
            'floors.delete',
            'zones.view',
            'zones.create',
            'zones.edit',
            'zones.delete',
            'bookshelves.view',
            'bookshelves.create',
            'bookshelves.edit',
            'bookshelves.delete',
            'books.view',
            'books.searchBooks',
            'books.create',
            'books.edit',
            'books.delete',
            'loans.view',
            'loans.create',
            'loans.edit',
            'loans.delete',
            'loans.return',
            'reservations.view',
            'reservations.create',
            'reservations.record',
            'statistics.books',
            'statistics.users',
            'statistics.zones',
            'view.users',
            'settings.access',
            'settings.modify',
        ]);
         $rolEditor ->givePermissionTo([
            'users.view',
            'users.edit',
            'users.delete',
            'floors.view',
            'floors.edit',
            'floors.delete',
            'zones.view',
            'zones.edit',
            'zones.delete',
            'bookshelves.view',
            'bookshelves.edit',
            'bookshelves.delete',
            'books.view',
            'books.searchBooks',
            'books.edit',
            'books.delete',
            'loans.view',
            'loans.edit',
            'loans.delete',
            'reservations.view',
            'reservations.record',
            'settings.access',
            'settings.modify',
        ]);
        $rolReader ->givePermissionTo([
            'users.view',
            'floors.view',
            'zones.view',
            'bookshelves.view',
            'books.view',
            'books.searchBooks',
            'loans.view',
            'reservations.view',
            'statistics.books',
            'statistics.users',
            'statistics.zones',
            'settings.access',
            'settings.modify',
        ]);
        $rolUser ->givePermissionTo([
                'books.view',
                'books.searchBooks',
                'view.users',
                'settings.access',
                'settings.modify',
            ]);



    }
}
