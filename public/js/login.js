async function login(event) {
    event.preventDefault();

    const user = document.querySelector('#old-username').value.trim();
    const password = document.querySelector('#old-password').value.trim();

    if (user && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                user,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard/')
            loggedIn: true;
        } else {
            alert(response.statusText)
        }
    }
};

async function signUp(event) {
    event.preventDefault();

    const email = document.querySelector('#new-email').value.trim();
    const user = document.querySelector('#new-username').value.trim();
    const password = document.querySelector('#new-password').value.trim();

    if (email && user && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                user,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            console.log('Success');
            loggedIn: true;
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#return-login').addEventListener('submit', login);
document.querySelector('#new-login').addEventListener('submit', signUp);