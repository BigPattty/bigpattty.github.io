document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageElement = document.getElementById('message');

  try {
    const response = await fetch('https://162.33.18.241:27045/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      messageElement.textContent = 'Login successful';
      messageElement.className = 'success';
    } else {
      const error = await response.text();
      messageElement.textContent = 'Login failed: ' + error;
      messageElement.className = 'error';
    }
  } catch (err) {
    messageElement.textContent = 'An error occurred: ' + err.message;
    messageElement.className = 'error';
  }
});
