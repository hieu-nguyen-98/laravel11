$(document).ready(function() {
    loadData();
});

function loadData(page = 1, search = '') {
    $.ajax({
        url: "/ajax/categories/get_list_data",
        method: "GET",
        data: {
            page: page,
            search: search,
        },
        success: function(response) {
            console.table(response)
            let totalEntries = response.categories.total;
            let start = (response.categories.current_page - 1) * response.categories.per_page + 1;
            let end = start + response.categories.data.length - 1;
            $('#showing').html(`Showing ${start} to ${end} of ${totalEntries} entries`);


            let html = '';
            response.categories.data.forEach(function(category) {
                html += `
                    <tr>
                        <td>
                            <input type="checkbox" class="form-check-input" data-id="${category.id}">
                        </td>
                        <td>${category.image}</td>
                        <td>${category.name}</td>
                        <td>${category.full_name}</td>
                        <td>
                            ${category.status}
                        </td>
                        <td> ${category.description} </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <a href="javascript:;" class="btn btn-icon delete-record">
                                <i class="icon-base bx bx-trash icon-md"></i>
                                </a>
                                <a href="app-category-view-account.html" class="btn btn-icon">
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

            response.categories.links.forEach(function(link) {
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
                
                loadData(page, search);
            });

        }
    });
}