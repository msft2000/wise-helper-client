/* eslint-disable no-unused-vars */
/*Calificar a un voluntario de parte de adulto mayor*/
import React from "react";
import "../sass/chl_tareaFin.scss";
import img7 from "../assets/img/img7.png";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header_Adulto";
import { Footer } from "../components/Footer";
import { GeneralContext } from "../context";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

async function enviarComentario(id_adulto,id_voluntario,calificacion,comentario){
  const toastID = toast.loading("Enviando comentario...");
  let data = JSON.stringify({
    "id_destino": id_voluntario,
    "id_origen": id_adulto,
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
function TareaFinVoluntario() {
  const {
    usuario,
    tarea,
  } = React.useContext(GeneralContext);
  const navigate = useNavigate();
  const [rating, setRating] = React.useState(0);
  const [coment, setComent] = React.useState("");
  const sendComent= (event) =>{
    (rating===0) ? <></> :
    enviarComentario(usuario._id,tarea.voluntario._id,rating,coment) ? navigate("/adult/tareas"): <div></div>;
  }
  return (
    <div className="TareaFin">
      <Header />
      <div className="container">
        <section className="content">
          <h1> Tarea Realizada</h1>
          <div>
            <img id="foto" src={tarea.voluntario.img} alt=""/>
            <label id="nombre">
              {tarea.voluntario.nombre+" "+tarea.voluntario.apellidos}
            </label>
          </div>
          <p> Califica a la persona por el trabajo realizado</p>
          <div id="estrellas">
            <Rating
              name="half-rating"
              defaultValue={0}
              precision={1}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <h1 id="puntaje">{rating}</h1>
          </div>
          <br />
          <div>
            <textarea 
              placeholder="Escriba un mensaje Comentario aqui (opcional)"
              value={coment}
              onChange={(e) => setComent(e.target.value)}
            ></textarea>
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
              onClick={() => {
                navigate("/adult");
              }}
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
export { TareaFinVoluntario };
