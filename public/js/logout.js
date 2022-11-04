const logoutHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('./api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Failed to logout.',
            icon: 'error'
        });
    }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);