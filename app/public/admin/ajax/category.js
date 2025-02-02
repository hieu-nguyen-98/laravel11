$(document).ready(function() {
    loadData();

    $('#search').on('change keyup', function () {
        let search = $('#search').val();
        loadData(1, search);
    });
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
            let totalEntries = response.categories.total;
            let start = (response.categories.current_page - 1) * response.categories.per_page + 1;
            let end = start + response.categories.data.length - 1;
            $('#showing').html(`Showing ${start} to ${end} of ${totalEntries} entries`);


            let html = '';
            response.categories.data.forEach(function(category) {
                let imageSrc = category.image 
                    ? category.image 
                    : "/admin/assets/img/No_image_available.svg.png";
                let edit_url    = `/admin/categories/edit/${category.id}`;                
                let status_url  = `/admin/categories/change_status/${category.id}`;                
                html += `
                    <tr>
                        <td>
                            <input type="checkbox" class="form-check-input" data-id="${category.id}">
                        </td>
                        <td>
                            <img src="${imageSrc}" class="rounded-circle" width="60" height="60" alt=${category.name}>
                        </td>
                        <td>${category.name}</td>
                        <td>${category.full_name}</td>  
                        <td>
                            ${category.status == 1 ? '<span class="badge bg-label-success me-1">Active</span>' : '<span class="badge bg-label-danger me-1">Inactive</span>'}
                        </td>
                        <td> ${category.products.length} </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-icon delete-record">
                                    <i class="icon-base bx bx-trash icon-md"></i>
                                </button>
                                <a href="app-category-view-account.html" class="btn btn-icon">
                                <i class="icon-base bx bx-show icon-md"></i>
                                </a>
                                <a href="javascript:;" class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="icon-base bx bx-dots-vertical-rounded icon-md"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end m-0">
                                    <a href="${edit_url}" class="dropdown-item">Edit</a>
                                    <a href="${status_url}" class="dropdown-item">Change Status</a>
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
            $('.delete-record').click(deleteCategory);

        }
    });
}

function deleteCategory(e) {
    e.preventDefault();
    let categoryId = $(this).closest("tr").find("input[type='checkbox']").data("id");
    Swal.fire({
        title: "Bạn có chắc chắn?",
        text: "Hành động này sẽ xóa danh mục và không thể khôi phục!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Có, xóa ngay!",
        cancelButtonText: "Hủy",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/ajax/categories/delete/${categoryId}`,
                method: "DELETE",
                data: {
                    _token: $('meta[name="csrf-token"]').attr("content"),
                },
                success: function (response) {
                    Swal.fire("Đã xóa!", "Danh mục đã được xóa thành công.", "success");
                    loadData(); // Cập nhật lại danh sách sau khi xóa
                },
                error: function () {
                    Swal.fire("Lỗi!", "Xóa danh mục thất bại. Vui lòng thử lại.", "error");
                },
            });
        }
    });
}