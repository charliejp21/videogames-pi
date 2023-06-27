const {Platform} = require('../db');
const {getAllVg} = require('./getAllVg')

const getPlatformsApi = async() => {

    const videogames = await getAllVg();

    const plataformasApi = videogames.map((vg) => vg.plataformas);

    const allPlatforms = [];

    plataformasApi.forEach((x) => allPlatforms.push(x));

    return [... new Set(allPlatforms)]

}

const getPlatformsDb = async() => {

    const allPlatforms = await Platform.findAll();

    const platformsAllArray = []
    
    allPlatforms.forEach((x) => platformsAllArray.push({id: x.id, nombre: x.nombre}))

    return platformsAllArray;

}

const postPlatforms = async() => {

    const findData = await Platform.findAll();

    if(findData.length){

        return; 
    }else{

        const platformsType = await getPlatformsApi();

        let allPlatformsTypes = platformsType.map((platform) => platform.map(element => Platform.findOrCreate({

            where: {nombre: element}
        })))

        Promise.all(allPlatformsTypes).then((element) => console.log(("Plataformas cargadas")))
    }


}

module.exports = {getPlatformsApi, getPlatformsDb, postPlatforms} 