<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    protected $category_repository;

    public function __construct(
        CategoryRepository $category_repository
    )
    {
        $this->category_repository = $category_repository;
    }
    public function index()
    {
        $category = $this->category_repository->get_all_data_with_relation('children');
        return view('client.layouts', [
            'categories' => $this->category_repository->get_all_data_with_relation('children'),
        ]);
    }
}
