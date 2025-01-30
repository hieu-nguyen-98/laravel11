let event_data = [];
let currentDate = new Date();
let currentView = 'month';
let selectedYear = new Date().getFullYear();
let selectedMonth = new Date().getMonth() + 1;
let selectedDate = currentDate.getDate();

$(document).ready(function() {

    $.ajax({
        url: '/ajax/calendars/get_list_data', 
        method: 'GET',
        success: function(data) {
            event_data = data;
            if (currentView === 'list') {
                renderList(selectedYear, selectedMonth);  
            }else if(currentView === 'day') {
                renderDay(selectedYear, selectedMonth, selectedDate);
            }
        },
        error: function(error) {
            console.error('Error fetching events:', error);
        }
    });

    flatpickr("#calendar", {
        inline: true,
        onReady: function(selectedDates, dateStr, instance) {
            const currentYear = new Date().getFullYear();
            instance.setDate(new Date(currentYear, 0, 1)); 
            $('.cur-year').val(currentYear);
            updateTitle(currentYear, 0);
        },
        onChange: function(selectedDates, dateStr, instance) {
            currentDate = new Date(selectedDates[0]);
            selectedYear = currentDate.getFullYear();
            selectedMonth = currentDate.getMonth();
            selectedDate = currentDate.getDate();
            $('.cur-year').val(selectedYear);
            updateTitle(selectedYear, selectedMonth);
            renderCalendar(selectedMonth, selectedYear);
        }
    });

    $('#arrowUp').on('click', function() {
        changeYear(1);
    });

    $('#arrowDown').on('click', function() {
        changeYear(-1);
    });
    
    $('.fc-button-group button').on('click', function() {
        $('.fc-button-group button').removeClass('fc-button-active').attr('aria-pressed', 'false');
        $(this).addClass('fc-button-active').attr('aria-pressed', 'true');
        
        currentView = $(this).attr('title').split(' ')[0];
        renderCalendar(selectedMonth, selectedYear);
    });

    // Event Filters
    if ($('.select-all').is(':checked')) {
        $('.input-filter').prop('checked', true).trigger('change');
    }

    $('.select-all').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('.input-filter').prop('checked', isChecked).trigger('change');
    });

    $('.input-filter').on('change', function () {
        const allChecked = $('.input-filter').length === $('.input-filter:checked').length;
        $('.select-all').prop('checked', allChecked);
    });

    // Full Calendar
    renderCalendar(selectedMonth, selectedYear);
});

function renderCalendar(selectedMonth, selectedYear) {
    $('#calendar-body').empty(); 
    updateHeaderTitle();
    if (currentView === 'month') {
        renderMonth();
    } else if (currentView === 'week') {
        renderWeek();
    } else if (currentView === 'day') {
        renderDay(selectedYear, selectedMonth, selectedDate);
    } else if (currentView === 'list') {
        renderList(selectedYear, selectedMonth);
    }
    updateButtonState();
}
function renderMonth() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();

    let html = '';
    let dayCount = 1;

    for (let i = 0; i < 6; i++) { 
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startingDay) {
                html += '<td></td>'; 
            } else if (dayCount > daysInMonth) {
                html += '<td></td>';
            } else {
                html += `
                    <td class="fc-day">
                        <div>${dayCount}</div>
                    </td>
                `;
                dayCount++;
            }
        }
        html += '</tr>';
    }

    $('#calendar-body').append(html);
}

