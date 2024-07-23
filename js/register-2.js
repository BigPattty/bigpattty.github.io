async function userreg(event) {
    event.preventDefault();

    const button = event.target.querySelector('button');
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const conpassword = document.getElementById('conpassword').value;
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

    try {
        const decryptedkey = decryptkey(encryptedkey, passphrase);

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

        setTimeout(async () => {
            if (response.ok) {
                button.classList.remove('loading');
                button.classList.add('success');

                setTimeout(() => {
                    window.location.href = 'reg-confirm-2.html';
                }, 1500);
            } else {
                const errordata = await response.json();
                console.error('Github API error:', errordata);
                alert('An error occurred. Please try again.');
                button.classList.remove('loading');
                button.classList.add('error');

                setTimeout(() => {
                    button.classList.remove('error');
                    button.querySelector('.text').style.opacity = '1';
                }, 3000);
            }
        }, 8000);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
        button.classList.remove('loading');
        button.classList.add('error');

        setTimeout(() => {
            button.classList.remove('error');
            button.querySelector('.text').style.opacity = '1';
        }, 3000);
    }
}
document.querySelector('form').addEventListener('submit', userlogin);
