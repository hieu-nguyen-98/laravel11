<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'title',
        'user_id',
        'label_id',
        'start_time',
        'end_time',
        'status',
        'url',
        'location',
        'color',
    ];
}
