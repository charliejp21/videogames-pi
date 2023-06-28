import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getAllVideogames, deleteVg} from '../../redux/action';
import Videogame from '../../components/Videogame/Videogame';
import wait from '../../images/loading-12.gif';
import style from './Created.module.css';

const CreatedVideogames = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        dispatch(getAllVideogames())

        .then(() => setLoading(false))

        .catch((error) => {

            setLoading(false)

            console.error('Error al obtener los videojuegos', error);
        })

    }, [])

    const handlerDelete = async(id) =>{

        let response = await deleteVg(id)

        if(response instanceof Error){

            console.error(response)

        }else{

            console.log(response)
        }

    }

    const videogames = useSelector(state => state.videogames.data)

    const videogamesCreated = videogames.filter((vg) => vg.created)

    return(

        <div className={style.divContainer}>

            <div className={style.sideContainer}>

                {loading ? (

                    <h1 className={style.bienvenido}>Buscando...</h1>
                        
                ): videogamesCreated.length > 0 ? (<>
                
                    <h1 className={style.bienvenido}>{videogamesCreated.length} Juegos creados</h1> 
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

                        <h1 className={style.bienvenido}>Sin resultados encontrados para juegos creados</h1> 
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
                
                : videogamesCreated.length > 0 ? (<>
                        
                    <div className={style.vGContainer}>

                        <div className={style.vGCards}>
        
                            {videogamesCreated.map(videogame => {
        
                                return(

                                    <div>
                                        <button className={style.deleteVg} onClick={() => {handlerDelete(videogame.id)}}><a href="#">X</a></button>
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
                                    </div>

                                )
        
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

export default CreatedVideogames;