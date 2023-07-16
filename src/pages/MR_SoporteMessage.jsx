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


async function crearConsulta(asunto, detalles, user_id, user_token, setAsunto, setDetalles){
  return toast.promise(
    new Promise((resolve, reject) => {
      let data = JSON.stringify({
        "titulo": asunto,
        "descripcion": detalles,
        "estado": "Activo",
        "id_usuario": user_id
      });
  
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://wise-helper-backend.onrender.com/api/v1/tickets/create',
        headers: { 
          'Content-Type': "application/json",
          'Authorization': `Bearer ${user_token}`,
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          setAsunto("");
          setDetalles("");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }),
    {
      loading: 'Creando Consulta...',
      success: 'Consulta Creada Correctamente!',
      error: 'Error al Crear la Consulta',
    }
  );
}


function SoporteMessage({ adultoMayor }) {
  const url = window.location.href;
  const navigate=useNavigate();

  const [asunto, setAsunto] = useState("");
  const [detalles, setDetalles] = useState(""); 

  const {usuario} = React.useContext(GeneralContext);

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
          <input 
            type="button" 
            value="Enviar" 
            className="btn btn-orange" 
            onClick={async() => {
              if(asunto==="" || detalles === ""){
                toast.error("Todos los campos deben ser llenados");
              }else{
                await crearConsulta(asunto, detalles, usuario.user._id, usuario.token, setAsunto, setDetalles);
                navigate(-1);
              }
            }}/>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

export { SoporteMessage };
