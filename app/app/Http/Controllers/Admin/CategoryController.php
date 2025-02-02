<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    protected $category_repository;

    public function __construct(
        CategoryRepository $category_repository
    )
    {
        $this->category_repository = $category_repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.categories.index');
    }

    public function get_list_data(Request $request)
    {
        $categories = $this->category_repository->get_data_paginate(['parent.parent'],$request->get('search', ''));
        return response()->json([
            'categories' => $categories,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = $this->category_repository->get_all();
        return view('admin.categories.create',[
            'categories' => $categories
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
                $imagePath = $request->file('image')->store('categories', 'public');
                $request->merge(['image' => $imagePath]);
            }

            $this->category_repository->create($request->all());

            DB::commit(); 

            return redirect()->route('category.index')->with('success', 'Danh mục đã được thêm thành công!');

        } catch (\Exception $e) {
            DB::rollBack();

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
        $category = $this->category_repository->find($id);
        if(!$category){
            return redirect()->route('category.index')->with('error', 'Danh mục không tìm thấy!');
        }
        return view('admin.categories.edit', [
            'category' => $category,
            'categories' => $this->category_repository->get_all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->category_repository->find($id);
        DB::beginTransaction();
        try {
            $category = $this->category_repository->find($id);
        
            if (!$category) {
                return redirect()->route('category.index')->with('error', 'Danh mục không tồn tại!');
            }

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('categories', 'public');
                $request->merge(['image' => $imagePath]);
            }

            $this->category_repository->update($request->all(), $id);

            DB::commit(); 

            return redirect()->route('category.index')->with('success', 'Danh mục đã được cập nhập thành công!');

        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Có lỗi xảy ra! Vui lòng thử lại.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction(); 
    
            $category = $this->category_repository->get_data_with_relation($id);
    
            if ($category->children->count() > 0) {
                $childIds = $category->children->pluck('id')->toArray();
                $this->category_repository->delete_multi($childIds);
            }
    
            $category->delete();
    
            DB::commit(); 
    
            return response()->json([
                'success' => true,
                'message' => 'Danh mục và các danh mục con đã được xóa thành công!'
            ]);
        } catch (\Exception $e) {
            DB::rollBack(); 
    
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra! Không thể xóa danh mục.'
            ], 500);
        }
    }

    public function change_status(Request $request, $id)
    {
        $category = $this->category_repository->find($id);
        try{
            $category->status = $request->status === Category::ACTIVE ? Category::INACTIVE : Category::ACTIVE;
            $category->save();
            return redirect()->route('category.index')->with('success', 'Thay đổi trạng thái thành công!');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Có lỗi xảy ra! Vui lòng thử lại.');
        }
        
    }
}
