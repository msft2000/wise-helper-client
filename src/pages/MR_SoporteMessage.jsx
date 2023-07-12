import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header as HeaderVoluntario } from "../components/Header_Voluntario";
import { Header as HeaderAdulto } from "../components/Header_Adulto";
import { Header as HeaderIndex } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import "../sass/mr_soporteMessage.scss";

import axios from 'axios';
import { GeneralContext } from "../context";
import toast, { Toaster } from "react-hot-toast";

function SoporteMessage({ adultoMayor }) {
  const url = window.location.href;
  const navigate=useNavigate();

  const [asunto, setAsunto] = useState("");
  const [detalles, setDetalles] = useState("");

  const { usuario } = React.useContext(GeneralContext);

  const enviarMensaje = (e) => {
    e.preventDefault();

    if(asunto==="" || detalles === ""){
      toast.error("Todos los campos deben ser llenados");
      return;
    }

    const toastID = toast.loading("Enviando Ticket...");

    let data = JSON.stringify({
      "titulo": asunto,
      "descripcion": detalles,
      "estado": "Activo",
      "id_usuario": usuario.user._id
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://wise-helper-backend.onrender.com/api/v1/tickets/create',
      headers: { 
        'Content-Type': "application/json",
        'Authorization': `Bearer ${usuario.token}`,
      },
      data: data
    };
  
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.dismiss(toastID);
        setAsunto("");
        setDetalles("");
        toast.success("Ticket Creado Correctamente!");
        navigate(`/adult/support`);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastID);
        if (error.response.status === 401 || error.response.status === 400) {
          toast.error("Error al crear el ticket");
        }
      });
  };  

  return (
    <div className="soporte-message">
      {url.includes("adult") ? (
        <HeaderAdulto/>
      ) : url.includes("volunter") ? (
        <HeaderVoluntario/>
      ) : (
        <HeaderIndex></HeaderIndex>
      )}
      <Toaster></Toaster>
      <section className="container">
        <h1> Ayudanos a mejorar WiseHelpers </h1>

        <div className="Asunto">
          <h2>¿Cómo podemos mejorar?</h2>

          <input
            type="text"
            placeholder="Ingresa el asunto aquí"
            className="txtField"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />
          <p className="ocultar">* Este campo es requerido</p>
        </div>

        <div className="Detalles">
          <h2>Detalles:</h2>
          <textarea 
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}></textarea>
          <p className="ocultar">* Este campo es requerido</p>
          {/* <input
            required
            type="button"
            value="+  Agregar captura de pantalla o video"
            class="btn btn-orange"
          /> */}
        </div>

        <div className="Ayuda">
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
            className="btn btn-grey"
            onClick={() =>{url.includes("adult") ? navigate("/adult/support") : url.includes("volunter") ? navigate("/volunter/support") : navigate("/support") }}
          />
          <input type="button" value="Enviar" className="btn btn-orange" onClick={enviarMensaje}/>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

export { SoporteMessage };
