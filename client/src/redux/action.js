import axios from "axios";
import {GET_ALL_VIDEOGAMES} from "./action-types"

export const getAllVideogames = () => async(dispatch) => {

    const apiDataDb = await axios.get("http://localhost:3001/videogames");

    const videogames = apiDataDb.data;

    dispatch({

        type: GET_ALL_VIDEOGAMES,
        payload: videogames
    })
    
}