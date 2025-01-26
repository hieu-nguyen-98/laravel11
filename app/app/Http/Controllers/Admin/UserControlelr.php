<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserControlelr extends Controller
{
    protected $user_repository;
    protected $role_repository;

    public function __construct(
        UserRepository $user_repository,
        RoleRepository $role_repository
    )
    {
        $this->user_repository = $user_repository;
        $this->role_repository = $role_repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.users.index',[
            'total_user' => $this->user_repository->count([]),
        ]);
    }

    public function listUser(Request $request)
    {
        $user = $this->user_repository->get_data_paginate([],$request->get('search', ''), $role = $request->get('role', ''));
        $role = $this->role_repository->get_all();
        return response()->json([
            'users' => $user,
            'roles' => $role,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
