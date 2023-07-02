import Videogame from '../../components/Videogame/Videogame'
import style from './Videogames.module.css'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import wait from '../../images/loading-12.gif'
import {getAllVideogames, getAllGenres,filterGenre, filterCreated, sort, getPage} from "../../redux/action"

const VideogamesContainer = () => {

    const dispatch = useDispatch();

    const [pageView, setPageView] = useState([]);

    const currentFilCreated = useSelector(state => state.videogames.filterCreated)

    const currentFilGenre = useSelector(state => state.videogames.filterGenre)

    const currentSort = useSelector(state => state.videogames.activeSort)

    const videogames = useSelector(state => state.videogames.data)

    const genres = useSelector(state => state.videogames.genres)

    const pagination = useSelector(state => state.videogames.pagination)

    const filterData = useSelector(state => state.videogames.filterData)

    useEffect(() => {

        dispatch(getAllVideogames())

        dispatch(getAllGenres())

    }, [dispatch]);

    useEffect(() => {

        let min; 

        let max;

        if(pagination.max.length === 1){

            setPageView(filterData)

        }else{

            max = pagination.currentPage * pagination.pageLength;

            min = max - pagination.pageLength;

            setPageView(filterData.slice(min, max))

        }

    }, [filterData]) //useEffect solo se aplica cunado filterData Cambie y si solo esta vacío [] solo se ejecuta una vez el efecto

    useEffect(() => {

        let min; 

        let max; 

        if(pagination.max.length === 1){

            setPageView(filterData); 

        }else{

            max = pagination.currentPage * pagination.pageLength;

            min = max - pagination.pageLength;

            setPageView(filterData.slice(min, max))

        }

    }, [pagination.currentPage])

    function handlerFilterCreated(created) {

        dispatch(filterCreated(created))

    }

    function handlerFilterGenre(genre){

        dispatch(filterGenre(genre))

    }

    function handlerFilterOrder(orderSelected){

        dispatch(sort(orderSelected))

    }

    function changeHandlerPage(page){

        dispatch(getPage(page))
    }

    return(<>
    
        <div className={style.divContainer}>

            <div className={style.sideContainer}>

                <h1 className={style.bienvenido}>Bienvenido</h1> 

                <div className={style.headerContainer}>

                    <div className={style.selectsContainer}>

                        <div>
                            
                            <p>Ordenar por:</p>

                            <div className={style.sortContainer}>

                                <select name="" id=""  onChange={(event) => {handlerFilterOrder(event.target.value)}} >

                                    <option value="default" selected={currentSort === "default"}>

                                        Default

                                    </option>

                                    <option value="a-z" selected={currentSort === "a-z"} >

                                        A-z

                                    </option>

                                    <option value="z-a" selected={currentSort === "z-a"}>

                                        Z-a

                                    </option>

                                    <option value="menor-mayor" selected={currentSort === "menor-mayor"}>
                                        
                                        Rating de menor a mayor

                                    </option>

                                    <option value="mayor-menor" selected={currentSort === "mayor-menor"}>

                                        Rating de mayor a menor

                                    </option>

                                </select>

                            </div>

                        </div>

                        <div>
                        
                            <p>Filtrar por creados:</p>

                            <div className={style.selectContainer}>
                                
                                <select name="" id="" onChange={(event) => {handlerFilterCreated(event.target.value)}}>

                                    <option value="default" selected={currentFilCreated === "default"}>
                                        
                                        Default
                                    
                                    </option>

                                    <option value="created" selected={currentFilCreated === "created"}>
                                        
                                        Creados
                                    
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div>
                        
                            <p>Filtrar por categorías:</p>

                            <div className={style.selectContainer}>
                                
                                <select name="" id="" onChange={(event) => {handlerFilterGenre(event.target.value)}}>

                                    <option value="default" selected={currentFilGenre === "default"}>
                                        
                                        Default
                                    
                                    </option>

                                   {genres.map((genre) => (

                                        <option selected={currentFilGenre === genre.nombre} value={genre.nombre} key={genre.id}>{genre.nombre}</option>
                                  
                                  ))}

                                </select>

                            </div>

                        </div>

                    </div>
                    {filterData.length ? (<>

                        <h4 className={style.resultsH4}>{filterData.length} videojuego{filterData.length === 1 ? "" : "s"} para mostar</h4>
                        <div className={style.pageBtnContainer}>

                            <button className={style.btnArrow} onClick={() => {changeHandlerPage(pagination.currentPage -1 === 0 ? 1 : pagination.currentPage - 1)}}>&lt;</button><span
                             className={style.btnP}> {pagination.currentPage} </span><button className={style.btnArrow} onClick={() => {changeHandlerPage(pagination.currentPage === pagination.max.length ? pagination.max.length : pagination.currentPage + 1)}}> &gt; </button>
                             <p className={style.resultsP2}>{pagination.max.length} página{pagination.max.length === 1 ? "" : "s"}</p> 
    
                        </div>
                        <p className={style.resultsP3}>Se muestran máximo 15 resultados por página</p>

                    </>) : (<h4 className={style.resultsH4}>Buscando...</h4>)}

                </div>
                
            </div>

            <div className={style.vGContainer}>

                <div className={style.vGCards}>
                        
                        {pageView.length ? 
                        
                            (pageView.map((videogame) => (
                                
                                <Videogame

                                    key={videogame.id}
                                    id={videogame.id}
                                    nombre={videogame.nombre}
                                    descripcion={videogame.descripcion}
                                    plataformas={videogame.plataformas}
                                    imagen={videogame.imagen}
                                    fecha={videogame.fecha}
                                    rating={videogame.rating}
                                    genres={videogame.genres}
                                
                                />
                            
                            ))

                        ) : (<>

                            <br/>    
                            <h2 className={style.subtitleImg}><img src={wait} alt="waiting" height= '130px'/></h2>
                            
                        
                        </>)}

                    </div>

                </div>    

            </div>
    
    </>)

}

export default VideogamesContainer;
