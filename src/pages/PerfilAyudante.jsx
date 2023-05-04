import React from "react";
import "../css/PerfilAyudante.css";
import { Navbar2 } from "../components/Navbar2";
import img12 from "../assets/img/img12.png"
function PerfilAyudante() {
  return (
    <React.Fragment>
      <div className="PerfilAyudante">
      <Navbar2 flag={3}/>
        <section class="sec1">
          <section class="div3"></section>
          <section class="sec5">
            <h3>Datos</h3>
            <div>
              <section class="descrip"> ftefergrefe</section>
              <img src="" />
            </div>
            <h3>Descripción del Ayudante</h3>
            <section class="descrip2"> </section>
            <input type="button" value="Modificar" />
          </section>
        </section>
        <section class="sec2">
          <h3>Reseñas</h3>
          <div>
            <img src={img12} alt="" />
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
              amet distinctio, laudantium et reprehenderit assumenda debitis
              blanditiis, impedit qui pariatur neque repellat alias id in natus
              magnam deleniti consequuntur quisquam.{" "}
            </p>
            <div>Estrellas</div>
          </div>
          <input type="button" value="Regresar" />
        </section>

        <footer>
          <p>
            {" "}
            <b>Hecho Por:</b> Luis Enrique Chusino
          </p>
        </footer>
      </div>
    </React.Fragment>
  );
}
export { PerfilAyudante };
