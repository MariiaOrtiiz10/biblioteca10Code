<?php

namespace Database\Seeders;

use Domain\Permissions\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class PermissionSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        //Para crear permisos --> Como ya están creados, para evitar error lo comento.
        $user_permission = Permission::create([
            'name' => 'users.view',
            'display_name' => 'Ver Usuarios',
            'description' => 'Ver lista de Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'users.create',
            'display_name' => 'Crear Usuarios',
            'description' => 'Crear Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'users.edit',
            'display_name' => 'Editar Usuarios',
            'description' => 'Editar Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);
        Permission::create([
            'name' => 'users.delete',
            'display_name' => 'Eliminar Usuarios',
            'description' => 'Eliminar Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);


        $floor_permission = Permission::create([
            'name' => 'floors.view',
            'display_name' => 'Ver Pisos',
            'description' => 'Ver lista de pisos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'floors.create',
            'display_name' => 'Crear Pisos',
            'description' => 'Crear pisos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'floors.edit',
            'display_name' => 'Editar Pisos',
            'description' => 'Editar Pisos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $floor_permission->id,
        ]);
        Permission::create([
            'name' => 'floors.delete',
            'display_name' => 'Eliminar Pisos',
            'description' => 'Eliminar Pisos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $floor_permission->id,
        ]);


        $zones_permission = Permission::create([
            'name' => 'zones.view',
            'display_name' => 'Ver Zonas',
            'description' => 'Ver lista de zonas de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);
        Permission::create([
            'name' => 'zones.create',
            'display_name' => 'Crear zonas',
            'description' => 'Crear zonas de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);
        Permission::create([
            'name' => 'zones.edit',
            'display_name' => 'Editar Zonas',
            'description' => 'Editar Zonas de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $zones_permission->id,
        ]);
        Permission::create([
            'name' => 'zones.delete',
            'display_name' => 'Eliminar Zonas',
            'description' => 'Eliminar Zonas de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $zones_permission->id,
        ]);


        $bookshelves_permission = Permission::create([
            'name' => 'bookshelves.view',
            'display_name' => 'Ver Estanterías',
            'description' => 'Ver lista de estanterías de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'bookshelves.create',
            'display_name' => 'Crear Estanterías',
            'description' => 'Crear Estanterías de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'bookshelves.edit',
            'display_name' => 'Editar Estanterías',
            'description' => 'Editar Estanterías de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $bookshelves_permission->id,
        ]);
        Permission::create([
            'name' => 'bookshelves.delete',
            'display_name' => 'Eliminar Pisos',
            'description' => 'Eliminar Estanterías de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $bookshelves_permission->id,
        ]);

        $books_permission = Permission::create([
            'name' => 'books.view',
            'display_name' => 'Ver Libros',
            'description' => 'Ver lista de libros de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'books.searchBooks',
            'display_name' => 'Ver Buscador de libros',
            'description' => 'Ver lista de Buscador de libros de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);
        Permission::create([
            'name' => 'books.create',
            'display_name' => 'Crear Libros',
            'description' => 'Crear Libros de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);
        Permission::create([
            'name' => 'books.edit',
            'display_name' => 'Editar Libros',
            'description' => 'Editar Libros de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $books_permission->id,
        ]);
        Permission::create([
            'name' => 'books.delete',
            'display_name' => 'Eliminar Libros',
            'description' => 'Eliminar Libros de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $books_permission->id,
        ]);


        $loans_permission = Permission::create([
            'name' => 'loans.view',
            'display_name' => 'Ver Préstamos',
            'description' => 'Ver lista de préstamos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'loans.create',
            'display_name' => 'Crear Préstamos',
            'description' => 'Crear prestámos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'loans.edit',
            'display_name' => 'Editar Préstamos',
            'description' => 'Editar préstamos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $loans_permission->id,
        ]);
        Permission::create([
            'name' => 'loans.delete',
            'display_name' => 'Eliminar Préstamos',
            'description' => 'Eliminar Préstamos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $loans_permission->id,
        ]);
        Permission::create([
            'name' => 'loans.return',
            'display_name' => 'Devolver Préstamos',
            'description' => 'Devolver Préstamos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $loans_permission->id,
        ]);


        $reservations_permission = Permission::create([
            'name' => 'reservations.view',
            'display_name' => 'Ver Reservas',
            'description' => 'Ver lista de reservas de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);
        Permission::create([
            'name' => 'reservations.create',
            'display_name' => 'Crear Reservas',
            'description' => 'Crear reservas de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'reservations.record',
            'display_name' => 'Historial Reservas',
            'description' => 'Ver historial de reservas de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $reservations_permission->id,
        ]);



        Permission::create([
            'name' => 'statistics.books',
            'display_name' => 'Estadisticas Libros',
            'description' => 'Ver las estadísticas de libros de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);
        Permission::create([
            'name' => 'statistics.users',
            'display_name' => 'Estadisticas Usuarios',
            'description' => 'Ver las estadísticas de usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);
        Permission::create([
            'name' => 'statistics.zones',
            'display_name' => 'Estadisticas Zonas',
            'description' => 'Ver las estadísticas de zonas de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create([
            'name' => 'view.users',
            'display_name' => 'Vista Usuario',
            'description' => 'Ver las vistas del usuario de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);


        $setting_permission = Permission::create([
            'name' => 'settings.access',
            'display_name' => 'Acceso a configuración',
            'description' => 'Acceso a la configuración de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);
        Permission::create([
            'name' => 'settings.modify',
            'display_name' => 'Modificar configuración',
            'description' => 'Modificar la configuración de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $setting_permission->id,
        ]);

        Cache::forever(key: 'permissions', value: Permission::whereNull('parent_id')->with('children')->get());
    }
}
