import React from "react";
import { Menu } from "../components/Menu.jsx";
import "../css/AgregarTarea.css";

function AgregarTarea(){
    return(
        <div id="agregar-tareas">
            <Menu />
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
                    <textarea name="descripcion" id="descripcion" cols="30" rows="5"></textarea>
                    <button>Agregar Tarea</button>
                </div>
            </div>
        </div>
            
    )
}

export { AgregarTarea };