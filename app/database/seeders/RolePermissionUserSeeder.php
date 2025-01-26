<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionUserSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            'create',
            'edit',
            'delete',
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
                $role->syncPermissions(['create', 'edit', 'delete']);
            }

            if ($roleName === 'MANAGER') {
                $role->syncPermissions(['create', 'edit']);
            }

            if ($roleName === 'USER') {
                $role->syncPermissions(['create']);
            }
        }

        $user = \App\Models\User::firstOrCreate([
            'email' => 'supperadmin@example.com',
        ], [
            'name' => 'Supper Admin',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole('SUPPER ADMIN');

        $user = \App\Models\User::firstOrCreate([
            'email' => 'admin@example.com',
        ], [
            'name' => 'Admin',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole('ADMIN');

        $user = \App\Models\User::firstOrCreate([
            'email' => 'manager@example.com',
        ], [
            'name' => 'Manager',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole('MANAGER');

        $user = \App\Models\User::firstOrCreate([
            'email' => 'user@example.com',
        ], [
            'name' => 'User',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole('USER');

        $this->command->info('Roles and permissions have been seeded successfully!');
    }
}
