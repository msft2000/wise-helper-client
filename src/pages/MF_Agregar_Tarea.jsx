import React from "react";
import { useNavigate } from "react-router-dom";
import "../sass/mf_agregarTarea.scss";
import { Header } from "../components/Header_Adulto";
import { Footer } from "../components/Footer";
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
      loading: "Agregando Tarea...",
      success: <b>Tarea Agregada</b>,
      error: <b>No se pudo agregar la tarea.</b>,
    });
    setTimeout(() => {
        navigate("/adult");
    }, 2000);
  };

  return (
    <div className="agregar-tareas">
      <Header></Header>

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

      <Footer></Footer>
    </div>
  );
}

export { AgregarTarea };
