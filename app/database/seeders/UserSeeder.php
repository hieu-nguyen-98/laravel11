<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        $managerRole = Role::firstOrCreate(['name' => 'MANAGER']);
        $userRole = Role::firstOrCreate(['name' => 'USER']);

        User::factory(100)->create()->each(function ($user) use ($managerRole, $userRole) {
            $role = rand(0, 1) ? $managerRole : $userRole;
            $user->assignRole($role);
        });

        $this->command->info('100 users have been seeded with MANAGER and USER roles.');
    }
}