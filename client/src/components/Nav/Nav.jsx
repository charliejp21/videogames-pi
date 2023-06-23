import React from "react";
import SearchBar from "../SearchBar/SearchBar"
import style from "./Nav.module.css"

const Nav = () => {
return (
        <div className={style.topnav}>

            <a href="/videojuegos">Videojuegos</a>

            <a href="/crear-videojuego">Crear videojuego</a>

            <a href="/mis-videojuegos">Videojuegos creados</a>

            <a href="/">Regresar a inicio</a>

            <SearchBar />

        </div>
)}

export default Nav;