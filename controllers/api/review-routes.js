const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Review, User, Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('==========');
    Review.findAll({
        attributes: [
            'id',
            'review_url',
            'title',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Game,
                attributes: ['id', 'title', 'genre', 'year', 'platform'],
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'review_url',
            'title',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbReviewData => {
        if (!dbReviewData) {
            res.status(404).json({ message: 'No review found with this id.'});
            return;
        }
        res.json(dbReviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// creates a review and sends it to the database
router.post('/', withAuth, (req, res) => {
    Review.create({
        title: req.body.title,
        review_url: req.body.review_url,
        text: req.body.text
    })
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;