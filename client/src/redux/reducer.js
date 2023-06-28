import {GET_ALL_VIDEOGAMES, GET_VIDEOGAMES_BY_SEARCH, GET_VIDEOGAME_BY_ID, GET_ALL_GENRES, GET_ALL_PLATAFORMAS } from "./action-types";

const initialState = {

    videogames:{

        data: [],
        vgDetail: [],
        genres: [],
        plataformas: []

    },
    searchResults: {

        data: []

    },

}

const rootReducer = (state = initialState, action) =>{

    switch (action.type){

        case GET_ALL_VIDEOGAMES:

            return{

                ...state,

                videogames: {

                    ...state.videogames,
                    
                    data: action.payload,

                }

            }
        
        case GET_VIDEOGAMES_BY_SEARCH:   
        
            return {

                ...state,
            
                searchResults:{

                    ...state.searchResults,
                    data: action.payload

                }

            }

        case GET_VIDEOGAME_BY_ID: 

            return {

                ...state, 
                
                videogames:{

                    ...state.videogames,
                    vgDetail: action.payload

                }

            }

        case GET_ALL_GENRES:
            
            return{

                ...state,

                videogames: {

                    ...state.videogames,
                    genres: action.payload
                }


            }
        case GET_ALL_PLATAFORMAS:
            
            return{

                ...state, 

                videogames: {
                    
                    ...state.videogames, 
                    plataformas: action.payload
                    
                }
            }

        default: {

            return{

                ...state

            }
        }
    }
}

export default rootReducer;