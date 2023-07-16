/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header as HeaderVoluntario } from "../components/Header_Voluntario";
import { Header as HeaderAdulto } from "../components/Header_Adulto";
import { Header as HeaderIndex } from "../components/Header_Index";
// import img12 from "../assets/img/img12.png";
import "../sass/mr_consultas.scss";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { GeneralContext } from "../context";

import axios from 'axios';

async function eliminarConsulta(user_token, ticket_id){
  return new Promise((resolve, reject) => {
    const toastID = toast.loading("Eliminando Consulta...");
    let data = '';

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://wise-helper-backend.onrender.com/api/v1/tickets/delete/${ticket_id}`,
      headers: { 
        'Authorization': `Bearer ${user_token}`
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      toast.dismiss(toastID);
      toast.success("Consulta eliminada con éxito");
      resolve(response.data); // Resolvemos la promesa con los datos de respuesta
    })
    .catch((error) => {
      console.log(error);
      reject(error); // Rechazamos la promesa con el error
    });
  });
}

async function getConsultas(user_id, user_token, setConsultas){
    let data = '';
    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://wise-helper-backend.onrender.com/api/v1/tickets/get-tickets-by-user/${user_id}`,
      headers: { 
        'Authorization': `Bearer ${user_token}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      setConsultas(response.data.tickets);
    })
    .catch((error) => {
      console.log(error);
    });    
}

function ConsultasGeneradas() {
  let effect_exe=0;//Control de ejecuciones de useEffect+
  const navigate = useNavigate();
  const url = window.location.href;

  const { usuario, consultas, setConsultas, setTicket, ticket } = React.useContext(GeneralContext);

  let filaSeleccionada = null;
  useEffect(() => {
    
    if(effect_exe===0){
      // Código a ejecutar después de la carga de la página
      getConsultas(usuario.user._id, usuario.token, setConsultas);
      effect_exe=1;
    }
  }, []);

  useEffect(() => {
    const filas = document.querySelectorAll("tr");

    filas.forEach(function (fila, index) {
      fila.addEventListener("click", function () {
        if (filaSeleccionada) {
          filaSeleccionada.classList.remove("selected");
        }
        fila.classList.add("selected");
        filaSeleccionada = fila;
        setTicket(consultas[index-1]);
      });
    });

  }, [consultas]);

  useEffect(() => {
    
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
      <div id="soporte">
        <section>
          <h1>Lista de consultas generadas</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Fecha Petición</th>
                  <th>Estado</th>
                  <th>Asunto</th>
                </tr>
              </thead>
              <tbody>
                {
                  consultas.map((consulta) => {
                    return (
                      <tr>
                        <td>
                          {new Date(consulta.createdAt).toLocaleString("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        </td>
                        <td>
                        <p className={consulta.estado.toLowerCase().replace(/ /g, "")}>
                          {consulta.estado}
                        </p>
                        </td>
                        <td>{consulta.titulo}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>

          <div className="btns">
            <input 
              type="button" 
              value="Eliminar" 
              className="btn btn-grey"
              onClick={async () => {
                  await eliminarConsulta(usuario.token, ticket._id);
                  window.location.reload();
                }
              }
            ></input>
            <input
              type="button"
              value="Detalles"
              className="btn btn-orange"
              onClick={() => navigate("respuesta/123")}
            ></input>
          </div>

        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export { ConsultasGeneradas };