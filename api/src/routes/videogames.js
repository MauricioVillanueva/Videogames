const { Router } = require('express');
const {
    videogamesHandler,
    videogamesHandlerById,
    createVideogamesHandler,
} = require('../handlers/videogamesHandler');

const videogamesRouter = Router();

videogamesRouter.get('/', videogamesHandler);
videogamesRouter.get('/:id', videogamesHandlerById);
videogamesRouter.post('/', createVideogamesHandler);

module.exports = videogamesRouter;