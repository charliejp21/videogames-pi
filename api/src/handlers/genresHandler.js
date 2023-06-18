const {getGenresDb} = require; 

const getGenresHandler = async(_req, res) => {

    try {

        res.send(await getGenresDb());
        
    } catch (error) {

        res.status(404).json({error: error.message})
        
    }

}

module.exports = {getGenresHandler};