const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/api/tasklists');
    } else {
      console.log('attempting sweetalert');
      Swal.fire({
        title: 'Error!',
        text: response.statusText,
        icon: 'error'
      });
    }
  }
};

const createUserHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch(`/api/users/`, {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Tasklist creation failed.')
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#signup-form').addEventListener('click', createUserHandler);