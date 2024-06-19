document.addEventListener('DOMContentLoaded', function() {
    const username = sessionStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
    document.getElementById('username').textContent = username;
});

function logoutUser(event) {
    event.preventDefault();
    sessionStorage.clear();
    window.location.href = 'login.html'; // Redirect to login after logout
}
