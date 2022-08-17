const { Review } = require('../models');

const reviewData = [
    {
        title: "This game",
        text: "it's fun",

    },
    {
        title: "That game",
        text: "not fun!"
    },
    {
        title: "this other game right here",
        text: "never played it"
    },
    {
        title: "i don't even remember",
        text: "???????"
    }
];

const seedReviewData = () => Review.bulkCreate(reviewData);

module.exports = seedReviewData;