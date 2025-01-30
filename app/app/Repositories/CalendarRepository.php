<?php
namespace App\Repositories;

use App\Models\Calendar;

class CalendarRepository extends BaseRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = new Calendar();
    }
    
    public function get_label()
    {
        return $this->model->distinct()->pluck('label_id');
    }
}
