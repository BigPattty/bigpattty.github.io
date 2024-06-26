document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');

    if (!username) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }

    // Set username in the header
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
        usernameElement.textContent = username;
    } else {
        console.error('Username element not found.');
    }
});

function logoutUser(event) {
    event.preventDefault();
    
    // Clear session storage
    sessionStorage.clear();
    
    // Redirect to login after logout
    window.location.href = 'login.html';
}
