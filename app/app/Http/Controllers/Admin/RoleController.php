<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PermissionRepository;
use App\Repositories\RoleRepository;
use Illuminate\Http\Request;

class RoleController extends Controller
{

    protected $role_repository;
    protected $permission_repository;

    public function __construct(
        RoleRepository $role_repository,
        PermissionRepository $permission_repository,
    )
    {
        $this->role_repository = $role_repository;
        $this->permission_repository = $permission_repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = $this->role_repository->get_data_with_permissions();
        return view('admin.roles.index',[
            'roles' => $roles,
        ]);
    }

    public function get_list_data()
    {
        $roles = $this->role_repository->get_data_with_permissions();
        $permissions = $this->permission_repository->get_all();
        return response()->json([
            'roles' => $roles,
            'permissions' => $permissions,
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
