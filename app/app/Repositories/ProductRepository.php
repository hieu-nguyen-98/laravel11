<?php
namespace App\Repositories;

use App\Models\Product;

class ProductRepository extends BaseRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = new Product();
    }
    
    public function get_data_paginate($relations = [], $search = null, $status = null, $category = null)
    {
        $query = $this->model->with($relations);
        
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }
            if($status !== null){
                $query->where('status', (int)$status);
            }

            if($category) {
                $query->where('category_id', $category);
            }

        $products = $query->orderby('status', 'desc')->paginate(10);
        
        $products->getCollection()->transform(function ($product) {
            $product->image_url = $product->images->isNotEmpty() 
                ? $product->images->first()->image 
                : '/admin/assets/img/No_image_available.svg.png';
            return $product;
        });

        return $products;
    }
}
