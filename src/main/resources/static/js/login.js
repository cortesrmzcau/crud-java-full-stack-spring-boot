// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
});

async function loginUser() {

    let data = {};
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtPassword').value;

    console.log(data);

    const request = await fetch('api/auth', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const response = await request.text();

    if(response != "FAIL") {
        localStorage.token = response;
        localStorage.email = data.email;
        window.location.href = 'users.html';
    } else {
        alert('Fail login... ' + response);
    }
}