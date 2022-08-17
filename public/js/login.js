async function login(event) {
    event.preventDefault();

    const username = document.querySelector('#old-user').value.trim();
    const password = document.querySelector('#old-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard/')
        } else {
            alert(response.statusText)
        }
    }
    console.log(':(')
};

async function signUp(event) {
    event.preventDefault();

    const email = document.querySelector('#new-email').value.trim();
    const username = document.querySelector('#new-user').value.trim();
    const password = document.querySelector('#new-password').value.trim();

    if (email && username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                email,
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            console.log('Success');
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('#return-login').addEventListener('submit', login);
document.querySelector('#new-login').addEventListener('submit', signUp);