/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header as HeaderVoluntario } from "../components/Header_Voluntario";
import { Header as HeaderAdulto } from "../components/Header_Adulto";
import { Header as HeaderIndex } from "../components/Header_Index";
import "../sass/mr_respuesta.scss";
import { GeneralContext } from "../context";

import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';

async function sendRespuesta(id_ticket, respuesta, user_token){
  return new Promise((resolve, reject) => {
    const toastID = toast.loading("Enviando Respuesta...");
    let data = JSON.stringify({
      "idTicket": id_ticket,
      "texto": respuesta
    });

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: 'https://wise-helper-backend.onrender.com/api/v1/tickets/add-mensaje-usuario',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${user_token}`
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      toast.dismiss(toastID);
      toast.success("Respuesta Enviada con Éxito");

      resolve(response.data); // Resolvemos la promesa con los datos de respuesta
    })
    .catch((error) => {
      console.log(error);
      reject(error); // Rechazamos la promesa con el error
    });
  });
}

function Respuesta() {
  const navigate = useNavigate();
  const url = window.location.href;

  const {usuario, ticket} = React.useContext(GeneralContext);
  const [respuesta, setRespuesta] = useState('');

  useEffect(() => {
    console.log(ticket);
  }, [ticket]);

  return (
    <React.Fragment>
      {url.includes("adult") ? (
        <HeaderAdulto />
      ) : url.includes("volunter") ? (
        <HeaderVoluntario />
      ) : (
        <HeaderIndex></HeaderIndex>
      )}
      <Toaster></Toaster>

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
            <textarea
              disabled ={url.includes("adult") || url.includes("volunter") || ticket.mensajes_usuario.length > 0 ? true : false}
              style={url.includes("adult") || url.includes("volunter") ? {backgroundColor: '#ecebeb'} : {}}
              onChange={(e) => {
                setRespuesta(e.target.value);
              }}
              
              value={ticket.mensajes_usuario && ticket.mensajes_usuario.length > 0 ? ticket.mensajes_usuario[0].texto : undefined}


            ></textarea>
            <p className="ocultar">* Este campo es requerido</p>
          </div>

          <div>
            <input
              type="button"
              value="Enviar"
              className="btn btn-orange"
              style={url.includes("adult") || url.includes("volunter") ? {display: 'none'} : {}}
              onClick={
                async () => {
                  await sendRespuesta(ticket._id, respuesta, usuario.token);
                  navigate(-1);
                }
              }
              display="null"

            />
            <input
              type="button"
              value="Cancelar"
              //className="btn btn-grey"
              className={url.includes("adult") || url.includes("volunter") ? 'btn btn-orange' : 'btn btn-grey'}
              onClick={() => navigate(-1)}
            />
          </div>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export { Respuesta };
