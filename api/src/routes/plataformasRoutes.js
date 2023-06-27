const {Router} = require('express');
const {getPlatformsHandler} = require('../handlers/platformsHandler')

const platformsRoutes = Router();

platformsRoutes.get("/", getPlatformsHandler);

module.exports = platformsRoutes;