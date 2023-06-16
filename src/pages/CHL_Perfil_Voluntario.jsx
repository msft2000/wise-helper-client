/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../sass/chl_perfil_voluntario.scss";
import { Header } from "../components/Header_Voluntario";
import { Footer } from "../components/Footer";
import img12 from "../assets/img/img12.png";
import img7 from "../assets/img/img7.png";
import Rating from "@mui/material/Rating";
function PerfilVoluntario() {
  return (
    <div className="PerfilVoluntario">
      <Header />
      <div className="container">
        <section class="sec1">
          <section class="sec5">
            <h3>Datos</h3>
            <div>
              <section class="descrip">
                Nombre: <br /> Direccion: <br /> Edad <br /> Calificacion <br />
                <div>
                  <Rating value={parseFloat(4)} readOnly precision={0.5} />
                </div>
              </section>
              <img src={img7} />
            </div>
            <h3>Descripción del Ayudante</h3>
            <section class="descrip2"> Lorem</section>
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
            <div>
              <Rating value={parseFloat(4)} readOnly precision={0.5} />
            </div>
          </div>
          <div>
            <img src={img12} alt="" />
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
              amet distinctio, laudantium et reprehenderit assumenda debitis
              blanditiis, impedit qui pariatur neque repellat alias id in natus
              magnam deleniti consequuntur quisquam.{" "}
            </p>
            <div>
              <Rating value={parseFloat(4)} readOnly precision={0.5} />
            </div>
          </div>
          <div>
            <img src={img12} alt="" />
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
              amet distinctio, laudantium et reprehenderit assumenda debitis
              blanditiis, impedit qui pariatur neque repellat alias id in natus
              magnam deleniti consequuntur quisquam.{" "}
            </p>
            <div>
              <Rating value={parseFloat(4)} readOnly precision={0.5} />
            </div>
          </div>
          <input type="button" value="Regresar" hidden />
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
export { PerfilVoluntario };
