async function userlogin(event) {
    event.preventDefault();

    const button = event.target.querySelector('button');
    const resultDiv = document.getElementById('result');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Start loading animation
    button.classList.add('loading');
    button.querySelector('.text').style.opacity = '0';
    resultDiv.classList.add('hidden'); // Hide previous result messages

    try {
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
            // resultDiv.classList.add('success');
            // resultDiv.textContent = "We're in! Redirecting...";
            // resultDiv.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'portal.html';
            }, 500);
        } else {
            const errordata = await response.json();
            button.classList.add('error');
            resultDiv.classList.add('error');
            resultDiv.textContent = errordata.message || "Oh no! Check your details and try again!";
            resultDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        button.classList.remove('loading');
        button.classList.add('error');
        resultDiv.classList.add('error');
        resultDiv.textContent = "Whoops, looks like it's not working! Try again later!";
        resultDiv.classList.remove('hidden');
    }

    // Remove success or error state after a delay
    setTimeout(() => {
        button.classList.remove('success', 'error');
        button.querySelector('.text').style.opacity = '1';
    }, 3000);
}
