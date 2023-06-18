const {Router} = require('express')
const {getGenresHandler} = require('../handlers/genresHandler')

const genresRoutes = Router();

genresRoutes.get("/", getGenresHandler);


module.exports = genresRoutes;