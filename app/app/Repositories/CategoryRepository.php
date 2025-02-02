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
        if (!$category->parent) {
            return '';
        }
    
        $names = [];
        $visited = []; 
    
        while ($category && $category->parent) {
            if (in_array($category->id, $visited)) {
                break;
            }
            $visited[] = $category->id;
            array_unshift($names, $category->name);
            $category = $category->parent;
        }
    
        if ($category) {
            array_unshift($names, $category->name);
        }
    
        return implode(' || ', $names);
    }

    public function get_data_with_relation($id)
    {
        return $this->model->with('children')->findOrFail($id);
    }

    public function delete_multi($ids)
    {
        return $this->model->whereIn('id', $ids)->delete();
    }

    public function get_all_data_with_relation($relation)
    {
        return $this->model->with($relation)->where('status', $this->model::ACTIVE)->where('parrent_id', 0)->limit(8)->get();
    }
}
