const sequelize = require("../config/connection")
const seedGamesData = require("./gameData")


const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedGamesData();
    process.exit(0);
};
seedAll();
