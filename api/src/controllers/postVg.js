const {Videogame, Platform, Genre} = require('../db');

const postVg = async (nombre, descripcion, plataformas, imagen, fecha, rating, genres) => {

    const newVideoGame = await Videogame.create({

        nombre, 
        descripcion,
        imagen, 
        fecha, 
        rating

    })

    if(Array.isArray(plataformas) && plataformas.length > 0){

      for(const element of plataformas){

        const createPlatform = await Platform.findOrCreate({

          where: {

            nombre: element

          }

        })

        await newVideoGame.addPlataformas(createPlatform[0])

      }

    }
    
    if(Array.isArray(genres) && genres.length > 0){

      for(const element of genres){

        const createGenre = await Genre.findOrCreate({

          where: {

            nombre: element

          }

        })

        await newVideoGame.addGenres(createGenre[0])

      }
    
    }

    return newVideoGame

}

module.exports = postVg;