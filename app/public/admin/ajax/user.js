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

            if ($('#UserRole option').length === 1) {
                let roleOptions = response.roles.map(role => `<option value="${role.name}">${role.name}</option>`);
                $('#UserRole').append(roleOptions.join(''));
            }

            let html = '';
            response.users.data.forEach(function(user) {
                html += `
                    <tr>
                        <td><input type="checkbox" class="form-check-input" data-id="${user.id}"></td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.roles[0].name}</td>
                        <td>
                            <a href="/user/edit/${user.id}" class="btn btn-primary btn-sm">Edit</a>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">Delete</button>
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