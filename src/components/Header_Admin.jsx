/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../assets/img/logo.png";
import img from "../assets/img/img12.png";
import { useNavigate } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import "../sass/components/header_voluntario.scss";
function Header() {
  const navigate = useNavigate();
  const [flag, setFlag] = React.useState(false);
  const path = window.location.pathname;
  return (
    <header className={flag ? "header_voluntario mobile" : "header_voluntario"}>
      <nav>
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <ul>
          <li className={path === "/admin" ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/admin");
              }}
            >
              Mensajes de Soporte
            </a>
          </li>
          <li className={path.includes("/admin/usuarios") ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/admin/usuarios");
              }}
            >
              Administrar Usuarios
            </a>
          </li>
        </ul>
        <ul className={flag ? "mobile show" : "mobile"}>
          <li>
            <img src={img} alt="" />
          </li>
          <li className={path === "/admin" ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/admin");
              }}
            >
              Mensajes de Soporte
            </a>
          </li>
          <li className={path.includes("/admin/usuarios") ? "selected" : ""}>
            <a
              href=""
              onClick={() => {
                navigate("/admin/usuarios");
              }}
            >
              Administrar Usuarios
            </a>
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
        <div className="dropdown">
          <img src={img} alt="" />
          <RiArrowDownSFill></RiArrowDownSFill>
          <div className="dropdown-content">
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
