const {Videogame} = require('../db')
const deleteVg = async(id) => {

    if(id){

        return await Videogame.destroy({

            where: {

                id: id

            }
            
        })

    }

}

module.exports = deleteVg;  