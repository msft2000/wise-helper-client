/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header_Admin";
import "../sass/mr_respuesta.scss";

function Respuesta() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Header />
      <div id="respuesta">
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
            <input
              type="button"
              value="Enviar"
              class="btn btn-orange"
              onClick={() => navigate("/admin")}
            />
            <input
              type="button"
              value="Cancelar"
              class="btn btn-grey"
              onClick={() => navigate("/admin")}
            />
          </div>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export { Respuesta };
