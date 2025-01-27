$(document).ready(function() {
    loadData_permission();

    $('#search, #UserRole').on('change keyup', function () {
        let search = $('#search').val();
        loadData_permission(1, search);
    });

});

function loadData_permission(page = 1, search = '',) {
    $.ajax({
        url: "/ajax/permissions/get_list_data",
        method: "GET",
        data: {
            page: page,
            search: search,
        },
        success: function(response) {
            let totalEntries = response.permissions.total;
            let start = (response.permissions.current_page - 1) * response.permissions.per_page + 1;
            let end = start + response.permissions.data.length - 1;
            $('#showing').html(`Showing ${start} to ${end} of ${totalEntries} entries`);

            let html = '';
            response.permissions.data.forEach(function(permission) {
                html += `
                    <tr>
                        <td>${permission.name}</td>
                        <td>
                            ${permission.roles.map((role) => {
                                const roleColor = getRoleColor(role.name); 
                                return `
                                    <span class="text-nowrap">
                                        <a href="#">
                                            <span class="badge ${roleColor} me-2">
                                                ${role.name}
                                            </span>
                                        </a>
                                    </span>
                                `;
                            }).join("")}
                        </td>
                        <td>
                            ${formatDate(permission.created_at)}
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <a href="javascript:;" class="btn btn-icon delete-record">
                                <i class="icon-base bx bx-trash icon-md"></i>
                                </a>
                                <a href="app-user-view-account.html" class="btn btn-icon">
                                <i class="icon-base bx bx-show icon-md"></i>
                                </a>
                                <a href="javascript:;" class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                <i class="icon-base bx bx-dots-vertical-rounded icon-md"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end m-0">
                                <a href="javascript:;" class="dropdown-item">Edit</a>
                                <a href="javascript:;" class="dropdown-item">Suspend</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                `;
            });
            $('#data-table tbody').html(html);  

            let pagination = ``;

            response.permissions.links.forEach(function(link) {
                let activeClass = link.active ? 'active' : '';
                let paginationClass = '';
                if (link.label === "&laquo; Previous") {
                    paginationClass = 'previous';
                } else if (link.label === "Next &raquo;") {
                    paginationClass = 'next';
                }

                pagination += `
                    <li class="page-item ${activeClass}">
                        <button class="page-link ${paginationClass}" role="link" type="button" data-page="${link.label}">
                            ${link.label}
                        </button>
                    </li>
                `;
            });

            $('#pagination-links').html(pagination);

            $('.page-link').on('click', function(e) {
                e.preventDefault();
                let page = $(this).data('page');

                if ($(this).hasClass('previous')) {
                    page = response.current_page - 1; 
                } else if ($(this).hasClass('next')) {
                    page = response.current_page + 1; 
                }
                
                loadData_permission(page, search);
            });

        }
    });
}

function formatDate(date) {

    const dateObj = new Date(date);

    const formattedDate = 
        ('0' + dateObj.getDate()).slice(-2) + '/' + 
        ('0' + (dateObj.getMonth() + 1)).slice(-2) + '/' + 
        dateObj.getFullYear() + ' ' + 
        ('0' + dateObj.getHours()).slice(-2) + ':' + 
        ('0' + dateObj.getMinutes()).slice(-2) + ':' + 
        ('0' + dateObj.getSeconds()).slice(-2);

    return formattedDate
}
function getRoleColor(roleName) {
    switch (roleName) {
        case "SUPPER ADMIN":
            return "bg-label-danger"; 
        case "ADMIN":
            return "bg-label-warning"; 
        case "MANAGER":
            return "bg-label-success"; 
        default:
            return "bg-label-primary"; 
    }
}