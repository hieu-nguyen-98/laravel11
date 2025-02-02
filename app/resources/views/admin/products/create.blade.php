@extends('admin.layouts')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <div class="app-ecommerce">
        <!-- Add Product -->
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
            <div class="d-flex flex-column justify-content-center">
                <h4 class="mb-1">Add a new Product</h4>
                <p class="mb-0">Orders placed across your store</p>
            </div>
        </div>
        <form action="{{ route('product.store') }}" method="post" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <!-- First column-->
                <div class="col-12 col-lg-8">
                    <!-- Product Information -->
                    <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-tile mb-0">Product information</h5>
                    </div>
                    <div class="card-body">
                        <div class="row mb-6">
                            <div class="col">
                                <label class="form-label">Name</label> 
                                <input type="text" class="form-control" placeholder="Product title" name="name">
                            </div>
                            <div class="col">
                                <label class="form-label">SKU</label> 
                                <input type="number" class="form-control" placeholder="SKU" name="sku">
                            </div>
                        </div>
                        <div class="mb-6">
                            <label class="form-label">Content</label>
                            <input type="text" class="form-control" name="content">
                        </div>
                        <!-- Description -->
                        <div class="mb-6">
                            <label class="form-label">Description</label>
                            <textarea name="description" class="form-control" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    </div>
                    <!-- /Product Information -->
                    <!-- Media -->
                    <div class="card mb-6">
                        <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 card-title">Product Image</h5>
                        </div>
                        <div class="card-body">
                            <form action="/upload" class="dropzone needsclick p-0 dz-clickable" id="dropzone-basic">
                                <input type="file" class="form-control" id="">
                            </form>
                        </div>
                    </div>
                    <!-- /Media -->
                    <!-- Variants -->
                    <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Variants</h5>
                    </div>
                    <div class="card-body">
                        <form class="form-repeater">
                            <div data-repeater-list="group-a">
                                <div data-repeater-item="">
                                <div class="row g-6 mb-6">
                                    <div class="col-4">
                                        <label class="form-label">Options</label>
                                        <div class="position-relative">
                                            <select class="select2 form-select select2-hidden-accessible" data-placeholder="Size" tabindex="-1" aria-hidden="true">
                                            <option value="" data-select2-id="2">Size</option>
                                            <option value="size" data-select2-id="25">Size</option>
                                            <option value="color" data-select2-id="26">Color</option>
                                            <option value="weight" data-select2-id="27">Weight</option>
                                            <option value="smell" data-select2-id="28">Smell</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <label class="form-label invisible">Not visible</label>
                                        <input type="number" class="form-control" placeholder="Enter size">
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-danger">
                                    <i class="icon-base bx bx-plus icon-sm"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                    <!-- /Variants -->
                    
                </div>
                <!-- /First column -->
                <!-- Second column -->
                <div class="col-12 col-lg-4">
                    <!-- Pricing Card -->
                    <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Pricing</h5>
                    </div>
                    <div class="card-body">
                        <!-- Base Price -->
                        <div class="mb-6">
                            <label class="form-label">Base Price</label>
                            <input type="number" class="form-control" placeholder="Price" name="price">
                        </div>
                        <!-- Discounted Price -->
                        <div class="mb-6">
                            <label class="form-label">Discounted Price</label>
                            <input type="number" class="form-control" placeholder="Discounted Price">
                        </div>
                        <!-- Instock switch -->
                        <div class="d-flex justify-content-between align-items-center border-top pt-2">
                            <span class="mb-0">In stock</span>
                            <div class="w-25 d-flex justify-content-end">
                                <div class="form-check form-switch me-n3">
                                <input type="checkbox" class="form-check-input" checked="">
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <!-- /Pricing Card -->
                    <!-- Organize Card -->
                    <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Organize</h5>
                    </div>
                    <div class="card-body">
                        <!-- Category -->
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mb-6 col ecommerce-select2-dropdown">
                                <label class="form-label mb-1">
                                <span>Category</span>
                                </label>
                                <div class="position-relative">
                                <select name="category_id" class="select2 form-select" data-placeholder="Select Category">
                                    <option value="">Select Category</option>
                                    @foreach ($categories as $item)
                                        <option value="{{ $item->id }}">{{ $item->name }}</option>
                                    @endforeach
                                </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Status -->
                        <div class="mb-6 col ecommerce-select2-dropdown">
                            <label class="form-label mb-1" for="status-org">Status </label>
                            <div class="position-relative">
                                <select class="form-select" name="status">
                                    <option value="1" selected>Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    </div>
                    <!-- /Organize Card -->
                </div>
                <!-- /Second column -->

                <div class="col-12 col-lg-12">
                    <button type="submit" class="btn btn-primary">Create Product</button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection