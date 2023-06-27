import { useState } from "react";
import {useNavigate} from "react-router-dom"
import style from "./SearchBar.module.css"

export default function SearchBar(){

    const navigate = useNavigate();

    const [search, setSearch] = useState({

        nombre: "",

    })

    const handleChangeSearch = (event) => {

        const property = event.target.name;

        const value = event.target.value;

        setSearch({[property]: value})

    }

    const submitHandlerSearch = (event) => {

        navigate(`/results/${search.nombre}`)

    }
 
    return(<>

        <form onSubmit={submitHandlerSearch}>

            <input type="text" value={search.nombre} name="nombre" onChange={handleChangeSearch} className={style.inputSearch}/>
            
            <button className={style.btn76}>
             BUSCAR
                <span className={style.top}></span>
                <span className={style.right}></span>
                <span className={style.bottom}></span>
                <span className={style.left}></span>
            </button>


        </form>

    </>)

}