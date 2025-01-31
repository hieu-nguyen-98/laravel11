<?php
namespace App\Repositories;

use App\Models\Category;

class CategoryRepository extends BaseRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = new Category();
    }
   
    public function get_data_paginate($relations = [], $search = null)
    {
        $query = $this->model->with($relations);
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }

        $categories = $query->orderby('status', 'desc')->paginate(10);
        
        $categories->getCollection()->transform(function ($category) {
            $category->full_name = $this->getFullCategoryName($category);
            return $category;
        });
        
        return $categories;
    }

    private function getFullCategoryName($category)
    {
        $names = [];
        while ($category) {
            array_unshift($names, $category->name);
            $category = $category->parent;
        }
        return implode(' || ', $names);
    }
}
