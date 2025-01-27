@extends('admin.layouts')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
   <!-- Permission Table -->
   <div class="card">
      <div class="card-datatable table-responsive">
         <div>
            <div class="row m-3 my-4 justify-content-between">
               <div class="d-md-flex align-items-center col-md-auto ms-auto justify-content-md-between justify-content-center d-flex flex-wrap gap-4 mb-md-0 mb-6 mt-0">
                    <div class="">
                        <input type="search" class="form-control" id="search" placeholder="Search Permission">
                    </div>
                    <div class="btn-group flex-wrap mb-0">
                        <button class="btn add-new btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addPermissionModal">
                            <span>
                                <i class="icon-base bx bx-plus icon-xs me-0 me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Add Permission</span>
                            </span>
                        </button> 
                    </div>
               </div>
            </div>
            <div class="justify-content-between dt-layout-table">
                <div class="d-md-flex justify-content-between align-items-center col-12 dt-layout-full col-md">
                    <table class="table" style="width: 100%;" id="data-table">
                        <thead class="border-top">
                            <tr>
                                <th>Name</th>
                                <th>Assigned to</th>
                                <th>Created date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                            <tbody></tbody>
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
   <!--/ Permission Table -->
   @include('admin.permissions.modal.add')

</div>
@endsection
@section('script')
    <script src="{{ asset('admin/ajax/permission.js') }}?v={{ time() }}"></script>
@endsection