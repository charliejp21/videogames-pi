require('dotenv').config();
const {KEY} = process.env;
const {Videogame, Genre} = require('../db')
const axios = require('axios')
const getVgById = async(id, source) => {

    if(source === "api"){

            const dataApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`)

            const videogame = dataApi.data;

            if(videogame){

                const vgApi = {

                    id: videogame.id,
                    nombre: videogame.name,
                    descripcion: videogame.description ? videogame.description : "" ,
                    plataformas: videogame.platforms.map((y) => y.platform.name),
                    imagen: videogame.background_image,
                    fecha: videogame.released,
                    rating: videogame.rating,
                    genres: videogame.genres.map((y) => y.name),
                    stores: videogame.stores.map((y) => {
                        return{
                            id: y.store.id,
                            store: y.store.name,
                            link: y.store.domain
                        }
                    })

                }

                return vgApi;
    
            }else{
    
                throw new Error("No se encontró un videojuego con el id indicado")
                
            }

    }else{

        const dataDb = await Videogame.findByPk(id, {

            include: {

                model: Genre,
                attributes: ["genre"]
            }
        })

        if(dataDb){

            return dataDb;

        }else{

            throw new Error("No se encontró un videojuego con el id indicado")

        }

    }

}

module.exports = getVgById;