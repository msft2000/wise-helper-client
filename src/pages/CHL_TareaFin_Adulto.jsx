/*Calificar a un adulto mayor de parte de un voluntario*/
import React from "react";
import "../sass/chl_tareaFin.scss";
import img12 from "../assets/img/img12.png";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header_Voluntario";
import { Footer } from "../components/Footer";
function TareaFinAdulto() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [text, setText] = React.useState("");
  const [name, setName] =React.useState("Nombre Voluntario");
  const sendComent= (event) =>{
    console.log(value + text)
    setText("");
    navigate("/volunter/tareas");
  }
  
  return (
    <div className="TareaFin">
      <Header/>
      <div className="container">
        <section className="content">
          <h1>Tarea Finalizada</h1>
          <div>
            <img id="foto" src={img12} alt=""/>
            <label id="nombre" for="nombre">
              {name}
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
