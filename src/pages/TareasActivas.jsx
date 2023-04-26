import React from "react";
import { Menu } from "../components/Menu.jsx";
import "../css/TareasActivas.css";
import mujerResenia from "../assets/img/resenia-ujer.png";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function TareasActivas() {
  const mostrarMenuLateral = (tarea) => {
    if (tarea === "1") {
      if (tareaActiva1 === "tarea-activa") {
        setTareaActiva1("");
        setMenuLateralActivo("todas-tareas--container");
        setTareaContainer("tarea--container");
      } else {
        setTareaActiva1("tarea-activa");
        setMenuLateralActivo("todas-tareas--container menu-lateral-activo");
        setTareaContainer("tarea--container tarea-activo");
      }
    } else if (tarea === "2") {
      if (tareaActiva2 === "tarea-activa") {
        setTareaActiva2("");
        setMenuLateralActivo("todas-tareas--container");
        setTareaContainer("tarea--container");
      } else {
        setTareaActiva2("tarea-activa");
        setMenuLateralActivo("todas-tareas--container menu-lateral-activo");
        setTareaContainer("tarea--container tarea-activo");
      }
    } else if (tarea === "3") {
      if (tareaActiva3 === "tarea-activa") {
        setTareaActiva3("");
        setMenuLateralActivo("todas-tareas--container");
        setTareaContainer("tarea--container");
      } else {
        setTareaActiva3("tarea-activa");
        setMenuLateralActivo("todas-tareas--container menu-lateral-activo");
        setTareaContainer("tarea--container tarea-activo");
      }
    } else if (tarea === "4") {
      if (tareaActiva4 === "tarea-activa") {
        setTareaActiva4("");
        setMenuLateralActivo("todas-tareas--container");
        setTareaContainer("tarea--container");
      } else {
        setTareaActiva4("tarea-activa");
        setMenuLateralActivo("todas-tareas--container menu-lateral-activo");
        setTareaContainer("tarea--container tarea-activo");
      }
    }
  };
  const [tareaActiva1, setTareaActiva1] = React.useState("");
  const [tareaActiva2, setTareaActiva2] = React.useState("");
  const [tareaActiva3, setTareaActiva3] = React.useState("");
  const [tareaActiva4, setTareaActiva4] = React.useState("");
  const [menuLateralActivo, setMenuLateralActivo] = React.useState(
    "todas-tareas--container"
  );
  const [tareaContainer, setTareaContainer] =
    React.useState("tarea--container");
  return (
    <div id="tareas-activas--page">
      <Menu />
      <div className="tareas-activas--container">
        <div className={menuLateralActivo}>
          <div className="todas-tareas--header">
            <button>
              <FilterAltIcon />
              Filtrar Contenido
            </button>
            <button>
              <AddIcon />
              Agregar Tarea
            </button>
          </div>
          <div className="todas-tareas--body">
            <table>
              <thead>
                <tr>
                  <th>Tarea</th>
                  <th>Fecha Limite</th>
                  <th>Estado</th>
                  <th>Tiempo Estimado</th>
                  <th>Voluntario</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  onClick={() => {
                    mostrarMenuLateral("1");
                  }}
                  className={tareaActiva1}
                >
                  <td>Limpieza de Hogar</td>
                  <td>20/10/2021</td>
                  <td className="en-proceso">En proceso</td>
                  <td>00:45:10</td>
                  <td>Carlos</td>
                </tr>
                <tr
                  onClick={() => {
                    mostrarMenuLateral("2");
                  }}
                  className={tareaActiva2}
                >
                  <td>Compra viveres</td>
                  <td>20/10/2021</td>
                  <td className="en-proceso">En proceso</td>
                  <td>00:45:10</td>
                  <td>Carlos</td>
                </tr>
                <tr
                  onClick={() => {
                    mostrarMenuLateral("3");
                  }}
                  className={tareaActiva3}
                >
                  <td>Cortar Cesped</td>
                  <td>20/10/2021</td>
                  <td className="en-proceso">En proceso</td>
                  <td>00:45:10</td>
                  <td>Carlos</td>
                </tr>
                <tr
                  onClick={() => {
                    mostrarMenuLateral("4");
                  }}
                  className={tareaActiva4}
                >
                  <td>Cuidados Mascota</td>
                  <td>20/10/2021</td>
                  <td className="en-proceso">En proceso</td>
                  <td>00:45:10</td>
                  <td>Carlos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={tareaContainer}>
          <div className="volunter--container">
            <div className="volunter--header">
              <img src={mujerResenia} alt="foto-perfil-resenia" />
              <div className="info">
                <h3>Carlos</h3>
                <p>Voluntario</p>
              </div>
            </div>
            <div className="ratings">
              <StarRateRoundedIcon />
              <StarRateRoundedIcon />
              <StarRateRoundedIcon />
              <StarRateRoundedIcon />
              <StarRateRoundedIcon />
              4.0
            </div>
          </div>
          <div className="descripcion-tarea--container">
            <h3>Descripcion de la tarea</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, voluptate, quia quod quas voluptas
              voluptatem quos doloribus quae natus. Quisquam voluptatum,
              quibusdam, voluptate, quia quod quas voluptas voluptatem quos
              doloribus quae natus.
            </p>
          </div>
          <hr />
          <div className="ubicacion--container">
            <h3>Ubicacion</h3>
            <p>
              <LocationOnIcon /> 123 Main Street, Anytown, CA 12345, USA
            </p>
          </div>
          <button className="btn-finalizar">Finalizar</button>
        </div>
      </div>
    </div>
  );
}

export { TareasActivas };
