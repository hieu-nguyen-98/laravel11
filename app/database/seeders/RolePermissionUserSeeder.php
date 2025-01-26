<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionUserSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Permission::truncate();
        Role::truncate();
        User::truncate();

        $permissions = [
            'create',
            'edit',
            'delete',
            'view',
            'view_detail'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $roles = [
            'SUPPER ADMIN',
            'ADMIN',
            'MANAGER',
            'USER',
        ];

        foreach ($roles as $roleName) {
            $role = Role::firstOrCreate(['name' => $roleName]);

            if ($roleName === 'SUPPER ADMIN') {
                $role->syncPermissions(Permission::all());
            }

            if ($roleName === 'ADMIN') {
                $role->syncPermissions(['create', 'edit', 'delete','view', 'view_detail']);
            }

            if ($roleName === 'MANAGER') {
                $role->syncPermissions(['view', 'view_detail']);
            }

            if ($roleName === 'USER') {
                $role->syncPermissions([]);
            }
        }

        $user = \App\Models\User::firstOrCreate([
            'email' => 'supperadmin@example.com',
        ], [
            'name' => 'Supper Admin',
            'password' => bcrypt('123456'),
        ]);
        $user->assignRole('SUPPER ADMIN');

        $user = \App\Models\User::firstOrCreate([
            'email' => 'admin@example.com',
        ], [
            'name' => 'Admin',
            'password' => bcrypt('123456'),
        ]);
        $user->assignRole('ADMIN');

        $user = \App\Models\User::firstOrCreate([
            'email' => 'manager@example.com',
        ], [
            'name' => 'Manager',
            'password' => bcrypt('123456'),
        ]);
        $user->assignRole('MANAGER');

        $user = \App\Models\User::firstOrCreate([
            'email' => 'user@example.com',
        ], [
            'name' => 'User',
            'password' => bcrypt('123456'),
        ]);
        $user->assignRole('USER');

        $this->command->info('Roles and permissions have been seeded successfully!');
    }
}
