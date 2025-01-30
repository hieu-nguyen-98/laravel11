<div class="offcanvas offcanvas-end event-sidebar" tabindex="-1" id="addEventSidebar" aria-labelledby="addEventSidebarLabel">
    <div class="offcanvas-header border-bottom">
       <h5 class="offcanvas-title" id="addEventSidebarLabel">Add Event</h5>
       <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
       <form class="event-form pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="eventForm" onsubmit="return false" novalidate="novalidate">
          <div class="mb-6 form-control-validation fv-plugins-icon-container">
             <label class="form-label">Title</label>
             <input type="text" class="form-control" name="eventTitle" placeholder="Event Title">
             <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
          </div>
          <div class="mb-6">
             <label class="form-label" for="eventLabel">Label</label>
             <div class="position-relative">
                <select class="select2 form-select" name="eventLabel">
                   <option value="Business">Business</option>
                   <option value="Personal">Personal</option>
                   <option value="Family">Family</option>
                   <option value="Holiday">Holiday</option>
                   <option value="ETC">ETC</option>
                </select>
             </div>
          </div>
          <div class="mb-6 form-control-validation fv-plugins-icon-container">
             <label class="form-label">Start Date</label>
             <div class="flatpickr-wrapper">
                <input type="text" class="form-control flatpickr-input" name="eventStartDate" placeholder="Start Date">
             </div>
          </div>
          <div class="mb-6 form-control-validation fv-plugins-icon-container">
             <label class="form-label" for="eventEndDate">End Date</label>
             <div class="flatpickr-wrapper">
                <input type="text" class="form-control flatpickr-input" name="eventEndDate" placeholder="End Date">
             </div>
          </div>
          <div class="mb-6">
             <div class="form-check form-switch">
                <input type="checkbox" class="form-check-input allDay-switch" id="allDaySwitch">
                <label class="form-check-label" for="allDaySwitch">All Day</label>
             </div>
          </div>
          <div class="mb-6">
             <label class="form-label" for="eventURL">Event URL</label>
             <input type="url" class="form-control" id="eventURL" name="eventURL" placeholder="https://www.google.com">
          </div>
          <div class="mb-4 select2-primary">
             <label class="form-label">Add Guests</label>
             <div class="position-relative">
                <select class="select2 form-select" name="eventGuests">
                   <option value="Jane Foster">Jane Foster</option>
                   <option value="Donna Frank">Donna Frank</option>
                   <option value="Gabrielle Robertson">Gabrielle Robertson</option>
                   <option value="Lori Spears">Lori Spears</option>
                   <option value="Sandy Vega">Sandy Vega</option>
                   <option value="Cheryl May">Cheryl May</option>
                </select>
             </div>
          </div>
          <div class="mb-6">
             <label class="form-label" for="eventLocation">Location</label>
             <input type="text" class="form-control" id="eventLocation" name="eventLocation" placeholder="Enter Location">
          </div>
          <div class="mb-6">
             <label class="form-label" for="eventDescription">Description</label>
             <textarea class="form-control" name="eventDescription" id="eventDescription"></textarea>
          </div>
          <div class="d-flex justify-content-sm-between justify-content-start mt-6 gap-2">
             <div class="d-flex">
                <button type="submit" id="addEventBtn" class="btn btn-primary btn-add-event me-4">Add</button>
                <button type="reset" class="btn btn-label-secondary btn-cancel me-sm-0 me-1" data-bs-dismiss="offcanvas">Cancel</button>
             </div>
             <button class="btn btn-label-danger btn-delete-event d-none">Delete</button>
          </div>
          <input type="hidden">
       </form>
    </div>
 </div>