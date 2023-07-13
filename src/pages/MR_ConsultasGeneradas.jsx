/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header_Admin";
import img12 from "../assets/img/img12.png";
import "../sass/mr_soporte.scss";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { GeneralContext } from "../context";

import axios from 'axios';

async function eliminarTicket(user_token, ticket_id){
  const toastID = toast.loading("Eliminando Ticket...");
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
    console.log(JSON.stringify(response.data));
    toast.dismiss(toastID);
    toast.success("Ticket eliminado con éxito");
  })
  .catch((error) => {
    console.log(error);
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
      console.log(JSON.stringify(response.data));
      setConsultas(response.data.tickets);
    })
    .catch((error) => {
      console.log(error);
    });    
}

function SoporteAdmin() {
  let effect_exe=0;//Control de ejecuciones de useEffect+
  const navigate = useNavigate();

  const { usuario, consultas, setConsultas, setConsulta, consulta } = React.useContext(GeneralContext);

  let filaSeleccionada = null;
  useEffect(() => {
    
    if(effect_exe===0){
      // Código a ejecutar después de la carga de la página
      getConsultas(usuario._id, usuario.token,setTickets);
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
        setTicket(tickets[index-1]);
        setidxTicket(index-1);
      });
    });

  }, [tickets]);

  useEffect(() => {
    
  }, [ticket]);

  return (
    <React.Fragment>
      <Header />
      <Toaster></Toaster>
      <div id="soporte">
        <section>
          <h1>Lista de mensajes de ayuda</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Fecha Petición</th>
                  <th>Asunto</th>
                </tr>
              </thead>
              <tbody>
                {
                  tickets.map((ticket) => {
                    return (
                      <tr>
                        <td>{ticket.id_usuario}</td>
                        <td>
                          {new Date(ticket.createdAt).toLocaleString("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        </td>
                        <td>{ticket.titulo}</td>
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
              onClick={() => eliminarTicket(usuario.token, ticket._id)}
            ></input>
            <input
              type="button"
              value="Responder"
              className="btn btn-orange"
              onClick={() => navigate("/admin/respuesta/123")}
            ></input>
          </div>

        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export { SoporteAdmin };