function renderWeek() {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); 

    let html = '<tr>';
    html += '<td class="fc-week">All Day</td>';

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        html += `<td class="fc-day">
            <div>
                <div class="fc-daygrid-day-events">
                    <div class="fc-daygrid-event-harness">
                        <a class="fc-event fc-event-draggable fc-daygrid-event fc-daygrid-block-event fc-h-event bg-label-primary">
                            <div class="fc-event-main">
                                <div class="fc-event-main-frame">
                                    <div class="fc-event-title-container">
                                        <div class="fc-event-title fc-sticky">Monthly Meeting</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="fc-daygrid-day-bg"></div>
            </div>
        </td>`;
    }
    html += '</tr">';

    for (let hour = 1; hour <= 24; hour++) {
        html += '<tr>'; 
        html += `<td class="text-center">${hour}:00</td>`;

        for (let i = 0; i < 7; i++) {
            html += '<td class="fc-time-slot"></td>'; 
        }
        html += '</tr>'; 
    }

    $('#calendar-body').append(html);
}

function renderDay(selectedYear, selectedMonth, selectedDate) {
    const eventsInDay = event_data.calendars.filter(event => {
        const eventDate = new Date(event.start_time);
        return eventDate.getFullYear() === selectedYear &&
               eventDate.getMonth() === selectedMonth &&
               eventDate.getDate() === selectedDate;
    });
    const $label_map = { 0: 'Business', 1: 'Holidays', 2: 'Events', 3: 'Personal' };
    const $color_map = { 
        0: '#f1c40f', // Business (Vàng)
        1: '#2ecc71', // Holidays (Xanh lá)
        2: '#3498db', // Events (Xanh dương)
        3: '#e74c3c'  // Personal (Đỏ)
    };
    let html = `
        <tr>
            <td class="fc-week">All Day</td>
            <td class="fc-day all-day-slot"></td>
        </tr>`;

    for (let hour = 0; hour < 24; hour++) {
        html += `
        <tr class="fc-time-row">
            <td class="text-center">${hour}:00</td>
            <td class="fc-time-slot" style="position: relative;"></td>
        </tr>`;
    }

    $('#calendar-body').html(html);

    const allDayEvents = eventsInDay.filter(event => Number(event.status) === 1);
    allDayEvents.forEach(event => {
        const eventColor = $color_map[event.label_id] || '#95a5a6'; 
        $('.all-day-slot').append(`
            <div>
                <div class="fc-daygrid-day-events">
                    <div class="fc-daygrid-event-harness">
                        <a class="fc-event fc-event-draggable fc-daygrid-event fc-daygrid-block-event fc-h-event" style="background: ${eventColor} !important; width: 100%; padding: 5px; border-radius: 5px; color: #fff; margin-bottom: 5px;">
                            <div class="fc-event-main">
                                <div class="fc-event-main-frame">
                                    <div class="fc-event-title-container">
                                        <div class="fc-event-title fc-sticky">
                                            ${event.title} (${formatTime(event.start_time)} - ${formatTime(event.end_time)})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="fc-daygrid-day-bg"></div>
            </div>
        `);
    });

    const timedEvents = eventsInDay.filter(event => Number(event.status) !== 1);
    timedEvents.forEach(event => {
        console.log(event)
        const startDate = new Date(event.start_time);
        const endDate = new Date(event.end_time);

        const startHour = startDate.getHours();
        const startMinutes = startDate.getMinutes();
        const endHour = endDate.getHours();
        const endMinutes = endDate.getMinutes();

        const durationMinutes = (endHour * 60 + endMinutes) - (startHour * 60 + startMinutes);
        
        const startTopPosition = (startMinutes / 60) * 100; 
        const eventHeight = (durationMinutes / 60) * 100;

        const eventColor = $color_map[event.label_id] || '#95a5a6'; 

        const $targetCell = $(`.fc-time-row:eq(${startHour + 1}) .fc-time-slot`);
        $targetCell.append(`
            <div class="fc-event-block" 
                 style="position: absolute; top: ${startTopPosition}%; height: ${eventHeight}%; background-color: ${eventColor}; width: 100%; border-radius: 5px; padding: 5px; color: #fff;">
                ${event.title} (${formatTime(event.start_time)} - ${formatTime(event.end_time)})
            </div>
        `);
    });
}

