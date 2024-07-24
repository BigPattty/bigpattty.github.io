async function userlogin(event) {
    event.preventDefault();

    // Saves the username and password as local variables
    const button = event.target.querySelector('button');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    button.classList.add('loading'); // Starts my loading animation when the button is clicked
    button.querySelector('.text').style.opacity = '0';

    try { // Connects to my server to verify the data entered is correct/registered
        const response = await fetch('https://login-data-04911d02a754.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        button.classList.remove('loading');
        if (response.ok) {
            sessionStorage.setItem('username', username);
            button.classList.add('success');
            setTimeout(() => {
                window.location.href = 'portal.html';
            }, 1000);
        } else {
            const errordata = await response.json();
            button.classList.add('error');
        }
    } catch (error) {
        console.error('Error:', error);
        button.classList.remove('loading');
        button.classList.add('error');
    }

    setTimeout(() => {
        button.classList.remove('success', 'error');
        button.querySelector('.text').style.opacity = '1';
    }, 3000);
}
