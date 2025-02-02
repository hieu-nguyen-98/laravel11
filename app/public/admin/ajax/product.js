$(document).ready(function() {
    loadData_product();

    $('#search, #status, #category').on('change keyup', function () {
        let search = $('#search').val();
        let status = $('#status').val();
        let category = $('#category').val();
        loadData_product(1, search, status, category);
    });
});

function loadData_product(page = 1, search = '', status = '', category = '') {
    $.ajax({
        url: "/ajax/products/get_list_data",
        method: "GET",
        data: {
            page: page,
            search: search,
            status: status,
            category: category
        },
        success: function(response) {
            let totalEntries = response.products.total;
            let start = (response.products.current_page - 1) * response.products.per_page + 1;
            let end = start + response.products.data.length - 1;
            $('#showing').html(`Showing ${start} to ${end} of ${totalEntries} entries`);


            let html = '';
            response.products.data.forEach(function(product) {
                let edit_url    = `/admin/products/edit/${product.id}`;                
                let status_url  = `/admin/products/change_status/${product.id}`;                
                html += `
                    <tr>
                        <td>
                            <input type="checkbox" class="form-check-input" data-id="${product.id}">
                        </td>
                        <td>
                            <img src="${product.image_url}" class="rounded-circle" width="60" height="60" alt=${product.name}>
                        </td>
                        <td>${product.name}</td>
                        <td>${product.category.name}</td>  
                        <td>${Number(product.price).toLocaleString('vi-VN')}</td>

                        <td> ${product.sku} </td>
                        <td> ${product.status == 1 ? '<span class="badge bg-label-success me-1">Active</span>' : '<span class="badge bg-label-danger me-1">Inactive</span>'} </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-icon delete-record">
                                    <i class="icon-base bx bx-trash icon-md"></i>
                                </button>
                                <a href="app-product-view-account.html" class="btn btn-icon">
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

            response.products.links.forEach(function(link) {
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
                
                loadData_product(page, search, status, category);
            });
            $('.delete-record').click(deleteProduct);

        }
    });
}

function deleteProduct(e) {
    e.preventDefault();
    let productId = $(this).closest("tr").find("input[type='checkbox']").data("id");
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
                url: `/ajax/products/delete/${productId}`,
                method: "DELETE",
                data: {
                    _token: $('meta[name="csrf-token"]').attr("content"),
                },
                success: function (response) {
                    Swal.fire("Đã xóa!", "Danh mục đã được xóa thành công.", "success");
                    loadData_product(); // Cập nhật lại danh sách sau khi xóa
                },
                error: function () {
                    Swal.fire("Lỗi!", "Xóa danh mục thất bại. Vui lòng thử lại.", "error");
                },
            });
        }
    });
}