function renderList(selectedYear,selectedMonth) {
    const eventsInMonth = event_data.calendars.filter(event => {
        const eventDate = new Date(event.start_time); 
        return eventDate.getFullYear() === selectedYear && eventDate.getMonth() === selectedMonth; 
    });
    let groupedEvents = {};
    eventsInMonth.forEach(event => {
        const eventDate = new Date(event.start_time);
        const dateKey = eventDate.toISOString().split('T')[0];

        if (!groupedEvents[dateKey]) {
            groupedEvents[dateKey] = [];
        }
        groupedEvents[dateKey].push(event);  
    });
    const sortedDates = Object.keys(groupedEvents).sort((a, b) => new Date(a) - new Date(b));

    let html = '';
    const $label_map = {0: 'Business', 1: 'Holidays', 2: 'Events', 3: 'Personal'};   
    sortedDates.forEach(date => {
        html += `<tr data-date="${date}" class="fc-list-day">
                    <th colspan="3">
                        <div class="fc-list-day-cushion fc-cell-shaded">
                            <a class="fc-list-day-text" title="Go to ${date}" data-navlink="" tabindex="0">${date}</a>
                        </div>
                    </th>
                </tr>`;

        groupedEvents[date].forEach(event => {
            html += `
                <tr class="fc-event fc-event-start fc-event-end fc-event-past fc-list-event">
                    <td class="fc-list-event-time">
                        <span class="text-list"> ${event.status === 1 ? 'All day' : formatTime(event.start_time) + ' - ' + formatTime(event.end_time) } </span>
                    </td>
                    <td aria-hidden="true" class="fc-list-event-graphic" width="5%">
                        <span>${$label_map[event.label_id]}</span>
                    </td>
                    <td class="fc-list-event-title">
                        <a tabindex="0">
                            <span class="text-list">${event.title}</span>
                        </a>
                    </td>
                </tr>
            `;
        });
    });
    $('#calendar-body').html(html);
}

function updateHeaderTitle() {
    if (currentView === 'week') {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); 
       
        $('#calendar-header tr').empty();
        $('#calendar-header tr').prepend('<th class="fc-col-header-cell fc-day"></th>');

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            $('#calendar-header tr').append(`
                <th class="fc-col-header-cell fc-day">
                    <div class="fc-scrollgrid-sync-inner">
                        <a class="fc-col-header-cell-cushion">
                            ${day.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}
                        </a>
                    </div>
                </th>
            `);
        }
    } else if (currentView === 'month') {
        resetTableSize(); 
        $('#calendarTable').css({
            'width': '1088px',
            'height': '765px'
        });
        $('#calendar-header th').each(function(index) {
            // const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            // $(this).text(days[index]);
        });
    } else if(currentView === 'day') {
        const day = currentDate.getDate(); 
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear(); 
        const currentDay = new Date(year, month, day);
        $('#calendar-header tr').empty()
        $('#calendar-header tr').append(`
            <th class="fc-col-header-cell fc-day">
                <div class="fc-scrollgrid-sync-inner">
                    <a class="fc-col-header-cell-cushion">
                        ${currentDay.toLocaleString('default', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </a>
                </div>
            </th>
        `);
    }else if(currentView === 'list') {
        resetTableSize();
        $('#calendar-header tr').empty()
    }
}

function updateButtonState() {
    $('.fc-button-group button').removeClass('fc-button-active');
    $(`.fc-button-group button[title="${currentView} view"]`).addClass('fc-button-active');
}

function changeYear(delta) {
    const yearInput = $('.cur-year');
    let currentYear = parseInt(yearInput.val());
    currentYear += delta;
    yearInput.val(currentYear);

    calendar.setDate(new Date(currentYear, 0, 1)); 
}

function updateTitle(year, month) {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const title = `${monthNames[month]} ${year}`;
    $('.fc-toolbar-title').text(title);
}

function resetTableSize() {
    $('#calendarTable').css({
        'width': '', 
        'height': '' 
    });
}
function formatTime(startTime) {
    const date = new Date(startTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}