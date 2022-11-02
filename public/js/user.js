const createUserHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

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

document.querySelector('#user-add').addEventListener('click', createUserHandler);