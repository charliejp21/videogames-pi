import { useEffect, useState } from 'react'
import style from './Results.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import Videogame from "../../components/Videogame/Videogame"
import {VgBysearch} from '../../redux/action'
import wait from '../../images/loading-12.gif'

const ResultsContainer = () => {

    const {nombre} = useParams();

    const dispatch = useDispatch();

    const videogames = useSelector(state => state.searchResults.data)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        dispatch(VgBysearch(nombre))

        .then(() => setLoading(false))

        .catch((error) => {

            setLoading(false);

            console.error('Error al obtener los videojuegos:', error);

        })

    }, [dispatch, nombre])

    return(

        <div className={style.divContainer}>

            <div className={style.sideContainer}>

                {loading ? (

                    <h1 className={style.bienvenido}>Buscando...</h1>
                        
                ): videogames.length > 0 ? (<>
                
                    <h1 className={style.bienvenido}>{videogames.length} Resultados de búsqueda para: <br/><h3>"{nombre}"</h3></h1> 
                    <h5>¿No encontraste el videjouego que buscabas?</h5>
                    <h5>Crea una nueva tarjeta y agrégala a la wikigames </h5>
                    <button className={style.btn76}>
                        <a href={"/crear/"}>CREAR JUEGO</a>
                        <span className={style.top}></span>
                        <span className={style.right}></span>
                        <span className={style.bottom}></span>
                        <span className={style.left}></span>
                    </button>
                
                </>): (<>

                        <h1 className={style.bienvenido}>Sin resultados de búsqueda para: <br/><h6>"{nombre}"</h6></h1>  
                        <h3>Prueba buscando de otra manera</h3>
                        <h5>¿No encontraste el videjouego que buscabas?</h5>
                        <h5>Crea una nueva tarjeta y agrégala a la wikigames </h5>
                        <button className={style.btn76}>
                            <a href={"/crear/"}>CREAR JUEGO</a>
                            <span className={style.top}></span>
                            <span className={style.right}></span>
                            <span className={style.bottom}></span>
                            <span className={style.left}></span>
                        </button>

                </> )}

            </div>

            <div className={style.vGContainer}>

                {loading ? (<>
                    <br/>
                    <h2 className={style.subtitleImg}><img src={wait} alt="waiting" height= '130px'/></h2></>)
                
                : videogames.length > 0 ? (<>
                        
                    <div className={style.vGContainer}>

                        <div className={style.vGCards}>
        
                            {videogames.map(videogame => {
        
                                return <Videogame

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
        
                            })}

                        </div> 
                            
                    </div>
                    
                    </>) : (

                        <h1 className={style.h1Search}>Error 404</h1>

                    )}

            </div>

        </div>

    )


} 

export default ResultsContainer;