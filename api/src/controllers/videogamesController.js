const axios = require('axios');
const { Videogame, Genre } = require('../db');
require('dotenv').config();

const getGameDescription = async (id) => {
  const url = `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.description_raw;
};

const getAllVideogames = async () => {
    const numberPages = [1, 2, 3, 4, 5];
    const links = numberPages.map((page) => {
      return `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}`;
    });
    const apiVideogames = await Promise.all(
      links.map(async (link) => {
        const videogamesPage = await axios.get(link);
        const videogames = videogamesPage.data.results;
        const formatVideogames = await Promise.all(
          videogames.map(async (game) => {
            const description = await getGameDescription(game.id);
            return { 
              id: game.id,
              name: game.name,
              background_image: game.background_image,
              description: description,
              released: game.released,
              genres: game.genres.map((genre) => genre.name),
              platforms: game.platforms.map((element) => element.platform.name),
              rating: game.rating,
            };
          })
        );
        return formatVideogames;
      })
    );
    const clearListVideogamesApi = apiVideogames.reduce((a, b) => {
      return a.concat(b);
    });
  
    let databaseVideoGames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
      },
    });
    
    const clearListVideogamesDB = databaseVideoGames.map((dbVideogame) => {
      const dbGame = {
        id: dbVideogame.dataValues.id,
        name: dbVideogame.dataValues.name,
        background_image: dbVideogame.dataValues.background_image,
        description: dbVideogame.dataValues.description,
        released: dbVideogame.dataValues.released,
        genres: dbVideogame.dataValues.Genres.map(
          (genre) => genre.dataValues.name
        ),
        platforms: dbVideogame.dataValues.platforms,
        rating: dbVideogame.dataValues.rating,
        createdInDb: dbVideogame.dataValues.createdInDb,
      };
      return dbGame;
    });
    return clearListVideogamesApi.concat(clearListVideogamesDB);
  };

const getPlatforms = async () => {
  try {
    const videogames = await getAllVideogames();
    const platforms = videogames.map((game) => game.platforms);
    const platforms_1 = platforms.flat();
    const platforms_2 = new Set(platforms_1);
    return Array.from(platforms_2);
  } catch (error) {
    return new Error(error);
  }
};

module.exports = {
    getAllVideogames,
    getPlatforms,
};