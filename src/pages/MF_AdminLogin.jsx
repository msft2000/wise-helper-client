/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { MdPerson, MdOutlineLock } from "react-icons/md";
import { Header } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import tabla from "../assets/img/tabla_adulto_login.png";
import chat from "../assets/img/chat_adulto_login.png";
import "../sass/rb_login.scss";
function AdminLogin() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");

  const submitHandler = (e) => {
    e.preventDefault(); //Evita el comportamiento por default al presionar ingresar
    if (user === "" || pass === "") {
      toast.error("Error al iniciar sesión, por favor ingrese sus credenciales.");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="Login">
      <Header></Header>

      <Toaster />
      <div className="content">
        <section className="loginform">
          <h1>Administrador</h1>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            verified
          >
            <h2>Correo Electrónico</h2>
            <div>
              <MdPerson />
              <input
                type="email"
                placeholder="Ingrese su correo"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
            </div>
            <h2>Contraseña</h2>
            <div>
              <MdOutlineLock />
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
            </div>
            <p>¿Olvidaste tu contraseña?</p>
            <button type="submit">INGRESAR</button>
          </form>
        </section>
        <section className="information">
          <h1>¡Bienvenido!</h1>
          <h2>
            Esta parte del sistema es donde se podran gestionar tickets de problemas
            o gestionar usuarios para los administradores del sistema.
          </h2>
          <div className="imgs">
            <img src={tabla} alt="" />
            <img src={chat} alt="" />
          </div>
          <h3>Gestiona tickes y suspende o elimina usuarios.</h3>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}

export { AdminLogin };
