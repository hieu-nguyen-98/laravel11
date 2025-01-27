<?php
namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = new User();
    }
   
    public function get_data_paginate($relations = [], $search = null, $role = null)
    {
        $query = $this->model->with($relations);
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            }
            if ($role) {
                $query->whereHas('roles', function ($q) use ($role) {
                    $q->where('name', $role);
                });
            }

        $users = $query->paginate(10);

        $users->getCollection()->transform(function ($user) {
            $user->roles = $user->roles->pluck('name'); 
            return $user;
        });
        return $users;
    }

}
