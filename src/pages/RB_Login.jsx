/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { MdPerson, MdOutlineLock } from "react-icons/md";
import styles from "../sass/rb_login_adulto.scss";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import tabla from "../assets/img/tabla_adulto_login.png"
import chat from "../assets/img/chat_adulto_login.png"

function Login() {
  
  const navigate=useNavigate();
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const submitHandler=(e)=>{
    e.preventDefault();//Evita el comportamiento por default al presionar ingresar
    if(user==="" || pass===""){
      toast.error("Error al iniciar sesión, por favor verifique sus credenciales.")
    }
  };

  return (
    <div className="Login">
      <Toaster />
      <div className="content">
        <section className="loginform">
          <h1>Adulto Mayor</h1>
          <form
            onSubmit={(e) => {submitHandler(e)}}
            verified
          >
            <h2>Correo Electrónico</h2>
            <div>
              <MdPerson />
              <input
                type="email"
                placeholder="Ingrese su correo"
                onChange={(e) => {setUser(e.target.value);}}
              />
            </div>
            <h2>Contraseña</h2>
            <div>
              <MdOutlineLock/>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                onChange={(e) => {setPass(e.target.value);}}
              />
            </div>
            <p>¿Olvidaste tu contraseña?</p>
            <button type="submit">INGRESAR</button>
          </form>
          <h3>O registrate</h3>
          <a onClick={()=>navigate("/register")}>Registrarse</a>
        </section>
        <section className="information">
          <h1>¡Bienvenido!</h1>
          <h2>Nuestro sistema conecta adultos mayores con voluntarios comprometidos para ayudar en tareas y actividades cotidianas</h2>
          <div className="imgs">
            <img src={tabla} alt=""/>
            <img src={chat} alt=""/>
          </div>
          <h3>Gestiona tus tareas e interactua con tus voluntarios asignados.</h3>
        </section>
      </div>
      <footer>Realizado por Renato Berrezueta</footer>
    </div>
  );
}

export { Login };
