const {
    getAllVideogames,
    getPlatforms,
} = require('../controllers/videogamesController');
const { Videogame, Genre } = require('../db');

const videogamesHandler = async (req, res) => {
    try {
      let { name } = req.query;
      let games = [];
      if (name) {
        games = await getAllVideogames().then((data) =>
          data.filter((game) =>
            game.name.toLowerCase().includes(name.toLowerCase())
          )
        );
        if (games.length === 0) {
          return res.status(400).send("Videogame not found");
        } else {
          return res.status(200).json(games);
        }
      } else {
        games = await getAllVideogames();
        return res.status(200).json(games);
      }
    } catch (error) {
      res.status(400);
    }
  };

const videogamesHandlerById = async (req, res) => {
      let  id  = req.params.id; 
      const videogamesTotal = await getAllVideogames();
      if(id){
        let videogameId = await videogamesTotal.filter((el)=> el.id == id)
        videogameId.length?
         res.status(200).json(videogameId) :
         res.status(400).json('Videogame not found');
      }    
  };

const createVideogamesHandler = async (req,res) => {
    try {
        const {
            name,
            description,
            platforms,
            background_image,
            released,
            rating,
            createdInDb,
            genres,
          } = req.body;
        let videogame = await Videogame.create({
          name,
          description,
          platforms,
          background_image,
          released,
          rating,
          createdInDb});
        let genreDB = await Genre.findAll({ where: { name: genres } });
        await videogame.addGenres(genreDB);
        return res.status(200).send('Videogame created successfully.');
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getPlatformsHandler = async (req, res) => {
  try {
    let platforms = await getPlatforms();
    return res.status(200).send(platforms);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { 
    videogamesHandler,
    videogamesHandlerById,
    createVideogamesHandler,
    getPlatformsHandler
};