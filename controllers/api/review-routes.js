const router = require('express').Router();
const sequelize = require('../../config/connection');
const shortid = require('shortid');
const { Review, User, Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('==========');
    Review.findAll({
        attributes: [
            'id',
            'title',
            'text',
            'created_at',
            'user_id',
            'review_url'
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
            'title',
            'created_at',
            'user_id',
            'review_url'
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
        text: req.body.text,
        user_id: req.session.user_id,
        review_url: shortid.generate()
    })
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// finds the review that the user searches for
router.post('/:id', (req, res) => {
    Review.findOne({
        where: {
            title: req.body.game
        }
    }).then(dbReviewData => {
        if (!dbReviewData) {
            res.status(400).json({ message: "We don't have any reviews for that game yet!"});
            return;
        } else {
            res.json(dbReviewData)
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;