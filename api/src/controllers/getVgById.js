require('dotenv').config();
const {KEY} = process.env;
const {Videogame, Genre, Platform} = require('../db')
const axios = require('axios')
const getVgById = async(id, source) => {

    if(source === "api"){

            const dataApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`)

            const videogame = dataApi.data;

            if(videogame){

                const vgApi = {

                    id: videogame.id,
                    nombre: videogame.name,
                    descripcion: videogame.description_raw ? videogame.description_raw : "" ,
                    plataformas: videogame.platforms ? videogame.platforms.map((y) => y.platform.name) : [],
                    imagen: videogame.background_image,
                    fecha: videogame.released,
                    rating: videogame.rating,
                    genres: videogame.genres ? videogame.genres.map((y) => y.name) : [],
                    stores: videogame.stores ? videogame.stores.map((y) => {
                        return{
                            id: y.store.id,
                            store: y.store.name,
                            link: y.store.domain
                        }
                    }) : [],
                    website: videogame.website ? videogame.website : "",
                    esrb_rating: videogame.esrb_rating ? videogame.esrb_rating : "",
                    developers: videogame.developers ? videogame.developers.map((y) => y.name) : []

                }

                return vgApi;
    
            }else{
    
                throw new Error("No se encontró un videojuego con el id indicado")
                
            }

    }else{

        const dataDb = await Videogame.findByPk(id, {

            include:[

                {
                    model: Genre,
                    attributes: ["nombre"],
                    as: "genres"
                },{
                    model: Platform, 
                    attributes: ["nombre"],
                    as: "plataformas"
                }
            ]
        })

        if(dataDb){

            let videogame = {

                id: dataDb.id,
                nombre: dataDb.nombre,
                descripcion: dataDb.descripcion ? dataDb.descripcion : "" ,
                plataformas: dataDb.plataformas.map((y) => y.nombre),
                imagen: dataDb.imagen,
                fecha: dataDb.fecha,
                rating: dataDb.rating,
                genres: dataDb.genres.map((y) => y.nombre)

            }

            return videogame;

        }else{

            throw new Error("No se encontró un videojuego con el id indicado")

        }

    }

}

module.exports = getVgById;