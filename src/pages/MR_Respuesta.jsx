/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Respuesta.scss";

function Respuesta() {
    const navigate = useNavigate();
  return (
    <div id="respuesta">
      <header>
        <nav>
          <ul>
            <li class="selected">
              <a onClick={navigate("/soporte")}>Soporte</a>
            </li>
            <li>
              <a href="#">Usuarios</a>
            </li>
          </ul>
        </nav>
      </header>

      <section>
        <h1> Escribe tu respuesta al comentario </h1>

        <div class="Asunto">
          <h2>Asunto:</h2>
          <p>Lorem Ipsum</p>
        </div>

        <div class="Detalles">
          <h2>Detalles:</h2>
          <div>
            <p></p>
            <input
              type="button"
              value="+  Descargar contenido adjunto"
              class="btn btn-orange"
            ></input>
          </div>
        </div>

        <div class="Respuesta">
          <h2>Respuesta:</h2>
          <textarea></textarea>
          <p class="ocultar">* Este campo es requerido</p>
        </div>

        <div>
          <input type="button" value="Enviar" class="btn btn-orange" onClick={()=>navigate("/soporte")}/>
          <input type="button" value="Cancelar" class="btn btn-grey" onClick={()=>navigate("/soporte")}/>
        </div>
      </section>

      <footer style={{ fontSize: "small" }}>Mateo Reinoso</footer>
    </div>
  );
}

export { Respuesta };
