const axios = require("axios");
const { Genre } = require("../db");
require('dotenv').config();

const getApiGenres = async () => {
  const genresApiResponse = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
  const genres = genresApiResponse.data.results;
  genres.forEach(element => {
    Genre.findOrCreate({
        where: { name: element.name },
      });
  });
  const allGenres = await Genre.findAll();
  return allGenres;
};

module.exports = { getApiGenres };