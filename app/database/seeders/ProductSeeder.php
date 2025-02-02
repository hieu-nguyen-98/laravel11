<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $categoryIds = DB::table('categories')->pluck('id')->toArray();

        if (empty($categoryIds)) {
            return;
        }

        for ($i = 1; $i <= 100; $i++) {
            DB::table('products')->insert([
                'name' => $faker->word,
                'category_id' => $faker->randomElement($categoryIds),
                'description' => $faker->paragraph,
                'content' => $faker->sentence,
                'price' => $faker->randomFloat(2, 10, 1000), 
                'sku' => strtoupper($faker->bothify('??###??')),
                'status' => rand(0, 1),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
