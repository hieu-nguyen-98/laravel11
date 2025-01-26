@extends('admin.layouts')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
   <h4 class="mb-1">Roles List</h4>
   <p class="mb-6">A role provided access to predefined menus and features so that depending on assigned role an administrator can have access to what user needs.</p>
   <!-- Role cards -->
   <div class="row g-6">
        @foreach ($roles as $role)
        <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="card">
               <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                     <h6 class="fw-normal mb-0 text-body" id="total-users">Total {{ $role->users()->count() }} users</h6> 
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div class="role-heading">
                        <h5 class="mb-1">{{ $role->name }}</h5>
                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="role-edit-modal">
                            <span>Edit Role</span>
                        </a>
                    </div>
                    <a href="javascript:void(0);"><i class="icon-base bx bx-copy icon-md text-body-secondary"></i></a>
                  </div>
               </div>
            </div>
        </div>
        @endforeach
      
      <div class="col-xl-4 col-lg-6 col-md-6">
         <div class="card h-100">
            <div class="row h-100">
               <div class="col-sm-5">
                  <div class="d-flex align-items-end h-100 justify-content-center mt-sm-0 mt-4 ps-6">
                     <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/lady-with-laptop-light.png" class="img-fluid" alt="Image" width="120" data-app-light-img="illustrations/lady-with-laptop-light.png" data-app-dark-img="illustrations/lady-with-laptop-dark.png" style="visibility: visible;">
                  </div>
               </div>
               <div class="col-sm-7">
                  <div class="card-body text-sm-end text-center ps-sm-0">
                     <button data-bs-target="#addRoleModal" data-bs-toggle="modal" class="btn btn-sm btn-primary mb-4 text-nowrap add-new-role">Add New Role</button>
                     <p class="mb-0">
                        Add new role, <br>
                        if it doesn't exist.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="col-12">
         <h4 class="mt-6 mb-1">Total users with their roles</h4>
         <p class="mb-0">Find all of your company’s administrator accounts and their associate roles.</p>
      </div>
      <div class="col-12">
         <!-- Role Table -->
         <div class="card">
            <div class="card-datatable">
               <div class="">
                  <div class="row me-3 ms-2 justify-content-between">
                     <div class="d-md-flex align-items-center col-md-auto ms-auto justify-content-md-between justify-content-center d-flex flex-wrap gap-4 mb-sm-0 mb-4 mt-0">
                        <div class="my-4">
                            <input type="search" class="form-control" id="search" placeholder="Search User">
                        </div>
                        <div class="w-px-200 my-md-0 mt-6 mb-2">
                            <select id="UserRole" class="form-select text-capitalize">
                                <option value="">Select Role</option>
                            </select>
                        </div>
                        {{-- <div class="user_plan w-px-200 mb-6 mb-md-0">
                           <select id="Userplan" class="form-select text-capitalize">
                              <option value=""> Select Plan </option>
                              <option value="Basic" class="text-capitalize">Basic</option>
                              <option value="Company" class="text-capitalize">Company</option>
                              <option value="Enterprise" class="text-capitalize">Enterprise</option>
                              <option value="Team" class="text-capitalize">Team</option>
                           </select>
                        </div> --}}
                     </div>
                  </div>
                  <div class="justify-content-between ">
                     <div class="d-md-flex justify-content-between align-items-center col-12 col-md">
                        <table class="table border-top table-responsive" style="width: 100%;" id="data-table">
                            <thead>
                                <tr>
                                   <th class="">
                                        <input class="form-check-input" type="checkbox" aria-label="Select all rows">
                                    </th>
                                   <th>User</th>
                                   <th>Email</th>
                                   <th>Role</th>
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
         <!--/ Role Table -->
      </div>
   </div>
   <!--/ Role cards -->
   @include('admin.roles.modal.add')
</div>
@endsection
@section('script')
<script src="{{ asset('admin/ajax/user.js') }}?v={{ time() }}"></script>
<script src="{{ asset('admin/ajax/role.js') }}?v={{ time() }}"></script>
@endsection