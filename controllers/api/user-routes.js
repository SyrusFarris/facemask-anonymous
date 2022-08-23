const router = require('express').Router();
const { User, Review, Game } = require('../../models');
const withAuth = require('../../utils/auth');

// finds all users in the database
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// finds a particular user based on the id number
router.get('/:id', (req, res) => {
    User.findOne({
        include: [
            {
                model: Review,
                attributes: ['id', 'title', 'review_url', 'created_at']
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

//creates a user whenever the sign-up form is filled out and submitted
router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            return res.json(dbUserData)  
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// logs the user in, searches for the user based on the paramaters entered
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that username!'});
            return;
        }


        const validPassword = dbUserData.checkPassword(req.body.password);
        // makes sure the password matches
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        } else {
            //begins user session
            req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData });
            
        });            
        }


    });
});

// ends the session
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end;
    }
});

module.exports = router;
