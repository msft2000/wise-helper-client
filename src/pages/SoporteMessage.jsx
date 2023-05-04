import React from "react";
import { Navbar } from "../components/Navbar";
import { Navbar2 } from "../components/Navbar2";
import "../css/SoporteMessage.scss";

function SoporteMessage({ adultoMayor }) {
  const url = window.location.href;
  return (
    <div id="soporte-message">
      {/* <header>
        <nav>
          <ul>
            <li>
              <a href="#">Mis Tareas</a>
            </li>
            <li>
              <a href="#">Historial de Actividades</a>
            </li>
            <li>
              <a href="#">Perfil</a>
            </li>
            <li class="selected">
              <a href="#">Soporte</a>
            </li>
          </ul>
        </nav>
      </header> */}
      {url.includes("adult") ? <Navbar flag={4}/> : (url.includes("volunter") ? <Navbar2 flag={4}/> : <></>)}

      <section>
        <h1> Ayudanos a mejorar WiseHelpers </h1>

        <div class="Asunto">
          <h2>¿Cómo podemos mejorar?</h2>

          <input type="text" placeholder="Ingresa el asunto aquí" class="txtField" />
          <p class="ocultar">* Este campo es requerido</p>
        </div>

        <div class="Detalles">
          <h2>Detalles:</h2>
          <textarea></textarea>
          <p class="ocultar">* Este campo es requerido</p>
          <input
            required
            type="button"
            value="+  Agregar captura de pantalla o video"
            class="btn btn-orange"
          />
        </div>

        <div class="Ayuda">
          <p>
            Envíanos tus comentarios si tienes ideas para ayudarnos a mejorar
            nuestros productos. Si necesitas ayuda para solucionar un problema
            concreto, accede al servicio de ayuda.
          </p>
        </div>

        <div>
          <input type="button" value="Cancelar" class="btn btn-grey" onClick={()=>console.log(!url.includes("volunter"))}/>
          <input type="button" value="Enviar" class="btn btn-orange" />
        </div>
      </section>

      <footer style={{ fontSize: "small" }}>Mateo Reinoso</footer>
    </div>
  );
}

export { SoporteMessage };
