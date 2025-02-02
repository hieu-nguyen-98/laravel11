<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\CategoryRepository;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log as FacadesLog;

class ProductController extends Controller
{
    protected $product_repository;
    protected $category_repository;



    public function __construct(
        ProductRepository $product_repository,
        CategoryRepository $category_repository
    )
    {
        $this->product_repository = $product_repository;
        $this->category_repository = $category_repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.products.index',[
            'categories' => $this->category_repository->get_all()
        ]);
    }

    public function get_list_data(Request $request)
    {
        $search = $request->get('search', '');
        $status = $request->get('status', '');
        $category = $request->get('category', '');
        $products = $this->product_repository->get_data_paginate(['category','images'], $search, $status, $category);
        return response()->json([
            'products' => $products,
        ], 200);
    }

    public function change_status(Request $request, $id)
    {
        $product = $this->product_repository->find($id);
        try{
            $product->status = $request->status === Product::Active ? Product::Inactive : Product::Active;
            $product->save();
            return redirect()->route('product.index')->with('success', 'Thay đổi trạng thái thành công!');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Có lỗi xảy ra! Vui lòng thử lại.');
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.products.create',[
            'categories' => $this->category_repository->get_all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('products', 'public');
                $request->merge(['image' => $imagePath]);
            }

            $this->product_repository->create($request->all());

            DB::commit(); 

            return redirect()->route('product.index')->with('success', 'Sản phẩm đã được thêm thành công!');

        } catch (\Exception $e) {
            DB::rollBack();
            FacadesLog::info($e);
            return redirect()->back()->with('error', 'Có lỗi xảy ra! Vui lòng thử lại.');
        }
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
        return view('admin.products.edit',[
            'product' => $this->product_repository->find($id),
            'categories' => $this->category_repository->get_all()
        ]);
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
