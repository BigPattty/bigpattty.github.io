document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmpassword = document.getElementById('confirmpassword').value;
  const messageElement = document.getElementById('message');

  if (password !== confirmpassword) {
    messageElement.textContent = 'Passwords do not match';
    messageElement.className = 'error';
    return;
  }

  try {
    const response = await fetch('https://162.33.18.241:443/register', { // Use HTTPS and correct port
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullname, username, email, password })
    });

    if (response.ok) {
      messageElement.textContent = 'Registration successful';
      messageElement.className = 'success';
    } else {
      const error = await response.text();
      messageElement.textContent = 'Registration failed: ' + error;
      messageElement.className = 'error';
    }
  } catch (err) {
    messageElement.textContent = 'An error occurred: ' + err.message;
    messageElement.className = 'error';
  }
});
