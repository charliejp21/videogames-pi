import {GET_ALL_VIDEOGAMES, GET_VIDEOGAMES_BY_SEARCH, GET_VIDEOGAME_BY_ID, GET_ALL_GENRES, GET_ALL_PLATAFORMAS, SORT, FILTER_VG_CREATED, GET_PAGE, FILTER_VG_GENRE } from "./action-types";

const initialState = {

    videogames:{

        data: [],
        vgDetail: [],
        genres: [],
        plataformas: [],
        filterData: [],
        filterGenre: "default", 
        filterCreated: "default", 
        activeSort: "default",
        pagination: {
            max:  [], 
            currentPage: 1,
            pageLength: 15
        } 

    },
    searchResults: {

        data: []

    },

}

function paginador(videogames, pageLength){

    const max = Math.ceil(videogames.length / pageLength)

    const paginas = [];

    for(let i = 1; i <= max; i++){

        paginas.push(i);

    }

    return paginas;

}

function configSorts(array, payload, arrayOriginal) {

    let ordenamiento; 

    switch(payload){

        case "a-z":

            ordenamiento = array.sort((x,y) => x.nombre.localeCompare(y.nombre));

            break;

        case "z-a":

            ordenamiento = array.sort((x,y) => y.nombre.localeCompare(x.nombre));

            break;

        case "menor-mayor":

            ordenamiento = array.sort((x, y) => x.rating - y.rating)

            break;

        case "mayor-menor":

            ordenamiento = array.sort((x, y) => y.rating - x.rating)

            break;

        default:

            ordenamiento = arrayOriginal;

    }

    return ordenamiento;

}

function allFilters(array, created, genre, state, sort){

    let finalRes = sort !== "default" ? array : state.videogames.data;

    const videogamesFilter = finalRes.filter((videogame) => {

        const filterbyGenre =  genre !== "default" ? videogame.genres.includes(genre) : true;

        const filterCreated = created !== "default" ? videogame.created : true;

        return filterbyGenre && filterCreated;

    })

    const respuesta = configSorts(videogamesFilter, sort ? sort : state.videogames.activeSort, videogamesFilter)

    return respuesta;

}

const rootReducer = (state = initialState, action) =>{

    switch (action.type){

        case GET_ALL_VIDEOGAMES:

        const defaultFilters = allFilters(

            action.payload,
            state.videogames.filterCreated,
            state.videogames.filterGenre,
            state
            
        )

        const paginasDefault = paginador(defaultFilters, state.videogames.pagination.pageLength)

            return{

                ...state,

                videogames: {

                    ...state.videogames,
                    
                    data: action.payload,

                    filterData: defaultFilters,

                    pagination: {

                        ...state.videogames.pagination,
                        
                        max: paginasDefault,

                        currentPage: 1

                    }

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

        case GET_PAGE:

            return {

                ...state, 

                videogames: {

                    ...state.videogames,

                    pagination: {

                        ...state.videogames.pagination,

                        currentPage: action.payload
                    }

                } 
            }

        case SORT:
            
            const filterSort = allFilters(

                state.videogames.filterData,

                state.videogames.filterCreated,

                state.videogames.filterGenre,
                
                state, 

                action.payload

            )

            const pagesSort = paginador(filterSort, state.videogames.pagination.pageLength)

            return{

                ...state,

                videogames: {

                    ...state.videogames, 

                    filterData: [...filterSort],

                    activeSort: action.payload,

                    pagination: {

                        ...state.videogames.pagination,

                        max: pagesSort,

                        currentPage: 1

                    }

                }
                
            }

        case FILTER_VG_CREATED: 

            const filterCreated = allFilters(

                state.videogames.data, 

                action.payload, 

                state.videogames.filterGenre, 
                
                state

            )

            const pagesCreated = paginador(filterCreated, state.videogames.pagination.pageLength)
        
            return{
                
                ...state, 

                videogames: {

                    ...state.videogames,

                    filterData: filterCreated,
                
                    filterCreated: action.payload,

                    pagination: {

                        ...state.videogames.pagination,
                        
                        max: pagesCreated,

                        currentPage: 1
                    }

                }

            }

        case FILTER_VG_GENRE: 
        
            const filterGenre = allFilters(

                state.videogames.data,

                state.videogames.filterCreated,

                action.payload,

                state

            )

            const pagesGenre = paginador(filterGenre, state.videogames.pagination.pageLength)

            return{

                ...state, 

                videogames: {

                    ...state.videogames,
                    
                    filterData: filterGenre, 

                    filterGenre: action.payload,

                    pagination: {

                        ...state.videogames.pagination,

                        max: pagesGenre,

                        currentPage: 1

                    }

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