require('dotenv').config();
const{KEY} = process.env;
const axios = require('axios');
const{Videogame, Genre, Platform} = require('../db')
const { Op } = require('sequelize');

const getAllVg = async() => {

    const allVideoGamesDb = await Videogame.findAll({

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

    });

    let dataDb = allVideoGamesDb.map((videogame) => {

        return{

                id: videogame.id,
                nombre: videogame.nombre,
                descripcion: videogame.descripcion ? videogame.descripcion : "" ,
                plataformas: videogame.plataformas.map((y) => y.nombre),
                imagen: videogame.imagen,
                fecha: videogame.fecha,
                rating: videogame.rating,
                genres: videogame.genres.map((y) => y.nombre),
                created: videogame.created

        }
    })


    try {

        let i = 1; 

        let videogamesApi = []; //Me traigo toda la info de las páginas y se guardan en el array

        while(i < 5){

            const apiData = await axios.get(`https://api.rawg.io/api/games?page=${i}&page_size=5&key=${KEY}`);

            videogamesApi.push(apiData) // se pushean promesas no el resultado de las promesas y todas estaran péndientes, por eso despues se tiene que usar Promise.all para resolvar cada una

            i++

        }

        videogamesApi = (await Promise.all(videogamesApi)).map(respuesta => respuesta.data.results.map((videogame) => {

            return{

                id: videogame.id,
                nombre: videogame.name,
                descripcion: videogame.description ? videogame.description : "" ,
                plataformas: videogame.platforms ? videogame.platforms.map((y) => y.platform.name): [],
                imagen: videogame.background_image,
                fecha: videogame.released,
                rating: videogame.rating,
                genres: videogame.genres ? videogame.genres.map((y) => y.name): []
    
            }
        
        })) //Recordar que se rotorna un array con un array de objetos

        let allVg = [];

        videogamesApi.map(videogame => {allVg = allVg.concat(videogame)})

        return [...dataDb, ...allVg];

    } catch (error) {

        return {error: error.message}
        
    }

}

const getVgByNameDB = async(name) => {

    if(name){

        const findDb = await Videogame.findAll({

            where: {

                nombre: {

                    [Op.iLike]: `%${name}%`

                }

            }, 
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

        const dataDb = findDb.map((videogame) => {

            return{
    
                    id: videogame.id,
                    nombre: videogame.nombre,
                    descripcion: videogame.descripcion ? videogame.descripcion : "" ,
                    plataformas: videogame.plataformas.map((y) => y.nombre),
                    imagen: videogame.imagen,
                    fecha: videogame.fecha,
                    rating: videogame.rating,
                    genres: videogame.genres.map((y) => y.nombre)
    
            }
        })
        const findApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`)

        const infoApi = findApi.data;

        const infoApiMap = infoApi.results.map((videogame) => {

            return{

                id: videogame.id,
                nombre: videogame.name,
                descripcion: videogame.description ? videogame.description : "" ,
                plataformas: videogame.platforms ? videogame.platforms.map((y) => y.platform.name) : [],
                imagen: videogame.background_image,
                fecha: videogame.released,
                rating: videogame.rating,
                genres: videogame.genres ? videogame.genres.map((y) => y.name) : []
    
            }

        })

        if(!dataDb.length && !infoApiMap.length){

            throw new Error("No hay resultados para tu búsqueda")
        }

        const data = [...dataDb, ...infoApiMap]

        return data;
    }
}

module.exports = {getAllVg, getVgByNameDB};