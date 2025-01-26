<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserControlelr;
use App\Http\Controllers\LoginController;
use App\Http\Middleware\CheckAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([CheckAdmin::class])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('users', [UserControlelr::class, 'index'])->name('user.index');
        Route::get('roles', [RoleController::class, 'index'])->name('role.index');
    });
    

    Route::get('/ajax/users', [UserControlelr::class, 'listUser']);
    Route::get('/ajax/roles/get_list_data', [RoleController::class, 'get_list_data']);
});

Route::get('login', [LoginController::class, 'index'])->name('login');
Route::post('login', [LoginController::class, 'login'])->name('post.login');