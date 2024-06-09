document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form fields values
        const fullname = document.getElementById('fullname').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        // Simple client-side validation
        if (!fullname || !username || !email || !password || !confirmPassword) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return;
        }

        // Create user object
        const user = {
            fullname: fullname,
            username: username,
            email: email,
            password: password
        };

        // Send user data to server for registration
        fetch('https://162.33.18.241:27045/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            // Disable SSL/TLS certificate validation
            agent: new https.Agent({ rejectUnauthorized: false })
        })
        .then(response => {
            if (response.ok) {
                showMessage('Registration successful. Please login.', 'success');
                registerForm.reset(); // Clear the form fields
            } else {
                showMessage('Registration failed. Please try again.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again later.', 'error');
        });
    });

    function showMessage(message, messageType) {
        messageDiv.textContent = message;
        messageDiv.className = messageType;
        messageDiv.classList.remove('hidden');
    }
});
