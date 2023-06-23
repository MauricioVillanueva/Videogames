const { Router } = require('express');
const videogamesRouter = require('./videogames.js')
const genresRouter = require('./genres.js')
const platformsRouter = require("./platforms");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use('/videogames', videogamesRouter);
mainRouter.use('/genres', genresRouter);
mainRouter.use("/platforms", platformsRouter);



module.exports = mainRouter;
