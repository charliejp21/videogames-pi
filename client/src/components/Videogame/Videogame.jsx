import style from './Videogame.module.css';

export default function Videogame(props){

    return(<>

        <a title="" href={"/id/" + props.id} className={style.cssGui13feta0}>
            <img src={props.imagen} alt={props.nombre} className={style.cssGui4f95g8}/>
            <div className={style.cssGuitl6zyz}>
                <time className={style.cssGuidmdb0g}>Lanzamiento: {props.fecha}</time>
                <h3 className={style.cssGui1od07ga}>{props.nombre}</h3>
                <p className={style.cssGuiA5e3nn}>
                    {props.descripcion}
                </p>
            </div>
            <p>{props.plataformas}</p>
            <p>{props.rating}</p>
            <p>{props.genres}</p>
            <button className={style.btn76}>
                <a href={"/id/" + props.id}>CONOCER JUEGO</a>
                <span className={style.top}></span>
                <span className={style.right}></span>
                <span className={style.bottom}></span>
                <span className={style.left}></span>
            </button>
        </a>

</>)

}


