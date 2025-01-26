<?php
namespace App\Repositories;

use Spatie\Permission\Models\Permission;

class PermissionRepository extends BaseRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = new Permission();
    }
   
}
