const {getPlatformsDb} = require('../controllers/getPlataformas');

const getPlatformsHandler = async(_req, res) => {

    try {

        const findDataDb = await getPlatformsDb()

        res.status(200).json(findDataDb);
        
    } catch (error) {

        res.status(404).json({error: error.message})
        
    }

}

module.exports = {getPlatformsHandler}