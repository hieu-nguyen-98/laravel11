<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserControlelr;
use App\Http\Controllers\LoginController;
use App\Http\Middleware\CheckAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([CheckAdmin::class])->group(function () {
    Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('admin/users', [UserControlelr::class, 'index'])->name('user.index');

    Route::get('/ajax/users', [UserControlelr::class, 'listUser'])->name('users.index');
});

Route::get('login', [LoginController::class, 'index'])->name('login');
Route::post('login', [LoginController::class, 'login'])->name('post.login');