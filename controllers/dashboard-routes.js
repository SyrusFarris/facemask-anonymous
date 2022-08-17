const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    // finds all reviews for the user
    Review.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [],
        include: []
    })
    .then(dbReviewData => {
        const reviews = dbReviewData.map(review => review.get({ plain: true }));
        res.render('dashboard', { reviews, loggedIn: true })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;