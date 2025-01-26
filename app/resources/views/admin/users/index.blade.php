@extends('admin.layouts')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
   <div class="row g-6 mb-6">
      <div class="col-sm-6 col-xl-3">
         <div class="card">
            <div class="card-body">
               <div class="d-flex align-items-start justify-content-between">
                  <div class="content-left">
                     <span class="text-heading">Session</span>
                     <div class="d-flex align-items-center my-1">
                        <h4 class="mb-0 me-2">{{ $total_user }}</h4>
                        <p class="text-success mb-0">(+29%)</p>
                     </div>
                     <small class="mb-0">Total Users</small>
                  </div>
                  <div class="avatar">
                     <span class="avatar-initial rounded bg-label-primary">
                     <i class="icon-base bx bx-group icon-lg"></i>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="col-sm-6 col-xl-3">
         <div class="card">
            <div class="card-body">
               <div class="d-flex align-items-start justify-content-between">
                  <div class="content-left">
                     <span class="text-heading">Paid Users</span>
                     <div class="d-flex align-items-center my-1">
                        <h4 class="mb-0 me-2">4,567</h4>
                        <p class="text-success mb-0">(+18%)</p>
                     </div>
                     <small class="mb-0">Last week analytics </small>
                  </div>
                  <div class="avatar">
                     <span class="avatar-initial rounded bg-label-danger">
                     <i class="icon-base bx bx-user-plus icon-lg"></i>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="col-sm-6 col-xl-3">
         <div class="card">
            <div class="card-body">
               <div class="d-flex align-items-start justify-content-between">
                  <div class="content-left">
                     <span class="text-heading">Active Users</span>
                     <div class="d-flex align-items-center my-1">
                        <h4 class="mb-0 me-2">19,860</h4>
                        <p class="text-danger mb-0">(-14%)</p>
                     </div>
                     <small class="mb-0">Last week analytics</small>
                  </div>
                  <div class="avatar">
                     <span class="avatar-initial rounded bg-label-success">
                     <i class="icon-base bx bx-user-check icon-lg"></i>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="col-sm-6 col-xl-3">
         <div class="card">
            <div class="card-body">
               <div class="d-flex align-items-start justify-content-between">
                  <div class="content-left">
                     <span class="text-heading">Pending Users</span>
                     <div class="d-flex align-items-center my-1">
                        <h4 class="mb-0 me-2">237</h4>
                        <p class="text-success mb-0">(+42%)</p>
                     </div>
                     <small class="mb-0">Last week analytics</small>
                  </div>
                  <div class="avatar">
                     <span class="avatar-initial rounded bg-label-warning">
                     <i class="icon-base bx bx-user-voice icon-lg"></i>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- Users List Table -->
   <div class="card">
      <div class="card-header border-bottom">
         <h5 class="card-title mb-0">Search Filters</h5>
         <div class="d-flex justify-content-between align-items-center row pt-4 gap-md-0 g-6">
            <div class="col-md-4 user_role">
                <select id="UserRole" class="form-select text-capitalize">
                    <option value="">Select Role</option>
                </select>
            </div>
            {{-- <div class="col-md-4 user_plan">
               <select id="UserPlan" class="form-select text-capitalize">
                  <option value="">Select Plan</option>
                  <option value="Basic">Basic</option>
                  <option value="Company">Company</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Team">Team</option>
               </select>
            </div>
            <div class="col-md-4 user_status">
               <select id="FilterTransaction" class="form-select text-capitalize">
                  <option value="">Select Status</option>
                  <option value="Pending" class="text-capitalize">Pending</option>
                  <option value="Active" class="text-capitalize">Active</option>
                  <option value="Inactive" class="text-capitalize">Inactive</option>
               </select>
            </div> --}}
         </div>
      </div>
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
                           @can('create')
                           <button class="btn add-new btn-primary" type="button">
                              <span>
                                 <i class="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
                                 <span class="d-none d-sm-inline-block">Add New User</span>
                              </span>
                           </button> 
                           @endcan

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
                           <th>User</th>
                           <th>Email</th>
                           <th>Role</th>
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
<script src="{{ asset('admin/ajax/user.js') }}?v={{ time() }}"></script>
@endsection