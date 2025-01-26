<?php
namespace App\Repositories;

use Spatie\Permission\Models\Role;

class RoleRepository extends BaseRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = new Role();
    }
   
}
