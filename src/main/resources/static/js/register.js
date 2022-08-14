// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
});

async function registerUser() {

    let data = {};
    data.name = document.getElementById('txtName').value;
    data.phone_number = document.getElementById('txtPhoneNumber').value;
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtPassword').value;

    let confirPassword = document.getElementById('txtConfirmPassword').value;

    if(confirPassword != data.password) {
        alert('La contraseña es diferente');
    }

    const response = await fetch('api/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    alert('Successful account');
    window.location.href = 'users.html';
}