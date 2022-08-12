const { query } = require('express');
const express = require('express');
const app = express();
const { games } = require('./data/games');

function filterByQuery(query, gamesArray) {
    let ratingArray = [];
    // We save ratings as filteredResults here:

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
            //so at the end we'll have an array of animals that have everyone
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

app.get('/api/games', (req, res) => {
    let results = games;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log('API server now on port 3001!');
});