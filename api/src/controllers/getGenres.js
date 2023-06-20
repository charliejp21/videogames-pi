const {Genre} = require("../db");
const {getAllVg} = require("./getAllVg")

const getGenresApi = async() => {

    const genres = await getAllVg();

    const genresApi = genres.map((vg) => vg.genres);

    const allGenres = [];

    genresApi.forEach((x) => allGenres.push(x));

    return [...new Set(allGenres)]

}

const getGenresDb = async() => {

    const allGenres = await Genre.findAll();

    const genresAllArray = [];

    allGenres.forEach((x) => genresAllArray.push({id: x.id, nombre: x.nombre}));

    return genresAllArray;

}

const postGenres = async() => {

    const findData = await Genre.findAll();

    if(findData.length){

        return;

    }else{

        const genresTypes = await getGenresApi();

        let allGenresTypes = genresTypes.map((genre) =>

            genre.map(element => Genre.findOrCreate({where: {nombre: element}}))
    
        );

        Promise.all(allGenresTypes).then((element) => console.log("Generos cargados"));

    }

}


module.exports = {getGenresApi, getGenresDb, postGenres};