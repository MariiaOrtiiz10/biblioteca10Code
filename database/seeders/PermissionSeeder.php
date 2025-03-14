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
        // $user_permission = Permission::create(attributes: [
        //     'name' => 'users.view',
        //     'display_name' => 'Ver Usuarios',
        //     'description' => 'Ver lista de Usuarios de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => null,
        // ]);

        // Permission::create(attributes: [
        // 'name' => 'users.create',
        // 'display_name' => 'Crear Usuarios',
        // 'description' => 'Crear Usuarios de la aplicación',
        // 'guard_name' => 'web',
        // 'parent_id' => null,
        //  ]);

        // Permission::create(attributes: [
        //     'name' => 'users.edit',
        //     'display_name' => 'Editar Usuarios',
        //     'description' => 'Editar Usuarios de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => $user_permission->id,
        // ]);
        // Permission::create(attributes: [
        //     'name' => 'users.delete',
        //     'display_name' => 'Eliminar Usuarios',
        //     'description' => 'Eliminar Usuarios de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => $user_permission->id,
        // ]);


        // $product_permission = Permission::create(attributes: [
        //     'name' => 'products.view',
        //     'display_name' => 'Ver Productos',
        //     'description' => 'Ver lista de Produtos de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => null,
        // ]);

        //  Permission::create(attributes: [
        //     'name' => 'products.create',
        //     'display_name' => 'Crear Productos',
        //     'description' => 'Crear Productos de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => null,
        //  ]);

        // Permission::create(attributes: [
        //     'name' => 'products.edit',
        //     'display_name' => 'Editar Productos',
        //     'description' => 'Editar Productos de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => $product_permission->id,
        // ]);
        // Permission::create(attributes: [
        //     'name' => 'products.delete',
        //     'display_name' => 'Eliminar Productos',
        //     'description' => 'Eliminar Productos de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => $product_permission->id,
        // ]);


        // $report_permission = Permission::create(attributes: [
        //     'name' => 'reports.view',
        //     'display_name' => 'Ver Reportes',
        //     'description' => 'Ver lista de Reportes de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => null,
        // ]);
        // Permission::create(attributes: [
        //     'name' => 'reports.export',
        //     'display_name' => 'Exportar Reportes',
        //     'description' => 'Exportar Reportes de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => $report_permission->id,
        // ]);
        // Permission::create(attributes: [
        //     'name' => 'reports.print',
        //     'display_name' => 'Imprimir Reportes',
        //     'description' => 'Imprimir Reportes de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => $report_permission->id,
        // ]);


        // $setting_permission = Permission::create(attributes: [
        //     'name' => 'settings.access',
        //     'display_name' => 'Acceso a configuración',
        //     'description' => 'Acceso a la configuración de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => null,
        // ]);
        // Permission::create(attributes: [
        //     'name' => 'settings.modify',
        //     'display_name' => 'Modificar configuración',
        //     'description' => 'Modificar la configuración de la aplicación',
        //     'guard_name' => 'web',
        //     'parent_id' => $setting_permission->id,
        // ]);

        Cache::forever(key: 'permissions', value: Permission::whereNull('parent_id')->with('children')->get());
    }
}
