@extends('admin.layouts')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <div class="row g-6 mb-6">
       <div class="col-md">
          <div class="card">
             <h5 class="card-header">Create Category</h5>
             <div class="card-body">
                <form class="needs-validation" action="{{ route('category.store') }}" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-6">
                        <label class="form-label">Profile pic</label>
                        <input type="file" class="form-control" name="image">
                     </div>
                    <div class="mb-6">
                      <label class="form-label">Name</label>
                      <input type="text" class="form-control" name="name">
                    </div>
                    <div class="mb-6">
                        <label class="form-label">Parent Category</label>
                        <select class="form-select" name="parrent_id">
                            <option value="">--- Chọn ---</option>
                            @foreach ($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mb-6">
                        <label class="form-label">Content</label>
                        <input type="text" class="form-control" name="content">
                    </div>
                    <div class="mb-6">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" cols="30" rows="10"></textarea>
                    </div>
                   <div class="row">
                      <div class="col-12">
                         <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                   </div>
                </form>
             </div>
          </div>
       </div>
    </div>
</div>
@endsection