import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';


function App() {

 // Citas en el local storage 

  console.log(localStorage.getItem('citas'));
  let  citasIniciales =JSON.parse(localStorage.getItem('citas'));

  if (!citasIniciales){
    citasIniciales=[];
  }
  // Arreglos de Citas
  const [citas,guardarCitas] = useState([]);

  // Use Effect  para realizar ciertas operaciones cuando el state cambia
  useEffect(()=>{
    let  citasIniciales =JSON.parse(localStorage.getItem('citas'));    
    console.log();
    console.log(citas);
   if (citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas));
   }else{
    localStorage.setItem('citas',JSON.stringify([]));
   }

  }, [citas]); // Se pasa un arreglo para que solo se ejecute una vez al inicio o cuando cambia el state de citas
  // Si se pasa un array vacio solo se ejecuta la primera vez

  // Funcion que toma las citas actuales y agrega una nueva

  const crearCita = cita =>{

    console.log(cita);
    guardarCitas([
      ...citas,
      cita
    ]);


  }

  // funcion eliminar cita
  const eliminarCita = id =>{

    console.log(id);
    const nuevasCitas  = citas.filter(cita=> cita.id !== id);

    guardarCitas( nuevasCitas);

  }

  // Mensaje condicional
  const titulo = citas.length===0?'No hay citas': 'Administra tus citas';

  
  return (
    <Fragment>
    <h1>Administrador de pacientes</h1>

    <div className="container">
    <div className="row">
      <div className="one-half column">
      <Formulario crearCita= {crearCita} />
      </div>
      <div className="one-half column">
       <h2>{titulo}</h2>
       {citas.map(cita =>(
         <Cita 
          key ={cita.id}
          cita={cita}
          eliminarCita = {eliminarCita}

         />
       ))}
      </div>

    </div>
    </div>
    </Fragment>
  );
}

Formulario.prototype = {
  crearCita: PropTypes.func.isRequired
}

export default App;
