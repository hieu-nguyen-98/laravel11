<!doctype html>

<html lang="en" class="light-style layout-menu-fixed layout-compact" dir="ltr"
  data-theme="theme-default"
  data-assets-path="{{asset('admin/assets/') }}?v={{ time() }}"
  data-template="vertical-menu-template-free"
  data-style="light">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <head>
    @include('admin.common.head')
    @yield('style')
  </head>

  <body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        @include('admin.common.sidebar')

        <!-- Layout container -->
        <div class="layout-page">
            @include('admin.common.navbar')

          <!-- Content wrapper -->
          <div class="content-wrapper">
            @yield('content')

            @include('admin.common.footer')

            <div class="content-backdrop fade"></div>
          </div>
          <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
      </div>

      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    <!-- / Layout wrapper -->

    @include('admin.common.script')
    @if(session('success'))
      <script>
          Swal.fire({
              icon: 'success',
              title: 'Thành công!',
              text: '{{ session('success') }}',
              showConfirmButton: false,
              timer: 2000
          });
      </script>
    @endif
    @if(session('error'))
      <script>
          Swal.fire({
              icon: 'error',
              title: 'Lỗi!',
              text: '{{ session('error') }}',
              showConfirmButton: true
          });
      </script>
    @endif
    @yield('script')
  </body>
</html>
