const {getGenresDb} = require('../controllers/getGenres'); 

const getGenresHandler = async(_req, res) => {

    try {

        const findDataDb = await getGenresDb()

        res.status(200).json(findDataDb);
        
    } catch (error) {

        res.status(404).json({error: error.message})
        
    }

}

module.exports = {getGenresHandler};