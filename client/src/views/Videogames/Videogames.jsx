import Videogame from '../../components/Videogame/Videogame'
import style from './Videogames.module.css'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import wait from '../../images/loading-12.gif'
import {getAllVideogames} from "../../redux/action"

const VideogamesContainer = () => {

    const dispatch = useDispatch();

    const [pageView, setPageView] = useState([]);

    const videogames = useSelector(state => state.videogames.data)

    useEffect(() => {

        dispatch(getAllVideogames())

    }, [dispatch]);

    useEffect(() => {

        setPageView(videogames)

    })

    return(<>
    
        <div className={style.divContainer}>

            <div className={style.sideContainer}>

                <h1 className={style.bienvenido}>Bienvenido</h1> 

                <h3>Se muestran 10 resultados por paǵina</h3>
                
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
