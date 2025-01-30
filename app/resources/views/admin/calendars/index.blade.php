@extends('admin.layouts')
@section('style')
<link rel="stylesheet" href="{{asset('admin/assets/vendor/libs/fullcalendar/fullcalendar.css') }}?v={{ time() }}">
<link rel="stylesheet" href="{{asset('admin/assets/vendor/libs/flatpickr/flatpickr.css') }}?v={{ time() }}">
<link rel="stylesheet" href="{{asset('admin/assets/vendor/libs/pickr/pickr-themes.css') }}?v={{ time() }}">
<link rel="stylesheet" href="{{asset('admin/assets/vendor/css/pages/app-calendar.css') }}?v={{ time() }}">
<link rel="stylesheet" href="{{asset('admin/assets/vendor/libs/select2/select2.css') }}?v={{ time() }}" />
@endsection
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
   <div class="card app-calendar-wrapper">
      <div class="row g-0">
         <!-- Calendar Sidebar -->
         <div class="col app-calendar-sidebar border-end">
            <div class="border-bottom p-6 my-sm-0 mb-4">
               <button class="btn btn-primary btn-toggle-sidebar w-100" data-bs-toggle="offcanvas" data-bs-target="#addEventSidebar" aria-controls="addEventSidebar">
               <i class="icon-base bx bx-plus icon-16px me-2"></i>
               <span class="align-middle">Add Event</span>
               </button>
            </div>
            <div class="px-3 pt-2">
               <!-- inline calendar (flatpicker) -->
               <div class="flatpickr-wrapper">
                  <div class="flatpickr-calendar animate inline">
                     <div class="flatpickr-innerContainer">
                        <div class="flatpickr-rContainer">
                           <div class="flatpickr-days" id="calendar"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <hr class="mb-6 mx-n4 mt-3">
            <div class="px-6 pb-2">
               <!-- Filter -->
               <div>
                  <h5>Event Filters</h5>
               </div>
               <div class="form-check form-check-secondary mb-5 ms-2">
                  <input class="form-check-input select-all" type="checkbox" id="selectAll" data-value="all" checked="">
                  <label class="form-check-label">View All</label>
               </div>
               <div class="app-calendar-events-filter text-heading">
                  @foreach ($labels as $label)
                     <div class="form-check form-check-danger mb-5 ms-2">
                        <input class="form-check-input input-filter" data-value="{{ $label }}" type="checkbox" id="checkbox-{{ $label }}">
                        <label class="form-check-label">
                           {{ $label_map[$label] ?? 'Unknown' }}
                        </label>
                     </div>
                  @endforeach
               </div>
            </div>
         </div>
         <!-- /Calendar Sidebar -->
         <!-- Calendar & Modal -->
         <div class="col app-calendar-content">
            <div class="card shadow-none border-0">
               <div class="card-body pb-0">
                  <!-- FullCalendar -->
                  <div class="fc fc-media-screen fc-direction-ltr fc-theme-standard">
                     <div class="fc-header-toolbar fc-toolbar ">
                        <div class="fc-toolbar-chunk">
                           <div class="fc-button-group">
                            <button type="button" title="Sidebar" aria-pressed="false" class="fc-sidebarToggle-button fc-button d-lg-none d-inline-block ps-0" data-bs-toggle="sidebar" data-overlay="" data-target="#app-calendar-sidebar">
                              <i class="icon-base bx bx-menu icon-lg text-heading"></i>
                            </button>
                            <button type="button" aria-pressed="false" class="fc--button fc-button fc-button-primary"></button>
                          </div>
                           <div class="fc-button-group"><button type="button" title="Previous month" aria-pressed="false" class="fc-prev-button fc-button fc-button-primary">
                            <span class="fc-icon fc-icon-chevron-left" role="img"></span>
                          </button>
                          <button type="button" title="Next month" aria-pressed="false" class="fc-next-button fc-button fc-button-primary">
                            <span class="fc-icon fc-icon-chevron-right" role="img"></span>
                          </button>
                          <button type="button" aria-pressed="false" class="fc--button fc-button fc-button-primary"></button>
                        </div>
                        <h2 class="fc-toolbar-title"></h2>
                        </div>
                        <div class="fc-toolbar-chunk">
                          <div class="fc-button-group">
                            <button type="button" title="month view" aria-pressed="true" class="fc-dayGridMonth-button fc-button fc-button-primary fc-button-active">month</button>
                            <button type="button" title="week view" aria-pressed="false" class="fc-timeGridWeek-button fc-button fc-button-primary">week</button>
                            <button type="button" title="day view" aria-pressed="false" class="fc-timeGridDay-button fc-button fc-button-primary">day</button>
                            <button type="button" title="list view" aria-pressed="false" class="fc-listMonth-button fc-button fc-button-primary">list</button>
                          </div>
                        </div>
                     </div>
                     <div class="fc-view-harness fc-view-harness-active" style="height: 805.926px;">
                        <div class="fc-dayGridMonth-view fc-view fc-daygrid">
                           <table class="fc-scrollgrid  fc-scrollgrid-liquid">
                              <thead>
                                 <tr class="fc-scrollgrid-section fc-scrollgrid-section-header ">
                                    <th >
                                       <div class="fc-scroller-harness">
                                          <div class="fc-scroller" style="overflow: hidden;">
                                             <table  class="fc-col-header " style="width: 1088px;">
                                                <thead id="calendar-header">
                                                  <tr>
                                                    <th class="fc-col-header-cell fc-day">
                                                      <div class="fc-scrollgrid-sync-inner"><a class="fc-col-header-cell-cushion">Sun</a></div>
                                                   </th>
                                                   <th class="fc-col-header-cell fc-day">
                                                      <div class="fc-scrollgrid-sync-inner"><a class="fc-col-header-cell-cushion">Mon</a></div>
                                                   </th>
                                                   <th class="fc-col-header-cell fc-day">
                                                      <div class="fc-scrollgrid-sync-inner"><a class="fc-col-header-cell-cushion">Tue</a></div>
                                                   </th>
                                                   <th class="fc-col-header-cell fc-day">
                                                      <div class="fc-scrollgrid-sync-inner"><a class="fc-col-header-cell-cushion">Wed</a></div>
                                                   </th>
                                                   <th class="fc-col-header-cell fc-day">
                                                      <div class="fc-scrollgrid-sync-inner"><a class="fc-col-header-cell-cushion">Thu</a></div>
                                                   </th>
                                                   <th class="fc-col-header-cell fc-day">
                                                      <div class="fc-scrollgrid-sync-inner"><a class="fc-col-header-cell-cushion">Fri</a></div>
                                                   </th>
                                                   <th class="fc-col-header-cell fc-day">
                                                      <div class="fc-scrollgrid-sync-inner"><a class="fc-col-header-cell-cushion">Sat</a></div>
                                                   </th>
                                                </tr>
                                              </thead>
                                             </table>
                                          </div>
                                       </div>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody role="rowgroup">
                                 <tr class="fc-scrollgrid-section fc-scrollgrid-section-body fc-scrollgrid-section-liquid">
                                    <td >
                                       <div class="fc-scroller-harness fc-scroller-harness-liquid">
                                          <div class="fc-scroller fc-scroller-liquid-absolute" style="overflow: hidden auto;">
                                             <div class="fc-daygrid-body fc-daygrid-body-unbalanced " style="width: 1088px;">
                                                <table id="calendarTable">
                                                   <tbody id="calendar-body"></tbody>
                                                </table>
                                             </div>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="app-overlay"></div>
            <!-- FullCalendar Offcanvas -->
            @include('admin.calendars.modal.add')
         </div>
         <!-- /Calendar & Modal -->
      </div>
   </div>
</div>
@endsection
@section('script')
<script src="{{ asset('admin/assets/vendor/libs/fullcalendar/fullcalendar.js') }}?v={{ time() }} defer"></script>
<script src="{{ asset('admin/assets/vendor/libs/flatpickr/flatpickr.js') }}?v={{ time() }}"></script>
<script src="{{ asset('admin/assets/vendor/libs/pickr/pickr.js') }}?v={{ time() }}"></script>
<script src="{{ asset('admin/assets/js/app-calendar-events.js') }}?v={{ time() }}"></script>
<script src="{{asset('admin/assets/vendor/libs/select2/select2.js') }}?v={{ time() }}"></script>
<script src="{{asset('admin/ajax/calendar.js') }}?v={{ time() }}"></script>
@endsection