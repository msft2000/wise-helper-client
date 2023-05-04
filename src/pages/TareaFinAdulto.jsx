import React from "react";
import "../css/TareaFinAdulto.css";
import { Navbar2 } from "../components/Navbar2";
import img12 from "../assets/img/img12.png";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
function TareaFinAdulto() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  return (
    <React.Fragment>
      <div className="TareaFinAdulto">
        <Navbar2 flag={2} />
        <section>
          <h1>Tarea Finalizada</h1>
          <div>
            <img id="foto" src={img12} />
            <label id="nombre" for="nombre">
              Juan Perez{" "}
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
            {/*<input type="radio" name="rate" id="rate-5" />
            <label for="rate-5" class="fas fa-star"></label>
            <input type="radio" name="rate" id="rate-4" />
            <label for="rate-4" class="fas fa-star"></label>
            <input type="radio" name="rate" id="rate-3" />
            <label for="rate-3" class="fas fa-star"></label>
            <input type="radio" name="rate" id="rate-2" />
            <label for="rate-2" class="fas fa-star"></label>
            <input type="radio" name="rate" id="rate-1" />
  <label for="rate-1" class="fas fa-star"></label>*/}
          </div>
          <br />
          <div>
            <textarea placeholder="Escriba un mensaje Comentario aqui (opcional)"></textarea>
          </div>
          <div>
            <input type="button" id="btnEnviar" value="Enviar" onClick={()=>{navigate("/volunter/tareas")}}/>
            <input type="button" id="btnOmitir" value="Omitir" onClick={()=>{navigate("/volunter/tareas")}}/>
          </div>
          <footer>
            <p>
              <b>Hecho Por:</b> Luis Enrique Chusino
            </p>
          </footer>
        </section>
      </div>
    </React.Fragment>
  );
}
export { TareaFinAdulto };
