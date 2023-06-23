import style from "./Inicio.module.css"

const Inicio = () =>{

    return(<>
    
        <header className={style.cssGuiTxrzcj}>

            <h4 className={style.cssGuiI06hl}>Wikigames a light version of rawg.io con +850,000 videojuegos</h4>
            <h2 className={style.cssGuiA1qoh1oc}>Crea, ordena, filtra o busca videojuegos</h2>
            <button className={style.btn76}>
            <a href="/videogames">INGRESAR
                <span className={style.top}></span>
                <span className={style.right}></span>
                <span className={style.bottom}></span>
                <span className={style.left}></span></a>
            </button>

        </header>
      
      </>
    )

}

export default Inicio;
