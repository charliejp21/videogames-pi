import { useDispatch, useSelector } from "react-redux";
import style from './Videogame.module.css';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {getVgById} from "../../redux/action"
import star from "../../images/risa-guino.png"

const VideogameView = () => {

    const {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getVgById(id))

    }, [])

    const videogame = useSelector(state => state.videogames.vgDetail)

    return (<>
    
    <header className={style.cssGui17nf7a5} style={{
        backgroundImage: `linear-gradient(rgba(72, 168, 161, 0.5), rgba(72, 168, 161, 0.5)), url(${videogame.imagen_portada ? videogame.imagen_portada : videogame.imagen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
    }}>
      
        <div className={style.cssGui15k88vv}>
            <h2 className={style.cssGuiC08p3s}>
            {videogame.nombre}
            </h2>
            <br/>
            <p><img src={star}/>{videogame.rating}</p>
            {videogame.website ? (<a href={videogame.website} target="_blank"><p>{videogame.website}</p></a>):("")}
        </div>
    </header>

    <section className={style.cssGui7g9l4j}>
    <div className={style.cssGuiJxv34t}>
        <img src={videogame.imagen} alt={videogame.nombre} 
        className={style.cssGuiC76o7d} />
        
        <div className={style.cssGuiHa9zqb}>
            <h4 className={style.cssGui191l504}>Lanzamiento: {videogame.fecha}</h4>
            <h2 className={style.cssGuiWom882}>
            {videogame.nombre}
            </h2>
            <h3 className={style.cssGui13vv9mx}>
                Rating: {videogame.rating}
            </h3>
            {videogame.esrb_rating ? (<>
            
            <h3 className={style.cssGui13vv9mx}>{videogame.esrb_rating.name}</h3>
            
             </>):("")}

            {Array.isArray(videogame.genres) && videogame.genres.length ? (
                <div className={style.genresMap}>
                <h4>Categorías: </h4>
                {videogame.genres.map((genre) => {

                    return(

                        <p className={style.pMapsDetail}>{genre}</p>

                    )
                })}
                </div>
            ):("")} 
            
            <p className={style.cssGui1gtdkx7}>
                {videogame.descripcion}
            </p>
            {Array.isArray(videogame.developers) && videogame.developers.length ? (<div className={style.developersMap}>
                <h4>Desarrolladores: </h4>
                {videogame.developers.map((developer) => {

                    return(

                        <p className={style.pMapsDetail}>{developer}</p>

                    )
                })}
             </div>):("")}

            </div>
        </div>
    </section>

    <div className={style.infoAdicional}>
    <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
        <defs>
          <style>
            {`
            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .out-top {
              animation: rotate 20s linear infinite;
              transform-origin: 13px 25px;
            }
            .in-top {
              animation: rotate 10s linear infinite;
              transform-origin: 13px 25px;
            }
            .out-bottom {
              animation: rotate 25s linear infinite;
              transform-origin: 84px 93px;
            }
            .in-bottom {
              animation: rotate 15s linear infinite;
              transform-origin: 84px 93px;
            }
            `}
          </style>
        </defs>
        <path fill="#4b0082" className="out-top" d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z" />
        <path fill="#48a8a1" className="in-top" d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z" />
        <path fill="#4b0082" className="out-bottom" d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z" />
        <path fill="#ffffff" className="in-bottom" d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z" />
      </svg>            

        <section className={style.cssGui7g9l4j2}>

            <div className={style.cssGuiJxv34t2}>

                <div className={style.plataformasMap}>

                    <h1>Disponible para:</h1>
                    {videogame.plataformas && videogame.plataformas.map((plataforma) => {

                        return(

                            <p>{plataforma}</p>

                        )

                    })}        

                </div>
            
                <div className={style.cssGuiHa9zqb2}>

                    {videogame.stores ? (

                            <div className={style.storesMap}>

                            <h1>Tiendas para comprar:</h1>
                            {videogame.stores && videogame.stores.map((store) => {

                                return(

                                    <p>{store.store}</p>

                                )

                            })}

                            </div>

                    ) : ("")}    
                    
                </div>
            </div>

        </section>

    </div>

    </>)

}

export default VideogameView;