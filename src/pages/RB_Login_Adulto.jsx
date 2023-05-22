/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { MdPerson, MdOutlineLock } from "react-icons/md";
import styles from "../sass/rb_login.scss";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
        <h1>Login</h1>
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
        <a onClick={()=>navigate("/register")}>Registrate</a>
      </div>
      <footer>Realizado por Renato Berrezueta</footer>
    </div>
  );
}

export { Login };
