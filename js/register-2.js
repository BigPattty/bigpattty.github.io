const encryptedkey = "U2FsdGVkX1+Zhr/6B7z/zA4ZUqYZ5Hdj5SmCOhheVQlA+3BNg9iW8KVcp6Vr84YjK8RUCLZh0BWTV1UyWK1WuQ==";
const passphrase = 'Patty1703!';

function decryptkey(token, passphrase) {
    const bytes = CryptoJS.AES.decrypt(token, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8);
}

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
    // resultDiv.classList.add('hidden'); // Hide previous result messages

    if (password !== conpassword) {
        alert('Looks like your passwords are different!');
        button.classList.remove('loading');
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

        // button.classList.remove('loading');
        if (response.ok) {
            // button.classList.add('success');
            setTimeout(() => {
                button.classList.remove('loading');
                button.classList.add('success');

                setTimeout(() => {
                    window.location.href = 'reg-confirm-2.html';
                }, 9000)
            }, 8000);
        } else {
            const errordata = await response.json();
            console.error('Github API error:', errordata);
            button.classList.remove('loading');
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
    }, 8000);
}
