/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header_Admin";
import "../sass/mr_respuesta.scss";
import { GeneralContext } from "../context";

function Respuesta() {
  const navigate = useNavigate();

  const {ticket} = React.useContext(GeneralContext);

  return (
    <React.Fragment>
      <Header />
      <div id="respuesta">
        <section>
          <h1> Escribe tu respuesta al comentario </h1>

          <div className="Asunto">
            <h2>Asunto:</h2>
            <p>{ticket.titulo}</p>
          </div>

          <div className="Detalles">
            <h2>Detalles:</h2>
            <div>
              <p>{ticket.descripcion}</p>
              {/* <input
                type="button"
                value="+  Descargar contenido adjunto"
                className="btn btn-orange"
              ></input> */}
            </div>
          </div>

          <div className="Respuesta">
            <h2>Respuesta:</h2>
            <textarea></textarea>
            <p className="ocultar">* Este campo es requerido</p>
          </div>

          <div>
            <input
              type="button"
              value="Enviar"
              className="btn btn-orange"
              onClick={() => navigate("/admin")}
            />
            <input
              type="button"
              value="Cancelar"
              className="btn btn-grey"
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
