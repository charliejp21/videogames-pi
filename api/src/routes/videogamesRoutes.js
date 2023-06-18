const {Router} = require('express');
const {getVgHandler, getVgByIdHandler,createVgHandler} = require('../handlers/videogamesHandlers')

//GET, POST, PUT, DELETE

const videogamesRoutes = Router();

videogamesRoutes.get("/", getVgHandler)
videogamesRoutes.get("/id/:id", getVgByIdHandler)
videogamesRoutes.post("/create", createVgHandler)


module.exports = videogamesRoutes;