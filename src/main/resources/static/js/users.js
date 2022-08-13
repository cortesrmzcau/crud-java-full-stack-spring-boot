// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUsers();
    $('#users').DataTable();
    updateEmail();
});

function updateEmail() {
    document.getElementById("txtEmailUser").outerHTML = localStorage.email;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}

async function loadUsers() {
    const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
    });

    const users = await request.json();

    let listUsersHTML = '';

    for(let user of users) {
        let botonDelete = '<a href="#" onclick="deleteUser(' + user.id_user +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

        let usersHTML = '<tr><td>'
            + user.id_user + '</td><td>'
            + user.name + '</td><td>'
            + user.phone_number + '</td><td>'
            + user.email + '</td><td>' + botonDelete + '</td></tr>';

        listUsersHTML += usersHTML;
    }

    document.querySelector('#users tbody').outerHTML = listUsersHTML;
}

async function deleteUser(id_user) {

    if(!confirm('¿Desea eliminar el usuario?')) {
        return;
    }

    const request = await fetch('api/users/' + id_user, {
        method: 'DELETE',
        headers: getHeaders()
    });

    location.reload();
}