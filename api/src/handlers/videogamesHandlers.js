const {getAllVg, getVgByNameDB} = require('../controllers/getAllVg')
const postVg = require('../controllers/postVg')
const getVgById = require('../controllers/getVgById')

const getVgHandler = async (req, res) => {

    const {name} = req.query;

    if(name){

        try {

            const getVgByName = await getVgByNameDB(name)

            return res.status(200).json(getVgByName)
            
        } catch (error) {

            return res.status(400).json({error: error.message})
            
        }
    }

    try {

        const allVideoGames = await getAllVg();

        res.status(200).json(allVideoGames);

    } catch (error) {
        
        res.status(400).json({error: error.message})
   
    }

}

const getVgByIdHandler = async(req, res) => {

    const {id} = req.params;

    const source = isNaN(id) ? "bdd" : "api";

    try {

        const findById = await getVgById(id, source)    
        
        res.status(200).json(findById);

    } catch (error) {
     
        res.status(404).json({error: error.message})
        
    }

}

const createVgHandler = async(req, res) => {

    const {
        nombre, 
        descripcion, 
        plataformas,
        imagen, 
        fecha, 
        rating, 
        genres } = req.body;

    try {

        const newVg = await postVg(
            nombre, 
            descripcion, 
            plataformas,
            imagen, 
            fecha, 
            rating,
            genres  ); 
        
        res.status(200).json(newVg)

        
    } catch (error) {

        res.status(400).json({error: error.message})
        
    }

}


module.exports = {getVgHandler, getVgByIdHandler, createVgHandler};