<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {
            DB::table('categories')->insert([
                'name' => 'Category ' . $i,
                'parrent_id' => $i > 10 ? rand(1, 10) : 0, 
                'image' => 'category_' . $i . '.jpg',
                'content' => 'Content for category ' . $i,
                'status' => rand(0, 1),
                'description' => 'This is a description for category ' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
