const recentReviews = [];

const getReviews = () => {

    fetch('/api/reviews')
    .then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Oops! We messed up...")
        }
    })
    .then(data => {
        recentReviews.push(data)
    })
};

const showNewReviews = () => {
    for (let i = 0; i < 3; i++) {
        // generate html to show reviews
    }
}

const checkUser = user => {
    user.name = document.querySelector('#').value;
    user.password = document.querySelector('#').value;
    fetch('/api/users', user)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Username or password was incorrect, buddy.")
        }
    })
    .then(loggedIn(user))
};

const loggedIn = user => {
    // change navbar so instead of login, it says 'welcome [user]' + gives option to write new review
};

const newReview = review => {
    review.title = $('#newTitle').val();
    review.text = $('#text').val();
    
}

const loadUserReviews = (user, review) => {

};

document.addEventListener('#login', checkUser());