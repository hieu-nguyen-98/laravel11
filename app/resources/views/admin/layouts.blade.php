<!doctype html>

<html lang="en" class="light-style layout-menu-fixed layout-compact" dir="ltr"
  data-theme="theme-default"
  data-assets-path="{{asset('admin/assets/') }}?v={{ time() }}"
  data-template="vertical-menu-template-free"
  data-style="light">
  <head>
    @include('admin.common.head')
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
    @yield('script')
  </body>
</html>