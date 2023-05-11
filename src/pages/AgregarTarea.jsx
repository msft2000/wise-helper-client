import React from "react";
import { useNavigate } from "react-router-dom";
import "../sass/AgregarTarea.scss";
import { Navbar } from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function AgregarTarea() {
  const navigate = useNavigate();
  const save = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  const notify = () => {
    // toast.success("Informacion Actualizada");
    toast.promise(save(), {
      loading: "Acgregar Tarea...",
      success: <b>Tarea Agregada</b>,
      error: <b>Could not save.</b>,
    });
    setTimeout(() => {
        navigate("/adult");
    }, 2000);
  };

  return (
    <div id="agregar-tareas">
      <Navbar flag={1} />
      <div className="agregar-tarea-general--container">
        <div className="agregar-tareas--header">
          <h1>Agregar Tarea</h1>
          <hr />
        </div>
        <div className="agregar-tarea-form-container">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" id="titulo" />
          <label htmlFor="fecha">Fecha Limite</label>
          <input type="date" name="fecha" id="fecha" />
          <label htmlFor="tiempo-estimado">Tiempo Estimado</label>
          <input type="time" name="tiempo-estimado" id="tiempo-estimado" />
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            name="descripcion"
            id="descripcion"
            cols="30"
            rows="5"
          ></textarea>
          {/* <button onClick={()=>navigate("/adult/tareas")}>Agregar Tarea</button> */}
          <button onClick={notify}>Agregar Tarea</button>
          <Toaster />
        </div>
      </div>
      <p>Mateo Flores</p>
    </div>
  );
}

export { AgregarTarea };
