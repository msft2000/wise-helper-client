/*Calificar a un adulto mayor de parte de un voluntario*/
import React from "react";
import "../sass/chl_tareaFin.scss";
import img12 from "../assets/img/img12.png";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header_Voluntario";
import { Footer } from "../components/Footer";

import { GeneralContext } from "../context";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
async function enviarComentario(id_adulto,id_voluntario,calificacion,comentario){
  const toastID = toast.loading("Enviando comentario...");
  let data = JSON.stringify({
    "id_destino": id_adulto,
    "id_origen": id_voluntario,
    "calificacion": calificacion,
    "comentario": comentario
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://wise-helper-backend.onrender.com/api/v1/auth/calificacion',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    toast.success("Comentario Enviado");
    toast.dismiss(toastID);
    return true;
  })
  .catch((error) => {
    console.log(error);
    toast.error("Error al enviar el comentario. Intentelo después.");
    toast.dismiss(toastID);
    return false;
  });
}
function TareaFinAdulto() {
  const {
    usuarioV,
    tareaV,
  } = React.useContext(GeneralContext);
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [text, setText] = React.useState(""); //es adulto
  const sendComent= (event) =>{
    (value===0) ? <></> :
    enviarComentario(tareaV.adulto._id,usuarioV._id,value,text) ? navigate("/volunter/tareas"): <div></div>;
  }
   
  return (
    <div className="TareaFin">
      <Header/>
      <div className="container">
        <section className="content">
          <h1>Tarea Finalizada</h1>
          <div>
            <img id="foto" src={tareaV.adulto.img} alt=""/>
            <label id="nombre" for="nombre">
              {tareaV.adulto.nombre+" "+ tareaV.adulto.apellidos}
            </label>
          </div>
          <p> Califica a la persona por el trabajo recibido</p>
          <div id="estrellas">
            <Rating
              name="half-rating"
              defaultValue={0}
              precision={1}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <h1 id="puntaje">{value}</h1>
          </div>
          <br />
          <div>
            <textarea 
                placeholder="Escriba un mensaje Comentario aqui (opcional)"
                value={text}
                onChange={(e) => setText(e.target.value)}>
            </textarea>
          </div>
          <div>
            <input
              type="button"
              id="btnEnviar"
              value="Enviar"
              onClick={sendComent}
            />
            <input
              type="button"
              id="btnOmitir"
              value="Omitir"
              onClick={() =>{
                navigate("/volunter/tareas");
              }}
            />
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}
export { TareaFinAdulto };
