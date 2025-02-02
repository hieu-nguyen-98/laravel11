@extends('admin.layouts')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <div class="row g-6 mb-6">
       <div class="col-md">
          <div class="card">
             <h5 class="card-header">Edit Category</h5>
             <div class="card-body">
                <form class="needs-validation" action="{{ route('category.update', $category->id) }}" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-6">
                        <label class="form-label">Profile pic</label>
                        <input type="file" class="form-control" name="image">
                     </div>
                    <div class="mb-6">
                      <label class="form-label">Name</label>
                      <input type="text" class="form-control" name="name" value="{{ $category->name }}">
                    </div>
                    <div class="mb-6">
                        <label class="form-label">Parent Category</label>
                        <select class="form-select" name="parrent_id">
                            <option value="">--- Chọn ---</option>
                            @foreach ($categories as $item)
                                <option 
                                    @if ($item->id == $category->parrent_id) selected @endif
                                    value="{{ $item->id }}"
                                >
                                    {{ $item->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mb-6">
                        <label class="form-label">Content</label>
                        <input type="text" class="form-control" name="content" value="{{ $category->content }}">
                    </div>
                    <div class="mb-6">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" cols="30" rows="10">
                            {!! $category->description !!}
                        </textarea>
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