async function login(event) {
    event.preventDefault();

    const user = document.querySelector('').value.trim();
    const password = document.querySelector('').value.trim();

    if (user && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                user,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            // cool stuff goes here
        } else {
            alert(response.statusText)
        }
    }
};

async function signUp(event) {
    event.preventDefault();

    const email = document.querySelector('').value.trim();
    const user = document.querySelector('').value.trim();
    const password = document.querySelector('').value.trim();

    if (email && user && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                email,
                user,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            console.log('Success')
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('').addEventListener('submit', login);
document.querySelector('').addEventListener('submit', signUp);