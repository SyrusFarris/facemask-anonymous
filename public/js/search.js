async function searchGame(event) {
    event.preventDefault();

    const game = document.querySelector('#search').value;

    const response = await fetch('/api/games', {
        method: 'POST',
        body: JSON.stringify({ game }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('search-results')
    } else {
        alert(response.statusText)
    }
};

document.querySelector('#searchbtn').addEventListener('click', searchGame);