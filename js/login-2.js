async function userlogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const result = document.getElementById('result');

    try {
        const response = await fetch('https://login-data-04911d02a754.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            sessionStorage.setItem('username', username)
            result.classList.add('success');
            result.textContent = "We're in! Redirecting...";
            result.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'portal.html';
            }, 500);
        } else {
            const errordata = await response.json();
            result.classList.add('error');
            result.textContent = errordata.message || "Oh no! Check your details and try again!";
            result.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        result.classList.add('error');
        result.textContent = "Whoops, looks like it's not working! Try again later!";
        result.classList.remove('hidden');
    }
}