<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    const ACTIVE = 1;
    const INACTIVE = 0;

    protected $fillable = [
        'name',
        'parrent_id',
        'image',
        'content',
        'status',
        'description',
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parrent_id');
    }
}
