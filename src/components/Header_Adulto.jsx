import React from "react";
import logo from "../assets/img/logo.png";
import img from "../assets/img/img12.png";
import { useNavigate } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaSignOutAlt, FaRegUserCircle, FaBars } from "react-icons/fa";
import "../sass/components/header_adulto.scss";
function Header() {
  const navigate = useNavigate();
  const [flag, setFlag] = React.useState(false);
  const path = window.location.pathname;
  return (
    <header className="header_adulto">
      <nav>
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <ul>
          <li className={path === "/adult" ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/adult");
              }}
            >
              Mis Tareas
            </a>
          </li>
          <li className={path === "/adult/tareas" ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/adult/tareas");
              }}
            >
              Historial de Tareas
            </a>
          </li>
          <li className={path === "/adult/support" ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/adult/support");
              }}
            >
              Soporte
            </a>
          </li>
        </ul>
        <ul className={flag ? "mobile show":"mobile"}>
            <li>
                <img src={img} alt="" />
                <p>¡Bienvenida Marta!</p>
            </li>
          <li className={path === "/adult" ? "selected" : ""}>
            <a onClick={() => navigate("/adult")}>Mis Tareas</a>
          </li>
          <li className={path === "/adult/tareas" ? "selected" : ""}>
            <a onClick={() => navigate("/adult/tareas")}>Historial de Tareas</a>
          </li>
          <li className={path === "/adult/support" ? "selected" : ""}>
            <a onClick={() => navigate("/adult/support")}>Soporte</a>
          </li>
          <li className={path === "/adult/perfil" ? "selected" : ""}>
            <a onClick={() => navigate("/adult/perfil")}>Mi Perfil</a>
          </li>
          <li>
            <a onClick={() => navigate("/")}>Cerrar Sesión</a>
          </li>
        </ul>
        <span
          className="btn_menu"
          onClick={() => {
            flag ? setFlag(false) : setFlag(true);
          }}
        >
          <FaBars />
        </span>
      </nav>
      <div className="btn">
        <p>¡Bienvenida Marta!</p>
        <div className="dropdown">
          <img src={img} alt="" />
          <RiArrowDownSFill></RiArrowDownSFill>
          <div className="dropdown-content">
            <span
              className="dropdown-item1"
              onClick={() => navigate("/adult/perfil")}
            >
              <FaRegUserCircle></FaRegUserCircle>
              <p>Mi perfil</p>
            </span>
            <span className="dropdown-item2" onClick={() => navigate("/")}>
              <FaSignOutAlt></FaSignOutAlt>
              <p>Cerrar Sesión</p>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
