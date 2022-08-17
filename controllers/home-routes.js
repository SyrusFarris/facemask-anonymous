const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Game } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log('========================');
    // finds most recent reviews from the database to showcase them on the front page
    Review.findAll({
        attributes: [
            'id',
            'review_url',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Game,
                attributes: ['title']
            }
        ]
    })
    .then(dbReviewData => {
        const reviews = dbReviewData.map(review => review.get({ plain: true }))
        res.render('new-reviews', {
            reviews
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }

    res.render('login');
});

router.get('/add', withAuth, (req, res) => {
    res.render('add-review');
});

router.get('/review/:id', (req, res) => {
    // finds a particular review when user clicks on it
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [],
        include: []
    })
    .then(dbReviewData => {
        if (!dbReviewData) {
            res.status(404).json({ message: "Sorry! We couldn't find a review with that id"})
            return;
        }

        const review = dbReviewData.get({ plain: true });

        res.render('single-review', {
            review
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;