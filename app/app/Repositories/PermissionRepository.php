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
   
    public function get_data_paginate($relations = [], $search = null, $role = null)
    {
        $query = $this->model->with($relations);
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }

        $permissions = $query->paginate(10);

        $permissions->getCollection()->transform(function ($permission) {
            $permission->roles = $permission->roles->pluck('name'); 
            return $permission;
        });
        return $permissions;
    }
}
