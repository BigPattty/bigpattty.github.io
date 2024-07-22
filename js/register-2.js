async function userlogin(event) {
    event.preventDefault();

    const button = event.target.querySelector('button');
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const conpassword = document.getElementById('conpassword').value;

    // Start loading animation
    button.classList.add('loading');
    button.querySelector('.text').style.opacity = '0';

    if (password !== conpassword) {
        alert('Looks like your passwords are different!');
        button.classList.remove('loading');
        button.querySelector('.text').style.opacity = '1';
        return;
    }

    const userdata = {
        name: name,
        username: username,
        email: email,
        password: password
    };

    const decryptedkey = decryptkey(encryptedkey, passphrase);

    try {
        const response = await fetch(`https://api.github.com/repos/bigpattty/user_data/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${decryptedkey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: `Registration Request: ${username}`,
                body: JSON.stringify(userdata)
            })
        });

        if (response.ok) {
            // Set a timeout to allow the loading animation to complete
            setTimeout(() => {
                button.classList.remove('loading');
                button.classList.add('success');

                // Set another timeout to allow the success animation to complete
                setTimeout(() => {
                    window.location.href = 'reg-confirm-2.html';
                }, 2000); // Adjust this time based on the duration of your success animation
            }, 3000); // Adjust this time based on the duration of your loading animation
        } else {
            const errordata = await response.json();
            console.error('Github API error:', errordata);
            button.classList.remove('loading');
            button.classList.add('error');

            // Reset the button after showing the error
            setTimeout(() => {
                button.classList.remove('error');
                button.querySelector('.text').style.opacity = '1';
            }, 3000); // Adjust this time based on the duration of your error animation
        }
    } catch (error) {
        console.error('Error:', error);
        button.classList.remove('loading');
        button.classList.add('error');

        // Reset the button after showing the error
        setTimeout(() => {
            button.classList.remove('error');
            button.querySelector('.text').style.opacity = '1';
        }, 3000); // Adjust this time based on the duration of your error animation
    }
}
