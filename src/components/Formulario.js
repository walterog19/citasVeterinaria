import React, {Fragment,useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {
    // Crear State  de Citas
     const [cita, actualizarCita] = useState(
         {
            mascota: '',
            propietario :'',
            fecha:'',
            hora:'',
            sintoma:'' 
         }
     );

     const [error,actualizarError ] = useState(false);


    // Funcion que se ejecuta al actualizar el state
    const actualizarState = e =>{
        console.log('escribiendo...'+e.target.name);
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
            })
    }

    

    // Extraer los valores
    const {mascota="", propietario="",fecha="",hora="",sintomas=""} = cita;

    // Guardar Cita 
    const guardarCita=e=>{

        e.preventDefault();

        // Validar cita

        if (mascota.trim() === '' || propietario.trim() === '' 
            || fecha.trim() === ''|| hora.trim() === '' || sintomas.trim() === ''){
            
            actualizarError(true);
            return;
        }

        actualizarError(false);
        // Asignar Id
        cita.id =uuidv4();
        console.log(cita);
        
        // Crear la cita 
        crearCita(cita);

        // Reiniciae el form
         actualizarCita({
            mascota: '',
            propietario :'',
            fecha:'',
            hora:'',
            sintoma:'' 
        });


        console.log('guardando cita...');

    }


    return ( 
        <>
        <h2>Crear cita</h2>
        {error && <p className="alerta-error">Todos los campos son obligatorios</p> }
        <form
            onSubmit={guardarCita}
        >
            <label>Nombre de mascota</label>
            <input 
             type="text"
             name="mascota"
             className="u-full-width"
             placeholder="Nombre Mascota"
             onChange={actualizarState}
             value ={mascota}

             />
              <label>Nombre Dueño</label>
             <input 
             type="text"
             name="propietario"
             className="u-full-width"
             placeholder="Nombre Dueño de la Mascota"
             onChange={actualizarState}
             value ={propietario}

             />
             <label>Fecha</label>
            <input 
             type="date"
             name="fecha"
             className="u-full-width"
             onChange={actualizarState}
             value ={fecha}
             

             />

            <label>Hora</label>
            <input 
             type="time"
             name="hora"
             className="u-full-width"    
             onChange={actualizarState}
             value ={hora}       

             />
             <label>Sintomas</label>
             <textarea className="u-full-width" 
             name="sintomas" 
             onChange={actualizarState}
             >{sintomas}</textarea>

             <button type="submit" className="u-full-width button-primary" >Agregar Cita</button>



        </form>
        </>
     );
}
 
export default Formulario;