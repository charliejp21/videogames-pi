import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import style from "./Form.module.css";
import validation from './validation';
import {getAllGenres, getAllPlataformas, postVg} from "../../redux/action";

const Form = () => {

    const dispatch = useDispatch();

    const genres = useSelector(state => state.videogames.genres)

    const plataformas = useSelector(state => state.videogames.plataformas)

    useEffect(() => {

        if(!genres.length){

            dispatch(getAllGenres())
        }

        if(!plataformas.length){

            dispatch(getAllPlataformas())
        }

    }, [dispatch])

    const [form, setForm] = useState({

        nombre: "",
        descripcion: "",
        plataformas: [],
        imagen: "",
        fecha: "",
        rating: "",
        genres: []
    })

    const [errors, setErrors] = useState({

        nombre: "",
        descripcion: "",
        imagen: "",
        fecha: "",
        rating: "",

    })

    const changeHandler = (event) => {

        const property = event.target.name;

        const value = event.target.value;

        setForm({

            ...form,

            [property]: value 

        })

        validation({

            ...form,

            [property]: value,
        }, 

        errors,

        setErrors
        
        )
        
    }

    const handlerGenreChange = (event) => {

        const value = event.target.value;

        const checked = event.target.checked;

        if(checked){

            setForm({

                ...form,

                genres: [...form.genres, value]

            })

        }else{

            setForm({

                ...form, 

                genres: form.genres.filter((genre) => genre !== value)

            })

        }

    }

    const handlerPlatformChange = (event) => {

        const value = event.target.value;

        const checked = event.target.checked;

        if(checked){

            setForm({

                ...form,

                plataformas: [...form.plataformas, value]

            })

        }else{

            setForm({

                ...form, 

                plataformas: form.plataformas.filter((plataforma) => plataforma !== value)

            })

        }

    }

    const submitHandler = async(event) => {

        event.preventDefault();

        let response = await postVg(form);

        if(response instanceof Error){

            console.error(response)
            
        }else{

            console.log(response)
        }
        
    }

    return(
                 
        <div className={style.cssGui1yb8fau}>

            <form className={style.cssGui15dast1} onSubmit={submitHandler}>

                <fieldset className={style.cssGui1uuxs66}>

                <legend className={style.cssGuiLaze4w}>Crear nuevo videojuego</legend>

                <label className={style.cssGui1ds78pt}>
                    <span className={style.cssGui1doevve}>Nombre</span>
                    <p>*Sólo se permite texto, números y máximo 40 caracteres</p>
                    <input type="text" name="nombre" value={form.nombre} onChange={changeHandler} className={style.cssGui1a1qsev} />
                    {errors.nombre && <span className={style.error}>{errors.nombre}</span>}
                </label>

                <label className={style.cssGui1ds78pt}>
                    <span className={style.cssGui1doevve}>Descripción</span>
                    <p>*Máximo 400 caracteres</p>
                    <textarea name="descripcion" value={form.descripcion} onChange={changeHandler} rows="5" className={style.cssGui1a1qsev}>Write something here</textarea>
                    {errors.descripcion && <span className={style.error}>{errors.descripcion}</span>}
                </label>

                <label className={style.cssGui1ds78pt}>
                <span className={style.cssGui1doevve}>Plataformas</span>
                <p>*Selecciona al menos una opción</p>
                <div className={style.platformsList}>

                    {plataformas.map((platform) => {

                        return(

                            <div className={style.platformsCheck}>

                            <label key={platform.id}>

                                <input type="checkbox" name="plataformas" value={platform.nombre} onChange={handlerPlatformChange}/>

                                {platform.nombre}

                            </label>

                            </div>

                        )
                    })}

                </div>
                </label>
                {form.plataformas.length === 0 && <span className={style.error}>Selecciona al menos una opción</span>}

                <label className={style.cssGui1ds78pt}>
                    <span className={style.cssGui1doevve}>Imagen</span>
                    <p>*Sólo se permite formato URL y de extensión jpg</p>
                    <input type="url"  name="imagen" value={form.imagen} onChange={changeHandler} className={style.cssGui1a1qsev} />
                    {errors.imagen && <span className={style.error}>{errors.imagen}</span>}
                </label>

                <label className={style.cssGui1ds78pt}>
                    <span className={style.cssGui1doevve}>Fecha de lanzamiento</span>
                    <p>*Sólo se permite formato de fecha</p>
                    <input type="date"  name="fecha" value={form.fecha} onChange={changeHandler} className={style.cssGui1a1qsev} />
                    {errors.fecha && <span className={style.error}>{errors.fecha}</span>}
                </label>

                <label className={style.cssGui1ds78pt}>
                    <span className={style.cssGui1doevve}>Rating</span>
                    <p>*Sólo se permite de 1-5 con dos decimales</p>
                    <input type="text"  name="rating" value={form.rating} onChange={changeHandler} className={style.cssGui1a1qsev} />
                    {errors.rating && <span className={style.error}>{errors.rating}</span>}
                </label>

                <label className={style.cssGui1ds78pt}>
                <span className={style.cssGui1doevve}>Generos / Categorías</span>
                <p>*Selecciona al menos una opción</p>
                <div className={style.genresList}>

                    {genres.map((genre) => {

                        return(

                            <div className={style.genresCheck}>

                            <label key={genre.id}>

                                <input type="checkbox" name="genres" value={genre.nombre} onChange={handlerGenreChange}/>

                                {genre.nombre}

                            </label>

                            </div>

                        )
                    })}

                </div>
                </label>
                {form.genres.length === 0 && <span className={style.error}>Selecciona al menos una opción</span>}

                {form.nombre !== "" && form.descripcion !== "" && form.plataformas.length !== 0 && form.imagen !== "" && form.fecha !== "" && form.rating !== "" && form.genres.length !== 0 ? (<>
                
                    <button type="submit" className={style.btn76}>
                    Enviar
                    <span className={style.top}></span>
                    <span className={style.right}></span>
                    <span className={style.bottom}></span>
                    <span className={style.left}></span>
                    </button>

                </>) : (<>
                
                    <button type="submit" disabled className={style.btn762}>
                    Enviar
                    <span className={style.top}></span>
                    <span className={style.right}></span>
                    <span className={style.bottom}></span>
                    <span className={style.left}></span>
                    </button>

                </>)}


                </fieldset>

            </form>

        </div>

    )

}

export default Form;