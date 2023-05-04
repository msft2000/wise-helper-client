/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../css/navbar2.css";
import {FaBars} from "react-icons/fa"
import logo from "../assets/img/logo.png"
import { useNavigate } from "react-router-dom";
function Navbar(props) {
  const navigate=useNavigate();
  const [flag,setFlag]=React.useState(false);
  return (
    <header className="NavBar1">
    <nav>
      <img src={logo} onClick={()=>navigate("/")}/>
      <ul className={flag ? "show":""}>
        <li class={props.flag===1 ? "selected":""}><a onClick={()=>navigate("/adult")}>Mis Tareas</a></li>
        <li class={props.flag===2 ? "selected":""}><a onClick={()=>navigate("/adult/tareas")}>Historial de Tareas</a></li>
        <li class={props.flag===3 ? "selected":""}><a onClick={()=>navigate("/adult/perfil")}>Perfil</a></li>
        <li class={props.flag===4 ? "selected":""}><a onClick={() => navigate("/adult/support")}>Soporte</a></li>
      </ul>
      <span className="btn_menu" onClick={()=>{flag ? setFlag(false): setFlag(true)}}>
        <FaBars/>
      </span>
    </nav>
  </header>
  );
}
export{Navbar};
