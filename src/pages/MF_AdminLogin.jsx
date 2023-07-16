/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import ax from "axios";
import { MdPerson, MdOutlineLock } from "react-icons/md";
import { Header } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import tabla from "../assets/img/tabla_adulto_login.png";
import chat from "../assets/img/chat_adulto_login.png";
import { GeneralContext } from "../context";
import "../sass/rb_login.scss";
function AdminLogin() {
  const navigate = useNavigate();
  const { setUsuario, setUsuarioLogeado } = React.useContext(GeneralContext);
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    const toastID = toast.loading("Iniciando sesión");
    if (email === "" || pass === "") {
      toast.error("Ingrese todos los campos");
      return;
    }
    const config = {
      method: "post",
      url: "https://wise-helper-backend.onrender.com/api/v1/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: email,
        contrasenia: pass,
      }),
    };
    ax(config)
      .then(function (response) {
        if(response.data.user.tipo !== "admin"){
          toast.dismiss(toastID);
          toast.error("Debes ser administrador para ingresar");
          return;
        }
        localStorage.setItem("usuario", JSON.stringify(response.data));
        setUsuario(response.data);
        setUsuarioLogeado(true);
        setEmail("");
        setPass("");

        toast.dismiss(toastID);
        //toast.success();
        navigate("/admin");
      })
      .catch(function (error) {
        console.log(error);
        toast.dismiss(toastID);
        if (error.response.status === 401) {
          toast.error("Usuario o contraseña incorrectos");
        }
      });
  };

  return (
    <div className="Login">
      <Header></Header>

      <Toaster />
      <div className="content">
        <section className="loginform">
          <h1>Administrador</h1>
          <form onSubmit={loginHandler}>
            <h2>Correo Electrónico</h2>
            <div>
              <MdPerson />
              <input
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <h2>Contraseña</h2>
            <div>
              <MdOutlineLock />
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={pass}
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
