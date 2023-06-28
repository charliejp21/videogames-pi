import axios from "axios";
import {GET_ALL_VIDEOGAMES, GET_VIDEOGAMES_BY_SEARCH, GET_VIDEOGAME_BY_ID, GET_ALL_GENRES, GET_ALL_PLATAFORMAS} from "./action-types"

export const getAllVideogames = () => async(dispatch) => {

    const apiDataDb = await axios.get("http://localhost:3001/videogames");

    const videogames = apiDataDb.data;

    dispatch({

        type: GET_ALL_VIDEOGAMES,
        payload: videogames
    })
    
}

export const VgBysearch = (nombre) => async(dispatch) => {

    const apiDataDb = await axios.get(`http://localhost:3001/videogames?name=${nombre}`);

    const videogames = apiDataDb.data;

    dispatch({

        type: GET_VIDEOGAMES_BY_SEARCH,
        payload: videogames
    })

}

export const getVgById = (id) => async(dispatch) => {

    const apiDataDb = await axios.get(`http://localhost:3001/videogames/id/${id}`)

    const videogame = apiDataDb.data;

    dispatch({

        type: GET_VIDEOGAME_BY_ID,
        payload: videogame
    })

}

export const getAllGenres = () => async(dispatch) => {

    const apiDataDb = await axios.get(`http://localhost:3001/genres`)

    const genres = apiDataDb.data;

    dispatch({

        type: GET_ALL_GENRES,
        payload: genres
    })

}

export const getAllPlataformas = () => async(dispatch) => {

    const apiDataDb = await axios.get(`http://localhost:3001/plataformas`)

    const plataformas = apiDataDb.data;

    dispatch({

        type: GET_ALL_PLATAFORMAS,
        payload: plataformas

    })

}

export const postVg = async(data) => {
    
    try {

        const sendData = await axios.post(`http://localhost:3001/videogames/create`, data)

        alert("Videojuego creado exitosamente")

        return sendData.data;
        
    } catch (error) {

        alert(`Se ha producido un error: ${error}`)

        throw new Error(error);
        
    }

}