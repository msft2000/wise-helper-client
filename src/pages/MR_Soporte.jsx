/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header_Admin";
import img12 from "../assets/img/img12.png";
import "../sass/mr_soporte.scss";
import { Footer } from "../components/Footer";

function SoporteAdmin() {
  const navigate = useNavigate();
  let filaSeleccionada = null;
  useEffect(() => {
    const filas = document.querySelectorAll("tr");

    filas.forEach(function (fila) {
      fila.addEventListener("click", function () {
        if (filaSeleccionada) {
          filaSeleccionada.classList.remove("selected");
        }
        fila.classList.add("selected");
        filaSeleccionada = fila;
      });
    });
  }, []);
  return (
    <React.Fragment>
      <Header />
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
                <tr onClick={() => {}}>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
                <tr>
                  <td>
                    <img src={img12} />
                  </td>
                  <td>12 Mar 2023</td>
                  <td>Limpieza de hogar</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="btns">
            <input type="button" value="Eliminar" class="btn btn-grey"></input>
            <input
              type="button"
              value="Responder"
              class="btn btn-orange"
              onClick={() => navigate("/respuesta")}
            ></input>
          </div>

          <footer style={{ fontSize: "small" }}>Mateo Reinoso</footer>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export { SoporteAdmin };
