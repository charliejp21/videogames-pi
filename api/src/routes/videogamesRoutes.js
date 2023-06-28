const {Router} = require('express');
const {getVgHandler, getVgByIdHandler,createVgHandler, deleteVgByIdHandler} = require('../handlers/videogamesHandlers')

//GET, POST, PUT, DELETE

const videogamesRoutes = Router();

videogamesRoutes.get("/", getVgHandler)
videogamesRoutes.get("/id/:id", getVgByIdHandler)
videogamesRoutes.delete("/id/:id", deleteVgByIdHandler)
videogamesRoutes.post("/create", createVgHandler)



module.exports = videogamesRoutes;