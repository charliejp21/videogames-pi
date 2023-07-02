const validation = (form, errors, setErrors) => {

    //nombre

    if(form.nombre){

        if(form.nombre.length > 40){

            setErrors({...errors, nombre: "No puedes superar los 40 carcateres"})

        }else if(!/^[A-Za-z\s1-9]*$/.test(form.nombre)){

            setErrors({...errors, nombre: "Solo debes ingresar texto con números y sin caracteres especiales"});

        }else{

            setErrors({...errors, nombre: ""});
        }

    }

    //Descripcion

    if(form.descripcion){

        if(form.descripcion.length > 400){ 
            
            setErrors({...errors, descripcion: "No puedes superar los 400 caracteres "})

        }else{

            setErrors({...errors, descripcion: ""})

        }
    }

    //Imagen

    if(form.imagen){

        if(!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)\.jpg$/i.test(form.imagen)){

        setErrors({...errors, imagen: "Ingresa una URL válida"})

        }else{

            setErrors({...errors, imagen: ""})

        }

    }

    //Fecha
    if(form.fecha){

        let newDate = form.fecha.split('-').reverse().join('/');

        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(newDate)){

            setErrors({
                ...errors,
                fecha: "Ingresa un formato de fecha"
            })

        }else{

            setErrors({

                ...errors, 

                fecha: ""
            })
        }

    }

    //Rating
    if(form.rating){

        console.log(form.rating.length)

        if(form.rating > 5){

            setErrors({...errors, rating:"El rating no puede ser mayor a 5"})

        } else if(form.rating.length > 4){

            setErrors({...errors, rating:"El rating puede tener máximo 2 decimales"})

        }else if(!/^\d+(\.\d+)?$/.test(form.rating)){

            setErrors({...errors, rating:"El rating con decimales puede tener máximo dos decimales"})

        }
        else{

            setErrors({...errors, rating: ""})

        }

    }
    
   
}

export default validation;