const { Router } = require("express");

const { getPlatformsHandler } = require("../handlers/videogamesHandler");

platformsRouter = Router();

platformsRouter.get("/", getPlatformsHandler);

module.exports = platformsRouter;