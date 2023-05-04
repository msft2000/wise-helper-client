/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../css/TareaFinVoluntario.css";
import { Navbar } from "../components/Navbar";
import img7 from "../assets/img/img7.png";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
function TareaFinVoluntario() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  return (
    <React.Fragment>
      <div className="TareaFinAdulto">
        <Navbar flag={1} />
        <section>
          <h1> Tarea Realizada</h1>
          <div>
            <img id="foto" src={img7} />
            <label id="nombre" for="nombre">
              {" "}
              Ana Garcia{" "}
            </label>
          </div>
          <p> Califica a la persona por el trabajo realizado</p>
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
            <textarea placeholder="Escriba un mensaje Comentario aqui (opcional)"></textarea>
          </div>
          <div>
            <input type="button" id="btnEnviar" value="Enviar" onClick={()=>{navigate("/adult")}}/>
            <input type="button" id="btnOmitir" value="Omitir" onClick={()=>{navigate("/adult")}}/>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
export { TareaFinVoluntario };
