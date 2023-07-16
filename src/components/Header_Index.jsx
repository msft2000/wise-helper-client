/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../assets/img/logo.png"
import { useNavigate } from "react-router-dom";
import "../sass/components/header_index.scss"
function Header(){
    const navigate=useNavigate();
    const path=window.location.pathname;
    return(
       <header className="header_index">
            <nav>
                <img src={logo} alt="logo" onClick={()=>{navigate("/")}}/>
                <ul>
                    <li className={path==="/" ? "selected" : ""}><a href="" onClick={()=>{navigate("/")}}>Inicio</a></li>
                    <li className={path==="/our_volunters" ? "selected" : ""}><a href=""  onClick={()=>{navigate("/our_volunters")}}>Nuestros Voluntarios</a></li>
                    <li className={path.includes("/support") ? "selected" : ""}><a href="" onClick={()=>{navigate("/support")}}>Soporte</a></li>
                </ul>
            </nav>
            <div className="btns">
                <button onClick={()=>{navigate("/portal")}}>
                    Iniciar Sesión
                </button>
                <button onClick={()=>{navigate("/register")}}>
                    Registrarse
                </button>
            </div>
       </header> 
    );
}

export {Header};