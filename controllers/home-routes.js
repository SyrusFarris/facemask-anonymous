const router = require('express').Router();
const sequelize = require('../config/connection');
// const {} = require('../models');

router.get('/', (req, res) => {
    Review.findAll({
        attributes: [],
        include: []
    })
    .then(dbReviewData => {
        const reviews = dbReviewData.map(review => review.get({ plain: true }))
        res.render('homepage', {
            reviews
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login')
});

router.get('/review/:id', (req, res) => {
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