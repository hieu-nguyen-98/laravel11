$(document).ready(function() {
    loadData_role();

});

function loadData_role() {
    $.ajax({
        url: "/ajax/roles/get_list_data",
        method: "GET",
        data: {},
        success: function(response) {
            let html = ''; 
            response.roles.forEach(function(role) {
                html += `
                    <tr>
                        <td class="text-nowrap fw-bold text-heading">${role.name}</td>
                        <td>
                            <div class="d-flex justify-content-end">
                `;
                response.permissions.forEach(function(permission) {
                    const isChecked = role.permissions.some(p => p.id === permission.id) ? 'checked' : '';
                    html += `
                        <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" ${isChecked}>
                            <label class="form-check-label">${permission.name}</label>
                        </div>
                    `;
                });
                html += `
                            </div>
                        </td>
                    </tr>
                `;
            });
            $('#roles-table tbody').html(html);

        }
    });
}