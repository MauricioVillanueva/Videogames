const { getApiGenres } = require("../controllers/genresController")

const getGenresHandler = async (req,res) => {
    try {
        const genresApi = await getApiGenres();
        res.status(200).send(genresApi);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
}

module.exports = getGenresHandler;