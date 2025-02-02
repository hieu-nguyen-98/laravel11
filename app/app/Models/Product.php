<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    const Active = 1;
    const Inactive = 0;
    
    protected $fillable = [
        'name',
        'category_id',
        'description',
        'content',
        'price',
        'sku',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }
}

