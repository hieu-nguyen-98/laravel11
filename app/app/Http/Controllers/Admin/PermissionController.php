<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PermissionRepository;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    protected $permission_repository;

    public function __construct(
        PermissionRepository $permission_repository
    )
    {
        $this->permission_repository = $permission_repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.permissions.index');
    }

    public function get_list_data(Request $request)
    {
        $permissions = $this->permission_repository->get_data_paginate([],$request->get('search', ''), $role = $request->get('role', ''));
        return response()->json([
            'permissions' => $permissions,
        ], 200);
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
