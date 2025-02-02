@extends('admin.layouts')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
   <!-- Users List Table -->
   <div class="card">
      <div class="card-header border-bottom">
         <h5 class="card-title mb-0">Search Filters</h5>
         <div class="d-flex justify-content-between align-items-center row pt-4 gap-md-0 g-6">
            <div class="col-md-4">
                <select id="status" class="form-select text-capitalize">
                    <option value="">--- Chọn ---</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>
            <div class="col-md-4">
               <select id="category" class="form-select text-capitalize">
                  <option value="">--- Category ---</option>
                  @foreach ($categories as $item)
                     <option value="{{ $item->id }}">{{ $item->name }}</option>
                  @endforeach
               </select>
            </div>
            <div class="col-md-4 user_status">
               {{-- <select id="FilterTransaction" class="form-select text-capitalize">
                  <option value="">Select Status</option>
                  <option value="Pending" class="text-capitalize">Pending</option>
                  <option value="Active" class="text-capitalize">Active</option>
                  <option value="Inactive" class="text-capitalize">Inactive</option>
               </select> --}}
            </div>
         </div>
      </div>
      <div class="card-datatable">
         <div class="">
            <div class="row mx-3 my-4 justify-content-between">
               <div class="d-md-flex align-items-center col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                     <div class="">
                           <input type="search" class="form-control" id="search" placeholder="Search Name Product">
                     </div>
                     <div class="dt-buttons btn-group flex-wrap d-flex gap-4 mb-md-0 mb-6">
                           <div class="btn-group">
                              <button class="btn buttons-collection btn-label-secondary dropdown-toggle" type="button" >
                                 <span>
                                       <span class="d-flex align-items-center gap-2">
                                          <i class="icon-base bx bx-export icon-sm"></i> 
                                          <span class="d-none d-sm-inline-block">Export</span>
                                       </span>
                                 </span>
                              </button>
                           </div>
                           <a class="btn add-new btn-primary" href="{{ route('product.create') }}">
                              <span>
                                 <i class="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
                                 <span class="d-none d-sm-inline-block">Add New Product</span>
                              </span>
                           </a> 
                     </div>
               </div>
            </div>
            <div class="justify-content-between">
               <div class="d-md-flex justify-content-between align-items-center table-responsive">
                  <table class=" table border-top" style="width: 100%;" id="data-table">
                     <thead>
                        <tr>
                           <th class="">
                                <input class="form-check-input" type="checkbox" aria-label="Select all rows">
                           </th>
                           <th>Image</th>
                           <th>Name</th>
                           <th>Category</th>
                           <th>Price</th>
                           <th>SKU</th>
                           <th>Status</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>

                     </tbody>
                  </table>
               </div>
            </div>

            <div class="row mx-3 justify-content-between">
                <div class="d-md-flex justify-content-between align-items-center col-md-auto me-auto mt-0">
                    <div id="showing"></div>
                </div>
                <div class="d-md-flex align-items-center col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-3">
                    <div class="">
                        <nav>
                            <ul class="pagination" id="pagination-links"></ul>
                        </nav>
                    </div>
                </div>
            </div>
         </div>
      </div>
   </div>
</div>
@endsection

@section('script')
<script src="{{ asset('admin/ajax/product.js') }}?v={{ time() }}"></script>
@endsection