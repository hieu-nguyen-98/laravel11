<?php

use App\Http\Controllers\Admin\CalendarController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PermissionController;
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
        Route::get('users/show/{id}', [UserControlelr::class, 'show'])->name('user.show');

        Route::get('categories', [CategoryController::class, 'index'])->name('category.index');

        Route::get('calendars', [CalendarController::class, 'index'])->name('calendar.index');

        Route::middleware(['role:SUPPER ADMIN'])->group(function () {
            Route::get('roles', [RoleController::class, 'index'])->name('role.index');
            Route::get('permissions', [PermissionController::class, 'index'])->name('permission.index');
        });

    });
    
    Route::prefix('ajax')->group(function () {
        Route::get('users', [UserControlelr::class, 'listUser']);
        Route::get('roles/get_list_data', [RoleController::class, 'get_list_data']);
        Route::get('permissions/get_list_data', [PermissionController::class, 'get_list_data']);
        Route::get('calendars/get_list_data', [CalendarController::class, 'get_list_data']);
        Route::get('categories/get_list_data', [CategoryController::class, 'get_list_data']);
    });
    
});

Route::get('login', [LoginController::class, 'index'])->name('login');
Route::post('login', [LoginController::class, 'login'])->name('post.login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
