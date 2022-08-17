const sequelize = require("../config/connection");
const seedGamesData = require("./gameData");
const seedReviewData = require('./reviewData');
const seedUsers = require('./userData');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('-------------')
    await seedGamesData();
    console.log('-------------')
    await seedReviewData();
    console.log('-------------')
    await seedUsers();
    process.exit(0);
};

seedAll();
