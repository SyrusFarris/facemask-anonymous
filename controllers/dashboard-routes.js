const router = require('express').Router();
const { User, Review, Game } = require('../models');
const sequelize = require('../config/connection');


router.get('/', (req, res) => {
    // finds all reviews for the user
    Review.findAll({
        where: {
            user_id: req.session.username
        },
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
        const reviews = dbReviewData.map(review => review.get({ plain: true }));
        res.render('dashboard', { reviews, loggedIn: true })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;