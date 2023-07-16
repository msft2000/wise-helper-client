import {React} from "react";
import { useNavigate } from "react-router-dom";
import {Footer} from "../components/Footer";
import {Header} from "../components/Header_Index";
import "../sass/rb_portal_servicios.scss";

function Content(){
    const navigate=useNavigate();
    return(
        <div className="content">
            <h1 className="content_h1">WiseHelpers</h1>
            <h2 className="content_h2">Bienvenido a nuestro sistema de voluntariado</h2>
            <h3 className="content_h3">Escoge el servicio que deseas </h3>
            <section className="cards">
                <article className="card">
                    <h1 className="card_h1">Adulto Mayor</h1>
                    <h2 className="card_h2"> Ingresa en tu cuenta para solicitar ayuda en tus tareas diarias.</h2>
                    <button className="card_btn" onClick={()=>{navigate("/login-adulto")}}>Ingresar</button>
                </article>
                <article className="card">
                    <h1 className="card_h1">Voluntario</h1>
                    <h2 className="card_h2">Ingresa en tu cuenta para ayudar a adultos mayores con sus tareas diarias.</h2>
                    <button className="card_btn" onClick={()=>{navigate("/login-voluntario")}}>Ingresar</button>
                </article>
                <article className="card">
                    <h1 className="card_h1">Administrador</h1>
                    <h2 className="card_h2">Ingresa en tu cuenta de administrador</h2>
                    <button className="card_btn" onClick={()=>{navigate("/login-admin")}}>Ingresar</button>
                </article>
            </section>
        </div>

    );
}

function PortalServicios(){
    return(
        <div className="PortalServicios">
            <Header></Header>
            <Content></Content>
            <Footer nombre="Renato Berrezueta"></Footer>
        </div>
    );
}

export{PortalServicios};