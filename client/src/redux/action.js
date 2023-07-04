import axios from "axios";
import {GET_ALL_VIDEOGAMES, GET_VIDEOGAMES_BY_SEARCH, GET_VIDEOGAME_BY_ID, GET_ALL_GENRES, GET_ALL_PLATAFORMAS, GET_PAGE, SORT, FILTER_VG_CREATED, FILTER_VG_GENRE} from "./action-types"

export const getAllVideogames = () => async(dispatch) => {

    const apiDataDb = await axios.get("/videogames");

    const videogames = apiDataDb.data;

    dispatch({

        type: GET_ALL_VIDEOGAMES,
        payload: videogames
    })
    
}

export const VgBysearch = (nombre) => async(dispatch) => {

    const apiDataDb = await axios.get(`/videogames?name=${nombre}`);

    const videogames = apiDataDb.data;

    dispatch({

        type: GET_VIDEOGAMES_BY_SEARCH,
        payload: videogames
    })

}

export const getVgById = (id) => async(dispatch) => {

    const apiDataDb = await axios.get(`/videogames/id/${id}`)

    const videogame = apiDataDb.data;

    dispatch({

        type: GET_VIDEOGAME_BY_ID,
        payload: videogame
    })

}

export const getAllGenres = () => async(dispatch) => {

    const apiDataDb = await axios.get(`/genres`)

    const genres = apiDataDb.data;

    dispatch({

        type: GET_ALL_GENRES,
        payload: genres
    })

}

export const getAllPlataformas = () => async(dispatch) => {

    const apiDataDb = await axios.get(`/plataformas`)

    const plataformas = apiDataDb.data;

    dispatch({

        type: GET_ALL_PLATAFORMAS,
        payload: plataformas

    })

}

export const postVg = async(data) => {
    
    try {

        const sendData = await axios.post(`/videogames/create`, data)

        alert("Videojuego creado exitosamente")

        return sendData.data;
        
    } catch (error) {

        alert(`Se ha producido un error: ${error}`)

        throw new Error(error);
        
    }

}

export const deleteVg = async(id) => {

    try {

        const deleteVideoGame = await axios.delete(`/videogames/id/${id}`)

        alert("Videojuego borrado exitosamente");

        window.location.reload()

        return deleteVideoGame.data;
        
    } catch (error) {

        alert(`Se ha producido un error: ${error}`)

        throw new Error(error)
        
    }

}

export const getPage = (page) => async(dispatch) =>{ 

    dispatch({

        type: GET_PAGE,
        payload: page
    })

}

export const sort = (order) => async(dispatch) => {

    dispatch({

        type: SORT,
        payload: order,

    })
}

export const filterGenre = (genre) => async(dispatch) => {

    dispatch({

        type: FILTER_VG_GENRE,
        payload: genre

    })
    
}

export const filterCreated = (created) => async(dispatch) => {

    dispatch({

        type: FILTER_VG_CREATED,
        payload: created
    })
}