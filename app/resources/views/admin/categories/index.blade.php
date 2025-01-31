@extends('admin.layouts')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
   <!-- Users List Table -->
   <div class="card">
      <div class="card-datatable">
         <div class="">
            <div class="row mx-3 my-4 justify-content-between">
               <div class="d-md-flex align-items-center col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                     <div class="">
                           <input type="search" class="form-control" id="search" placeholder="Search User">
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
                           <button class="btn add-new btn-primary" type="button">
                              <span>
                                 <i class="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
                                 <span class="d-none d-sm-inline-block">Add New Category</span>
                              </span>
                           </button> 
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
                            <th>Parent</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Actions</th>
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
<script src="{{ asset('admin/ajax/category.js') }}?v={{ time() }}"></script>
@endsection