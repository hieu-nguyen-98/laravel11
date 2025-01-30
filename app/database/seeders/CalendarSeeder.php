<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class CalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        DB::table('calendars')->truncate();

        $userIds = User::pluck('id')->toArray();

        for ($i = 0; $i < 100; $i++) {
            $status = $faker->numberBetween(0, 1); 

            $startTime = $faker->dateTimeBetween('-1 year', 'now');
            $endTime = $status === 1
                ? (clone $startTime)->setTime(23, 59, 59)
                : $faker->dateTimeBetween($startTime, '+1 year');

            DB::table('calendars')->insert([
                'title' => $faker->sentence(3),
                'user_id' => $faker->randomElement($userIds), 
                'label_id' => $faker->numberBetween(0, 3),
                'start_time' => $startTime,
                'end_time' => $endTime,
                'status' => $status,
                'url' => $faker->optional()->url(),
                'location' => $faker->optional()->address(), 
                'color' => $faker->optional()->text(200),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
