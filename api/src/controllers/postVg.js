const {Videogame} = require('../db');

const postVg = async (nombre, descripcion, plataformas, imagen, fecha, rating, genres) => {

    const newVideoGame = await Videogame.create({

        nombre, 
        descripcion, 
        plataformas,
        imagen, 
        fecha, 
        rating

    })
    
    if(Array.isArray(genres) && genres.length > 0){

        await Videogame.addGenres(genres)

    }

    return newVideoGame

}

module.exports = postVg;