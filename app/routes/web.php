<?php

use App\Http\Controllers\Admin\CalendarController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserControlelr;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Middleware\CheckAdmin;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::middleware([CheckAdmin::class])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('users', [UserControlelr::class, 'index'])->name('user.index');
        Route::get('users/show/{id}', [UserControlelr::class, 'show'])->name('user.show');
        
        Route::prefix('categories')->group(function () {
            Route::get('', [CategoryController::class, 'index'])->name('category.index');
            Route::get('create', [CategoryController::class, 'create'])->name('category.create');
            Route::post('create', [CategoryController::class, 'store'])->name('category.store');
            Route::get('edit/{id}', [CategoryController::class, 'edit'])->name('category.edit');
            Route::get('change_status/{id}', [CategoryController::class, 'change_status']);
            Route::post('update/{id}', [CategoryController::class, 'update'])->name('category.update');
        });
        
        Route::prefix('products')->group(function () {
            Route::get('', [ProductController::class,'index'])->name('product.index');
            Route::get('create', [ProductController::class, 'create'])->name('product.create');
            Route::post('create', [ProductController::class, 'store'])->name('product.store');
            Route::get('edit/{id}', [ProductController::class, 'edit'])->name('product.edit');
            Route::get('change_status/{id}', [ProductController::class, 'change_status']);
            Route::post('update/{id}', [ProductController::class, 'update'])->name('product.update');

        });

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

        Route::prefix('categories')->group(function () {
            Route::get('get_list_data', [CategoryController::class, 'get_list_data']);
            Route::delete('delete/{id}', [CategoryController::class, 'destroy']);
        });

        Route::get('products/get_list_data', [ProductController::class, 'get_list_data']);
    });
    
});

Route::get('login', [LoginController::class, 'index'])->name('login');
Route::post('login', [LoginController::class, 'login'])->name('post.login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/', [HomeController::class, 'index'])->name('home');