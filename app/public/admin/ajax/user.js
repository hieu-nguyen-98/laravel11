$(document).ready(function() {
    loadData();

    $('#search, #UserRole').on('change keyup', function () {
        let search = $('#search').val();
        let role = $('#UserRole').val();
        loadData(1, search, role);
    });

});

function loadData(page = 1, search = '', role = '') {
    $.ajax({
        url: "/ajax/users",
        method: "GET",
        data: {
            page: page,
            search: search,
            role: role
        },
        success: function(response) {

            let totalEntries = response.users.total;
            let start = (response.users.current_page - 1) * response.users.per_page + 1;
            let end = start + response.users.data.length - 1;
            $('#showing').html(`Showing ${start} to ${end} of ${totalEntries} entries`);

            if ($('#UserRole option').length === 1) {
                let roleOptions = response.roles.map(role => `<option value="${role.name}">${role.name}</option>`);
                $('#UserRole').append(roleOptions.join(''));
            }

            let html = '';
            response.users.data.forEach(function(user) {
                let roleIcon = '';
                let roleName = user.roles[0].name;

                switch(roleName) {
                    case 'SUPPER ADMIN':
                        roleIcon = '<i class="icon-base bx bx-crown text-primary me-2"></i>';
                        break;
                    case 'ADMIN':
                        roleIcon = '<i class="icon-base bx bx-desktop text-danger me-2"></i>';
                        break;
                    case 'USER':
                        roleIcon = '<i class="icon-base bx bx-user text-success me-2"></i>';
                        break;
                    case 'MANAGER':
                        roleIcon = '<i class="icon-base bx bx-edit text-warning me-2"></i>';
                        break;
                    default:
                        roleIcon = '';
                        break;
                }

                html += `
                    <tr>
                        <td><input type="checkbox" class="form-check-input" data-id="${user.id}"></td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            ${roleIcon} ${roleName}
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

            response.users.links.forEach(function(link) {
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
                
                loadData(page, search, role);
            });

        }
    });
}