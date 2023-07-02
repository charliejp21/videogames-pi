import style from './Videogame.module.css';
import star from './../../images/risa-guino.png'

export default function Videogame(props){

    return(<>

        <a title="" href={"/videogame/" + props.id} className={style.cssGui13feta0}>
            <img src={props.imagen} alt={props.nombre} className={style.cssGui4f95g8}/>
            <div className={style.cssGuitl6zyz}>
                <div className={style.headRating}>  
                 <time className={style.cssGuidmdb0g}>Lanzamiento: {props.fecha} </time>
                 <img src={star} className={style.starImg}/><p className={style.starP}>{props.rating}</p>
                </div>
                <h3 className={style.cssGui1od07ga}>{props.nombre}</h3>
            </div>

            <p className={style.plataformasTitle}>Plataformas disponibles:</p>
            <div className={style.plataformasDiv}>

                {props.plataformas.map((plataforma) => {

                    return(

                       <p className={style.plataformaChild}>{plataforma}</p>
                        
                    )
                })}

            </div>

            {props.genres.length ? (<p className={style.genresTitle}>Categorías / Generos:</p>): ("")}
            
            <div className={style.genresDiv}>

                {props.genres.map((genre) => {

                    return(

                       <p className={style.genresChild}>{genre}</p>
                        
                    )
                })}

            </div>

            <button className={style.btn76}>
                <a href={"/videogame/" + props.id}>CONOCER JUEGO</a>
                <span className={style.top}></span>
                <span className={style.right}></span>
                <span className={style.bottom}></span>
                <span className={style.left}></span>
            </button>
            
        </a>

</>)

}


