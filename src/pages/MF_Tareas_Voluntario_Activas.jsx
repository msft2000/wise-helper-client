import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header_Voluntario";
import {Footer} from "../components/Footer";
import "../sass/mf_tareas_activas_voluntario.scss";
import mujerResenia from "../assets/img/img12.png";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function TareasActivas() {
  const navigate = useNavigate();
  const mostrarMenuLateral = (tarea) => {
    
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
    <div className="tareas-activas--page">
      <Header></Header>
      <div className="tareas-activas--container">
        <div className={menuLateralActivo}>
          <div className="todas-tareas--header" style={{display:"none"}}>
            <button>
              <FilterAltIcon />
              Filtrar Contenido
            </button>
            <button onClick={()=>navigate("agregar-tarea")}>
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
                  <th>Adulto</th>
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
              <img src={mujerResenia} alt="foto-perfil-resenia" style={{borderRadius:"100%"}} />
              <div className="info">
                <h3>Carlos</h3>
                <p>Adulto Mayor</p>
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
          <button className="btn-finalizar" style={{cursor:"pointer"}} onClick={()=>{navigate("/volunter/tareas/finalizar")}}>Finalizar</button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export { TareasActivas };
