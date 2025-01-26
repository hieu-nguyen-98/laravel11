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
    
    public function get_data_with_permissions()
    {
        return $this->model->with(['permissions','users'])->get();
    }
}
