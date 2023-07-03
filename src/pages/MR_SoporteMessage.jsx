import React from "react";
import { useNavigate } from "react-router-dom";
import { Header as HeaderVoluntario } from "../components/Header_Voluntario";
import { Header as HeaderAdulto } from "../components/Header_Adulto";
import { Header as HeaderIndex } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import "../sass/mr_soporteMessage.scss";

function SoporteMessage({ adultoMayor }) {
  const url = window.location.href;
  const navigate=useNavigate();
  return (
    <div className="soporte-message">
      {url.includes("adult") ? (
        <HeaderAdulto/>
      ) : url.includes("volunter") ? (
        <HeaderVoluntario/>
      ) : (
        <HeaderIndex></HeaderIndex>
      )}

      <section className="container">
        <h1> Ayudanos a mejorar WiseHelpers </h1>

        <div class="Asunto">
          <h2>¿Cómo podemos mejorar?</h2>

          <input
            type="text"
            placeholder="Ingresa el asunto aquí"
            class="txtField"
          />
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
          <input
            type="button"
            value="Cancelar"
            class="btn btn-grey"
            onClick={() =>{url.includes("adult") ? navigate("/adult/support") : url.includes("volunter") ? navigate("/volunter/support") : navigate("/support") }}
          />
          <input type="button" value="Enviar" class="btn btn-orange" />
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

export { SoporteMessage };
