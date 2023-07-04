/*Calificar a un voluntario de parte de adulto mayor*/
import React from "react";
import "../sass/chl_tareaFin.scss";
import img7 from "../assets/img/img7.png";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header_Adulto";
import { Footer } from "../components/Footer";
function TareaFinVoluntario() {
  const navigate = useNavigate();
  const [rating, setRating] = React.useState(0);
  const [coment, setComent] = React.useState("");
  const [name, setName] =React.useState("Nombre adulto");
  const sendComent= (event) =>{
    console.log("Etra");
    setComent("");
    navigate("/volunter/tareas");
  }
  return (
    <div className="TareaFin">
      <Header />
      <div className="container">
        <section className="content">
          <h1> Tarea Realizada</h1>
          <div>
            <img id="foto" src={img7} alt=""/>
            <label id="nombre" >
              {name}
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
