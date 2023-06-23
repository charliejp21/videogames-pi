import { GET_ALL_VIDEOGAMES } from "./action-types";

const initialState = {

    videogames:{

        data: []

    }

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


        default: {

            return{

                ...state,
            }
        }
    }
}

export default rootReducer;