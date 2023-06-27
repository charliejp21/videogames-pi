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

            setForm((prevForm) => ({

                ...prevForm,

                genres: [...prevForm.genres, value]

            }))

        }else{

            setForm((prevForm) => ({

                ...prevForm, 

                genres: prevForm.genres.filter((genre) => genre !== value)

            }))

        }

    }

    const handlerPlatformChange = (event) => {

        const value = event.target.value;

        const checked = event.target.checked;

        if(checked){

            setForm((prevForm) => ({

                ...prevForm,

                plataformas: [...prevForm.plataformas, value]

            }))

        }else{

            setForm((prevForm) => ({

                ...prevForm, 

                plataformas: prevForm.plataformas.filter((platforma) => platforma !== value)

            }))

        }

    }

    const submitHandler = async(event) => {

        event.preventDefault();
        
        try {

            await postVg(form); 

            alert("Videojuego creado exitosamente")
            
        } catch (error) {

            alert(`Error al crear el videojuego, ${error}`)
            
        }
    }

    return(
            <div className={style.formDiv}>
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
                <div className={style.cssGui1yb8fau}>

                    <form className={style.cssGui15dast1} onSubmit={submitHandler}>

                        <fieldset className={style.cssGui1uuxs66}>

                        <legend className={style.cssGuiLaze4w}>Crear nuevo videojuego</legend>

                        <label className={style.cssGui1ds78pt}>
                            <span className={style.cssGui1doevve}>Nombre</span>
                            <p>Sólo se permite texto y máximo 40 caracteres</p>
                            <input type="text" className={style.cssGui1a1qsev} />
                            <br />
                            {errors.nombre && <span>{errors.nombre}</span>}
                        </label>

                        <label className={style.cssGui1ds78pt}>
                            <span className={style.cssGui1doevve}>Descripción</span>
                            <p>Sólo se permite texto y máximo 40 caracteres</p>
                            <input type="text" className={style.cssGui1a1qsev} />
                            <br />
                            {errors.descripcion && <span>{errors.descripcion}</span>}
                        </label>

                        <label className={style.cssGui1ds78pt}>
                        <span className={style.cssGui1doevve}>Plataformas</span>
                        <p>Selecciona al menos una opción</p>
                        <div className={style.platformsList}>

                            {plaforms.map((platform) => {

                                return(

                                    <div className={style.platformsCheck}>

                                    <label key={platform}>

                                        <input type="checkbox" name="platforms" value={platform} onChange={handlerPlatformChange}/>

                                        {platform}

                                    </label>

                                    </div>

                                )
                            })}

                        </div>
                        </label>

                        <label className={style.cssGui1ds78pt}>
                            <span className={style.cssGui1doevve}>Imagen</span>
                            <p>Sólo se permite formato URL</p>
                            <input type="url" className={style.cssGui1a1qsev} />
                            <br />
                            {errors.imagen && <span>{errors.imagen}</span>}
                        </label>

                        <label className={style.cssGui1ds78pt}>
                            <span className={style.cssGui1doevve}>Fecha de lanzamiento</span>
                            <p>Sólo se permite formato de fecha</p>
                            <input type="date" className={style.cssGui1a1qsev} />
                            <br />
                            {errors.fecha && <span>{errors.fecha}</span>}
                        </label>

                        <label className={style.cssGui1ds78pt}>
                            <span className={style.cssGui1doevve}>Rating</span>
                            <p>Sólo se permite de 1-5 con dos decimales</p>
                            <input type="text" className={style.cssGui1a1qsev} />
                            <br />
                            {errors.fecha && <span>{errors.fecha}</span>}
                        </label>

                        <label className={style.cssGui1ds78pt}>
                        <span className={style.cssGui1doevve}>Generos / Categorías</span>
                        <p>Selecciona al menos una opción</p>
                        <div className={style.genresList}>

                            {genres.map((genre) => {

                                return(

                                    <div className={style.genresCheck}>

                                    <label key={genre}>

                                        <input type="checkbox" name="platforms" value={platform} onChange={handlerGenreChange}/>

                                        {platform}

                                    </label>

                                    </div>

                                )
                            })}

                        </div>
                        </label>

                        {form.nombre !== "" && form.descripcion !== "" && form.plataformas.length !== 0 && form.imagen !== "" && form.fecha !== "" && form.rating !== "" && form.genres.length !== 0 ? (<>
                        
                            <button type="submit" className={style.btn76}>
                            Enviar
                            <span className={style.top}></span>
                            <span className={style.right}></span>
                            <span className={style.bottom}></span>
                            <span className={style.left}></span>
                            </button>

                        </>) : (<>
                        
                            <button type="submit" disabled className={style.btn76}>
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

            </div>
    )

}

export default Form;