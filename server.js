// const fs = require('fs');
// const path = require('path');
// const { query } = require('express');
// const express = require('express');
// const PORT = process.env.PORT || 3001;
// const app = express();
// const routes = require('./controllers');
// const exphbs = require('express-handlebars');
// const helpers = require('./utils/helpers');
// const hbs = exphbs.create({ helpers });
// const session = require('express-session');
// const sequelize = require('sequelize')

// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

<<<<<<< HEAD
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
=======
    let filteredResults = gamesArray;
    if (query.rating) {
        //Save ratingArray as a dedicated array.
        //If ratingArray is a string, place it into a new array and save.
        if (typeof query.rating === 'string') {
            ratingArray = [query.rating];
        }else {
            ratingArray = query.rating;
        }
        // Loop through each trait in the rating array:
        ratingArray.forEach(givenRate => {
            //Check the rating against each game in the filteredResults array.
            //Remember, it is initially a copy of the gamesArray,
            //For each rating being targeted by the filter, the filteredResults
            //array will then contain only entries  that contain the trait,
            //so at the end we'll have an array of games that have everyone
            //of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                games => games.rating.indexOf(givenRate) !== -1
            );
        });
    }
    if (query.name) {
        filteredResults = filteredResults.filter(games => games.name === query.name);
    }
    if (query.genre) {
        filteredResults = filteredResults.filter(games => games.genre === query.genre);
    }
    if (query.year) {
        filteredResults = filteredResults.filter(games => games.year === query.year);
    }
    if (query.platform) {
        filteredResults = filteredResults.filter(games => games.platform === query.platform);
    }
    // return the filtered results:
    return filteredResults;
}

function findById(id, gamesArray) {
    const result = gamesArray.filter(games => games.id === id)[0];
    return result;
  }

function createNewGame(body, gamesArray) {
    const game = body;
    gamesArray.push(game);
    fs.writeFileSync(
        path.join(__dirname, './data/games.json'),
        JSON.stringify({ games: gamesArray }, null, 2)
    );

    return game;
}

function validateGame(game) {
    if (!game.name || typeof game.name !== 'string') {
      return false;
    }
    if (!game.genre || typeof game.genre !== 'string') {
      return false;
    }
    if (!game.year || typeof game.year !== 'string') {
      return false;
    }
    if (!game.platform || typeof game.platform !== 'string') {
        return false;
      }
    if (!game.rating || !Array.isArray(game.rating)) {
      return false;
    }
    return true;
  }

app.get('/api/games', (req, res) => {
    let results = games;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
>>>>>>> 66ecedb8fa4ce055ab00dd09e710000bfbcb8fa5
});

// // parse incoming string or array data
// app.use(express.urlencoded({ extended: true }));
// // parse incoming JSON data
// app.use(express.json());
// const { games } = require('./data/games');

// function filterByQuery(query, gamesArray) {
//     let ratingArray = [];
//     // We save ratings as filteredResults here:

//     let filteredResults = gamesArray;
//     if (query.rating) {
//         //Save ratingArray as a dedicated array.
//         //If ratingArray is a string, place it into a new array and save.
//         if (typeof query.rating === 'string') {
//             ratingArray = [query.rating];
//         }else {
//             ratingArray = query.rating;
//         }
//         // Loop through each trait in the rating array:
//         ratingArray.forEach(givenRate => {
//             //Check the rating against each game in the filteredResults array.
//             //Remember, it is initially a copy of the gamesArray,
//             //For each rating being targeted by the filter, the filteredResults
//             //array will then contain only entries  that contain the trait,
//             //so at the end we'll have an array of animals that have everyone
//             //of the traits when the .forEach() loop is finished.
//             filteredResults = filteredResults.filter(
//                 games => games.rating.indexOf(givenRate) !== -1
//             );
//         });
//     }
//     if (query.name) {
//         filteredResults = filteredResults.filter(games => games.name === query.name);
//     }
//     if (query.genre) {
//         filteredResults = filteredResults.filter(games => games.genre === query.genre);
//     }
//     if (query.year) {
//         filteredResults = filteredResults.filter(games => games.year === query.year);
//     }
//     if (query.platform) {
//         filteredResults = filteredResults.filter(games => games.platform === query.platform);
//     }
//     // return the filtered results:
//     return filteredResults;
// }

// function findById(id, gamesArray) {
//     const result = gamesArray.filter(games => games.id === id)[0];
//     return result;
//   }

// function createNewGame(body, gamesArray) {
//     const game = body;
//     gamesArray.push(game);
//     fs.writeFileSync(
//         path.join(__dirname, './data/games.json'),
//         JSON.stringify({ games: gamesArray }, null, 2)
//     );

//     return game;
// }

// function validateGame(game) {
//     if (!game.name || typeof game.name !== 'string') {
//       return false;
//     }
//     if (!game.genre || typeof game.genre !== 'string') {
//       return false;
//     }
//     if (!game.year || typeof game.year !== 'string') {
//       return false;
//     }
//     if (!game.platform || typeof game.platform !== 'string') {
//         return false;
//       }
//     if (!game.rating || !Array.isArray(game.rating)) {
//       return false;
//     }
//     return true;
//   }

// app.get('/api/games', (req, res) => {
//     let results = games;
//     if (req.query) {
//         results = filterByQuery(req.query, results);
//     }
//     res.json(results);
// });

// app.get('/api/games/:id', (req, res) => {
//     const result = findById(req.params.id, games);
//     if (result) {
//         res.json(result);
//     } else {
//         res.send(404);
//     }
// });

// app.post('/api/games', (req,res) => {
//     // set id based on what the next index of the array will be
//     req.body.id = games.length.toString();

//     // if any data in req.body is incorrect, send 400 error back
//     if (!validateGame(req.body)) {
//         res.status(400).send('The game is not properly formatted.');
//     } else {
//         const game = createNewGame(req.body, games);
//         res.json(game);
//     }
// });

// app.listen(PORT, () => {
//     console.log('API server now on port ${PORT}!');
// });