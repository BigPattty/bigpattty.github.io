async function loginuser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    try {
        const repsonse = await fetch('https://login-data-04911d02a754.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            messageElement.classList.add('success');
            messageElement.textContent = 'Login Successful. Sending you in...';
            messageElement.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'portal-2.html';
            }, 500);
        } else {
            const errorinfo = await response.json();
            messageElement.classList.add('error');
            messageElement.textContent = errorinfo.message || 'Invalid Username or Password. Please try again!';
            messageElement.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.classList.add('error');
        messageElement.textContent = 'Error Logging In';
        messageElement.classList.remove('hidden');
    }
}