import React from "react";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaSignOutAlt, FaRegUserCircle, FaBars } from "react-icons/fa";
import "../sass/components/header_voluntario.scss";
import { GeneralContext } from "../context";

function Header() {
  const { usuario} = React.useContext(GeneralContext);
  const navigate = useNavigate();
  const [flag, setFlag] = React.useState(false);
  const path = window.location.pathname;
  var nombre=usuario.user.name;
  var msg=`¡Hola de nuevo, ${nombre}!`;
  return (
    <header className={flag ? "header_voluntario mobile" : "header_voluntario"} >
      <nav>
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <ul>
          <li className={path === "/volunter" ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/volunter");
              }}
            >
              Tareas Disponibles
            </a>
          </li>
          <li className={path.includes("/volunter/tareas") ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/volunter/tareas");
              }}
            >
              Tareas Activas
            </a>
          </li>
          <li className={path.includes("/volunter/support") ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/volunter/support");
              }}
            >
              Soporte
            </a>
          </li>
        </ul>
        <ul className={flag ? "mobile show":"mobile"}>
            <li>
                <img src={usuario.user.img} alt="" />
                <p>{msg}</p>
            </li>
          <li className={path === "/volunter" ? "selected" : ""}>
            <a onClick={() => navigate("/volunter")}>Tareas Disponibles</a>
          </li>
          <li className={path.includes("/volunter/tareas")? "selected" : ""}>
            <a onClick={() => navigate("/volunter/tareas")}>Tareas Activas</a>
          </li>
          <li className={path.includes("/volunter/support") ? "selected" : ""}>
            <a onClick={() => navigate("/volunter/support")}>Soporte</a>
          </li>
          <li className={path === "/volunter/perfil" ? "selected" : ""}>
            <a onClick={() => navigate("/volunter/perfil")}>Mi Perfil</a>
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
        <p>{msg}</p>
        <div className="dropdown">
          <img src={usuario.user.img} alt="" />
          <RiArrowDownSFill></RiArrowDownSFill>
          <div className="dropdown-content">
            <span
              className="dropdown-item1"
              onClick={() => navigate("/volunter/perfil")}
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
