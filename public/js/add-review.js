async function newReviewHandler(event) {
    event.preventDefault();

    const title = document.querySelector('').value;
    const review_url = document.querySelector('').value;

    const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
            title,
            review_url
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('dashboard')
    } else {
        alert(response.statusText)
    }
};

document.querySelector('').addEventListener('submit', newReviewHandler);