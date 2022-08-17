const {Game} = require("../models");


const gameData = 
     [
        {
            title: "Game1",
            genre: "genreA",
            year: "2022",
            platform: "platform1",
        },
        {
            title: "Game2",
            genre: "genreB",
            year: "2022",
            platform: "platform2",
        },
        {
            title: "Game3",
            genre: "genreC",
            year: "2022",
            platform: "platform3",
        } 
    ];
    const seedGamesData = ()=> Game.bulkCreate(gameData);
  
  module.exports = seedGamesData;