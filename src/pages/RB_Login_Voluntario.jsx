/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { MdPerson, MdOutlineLock } from "react-icons/md";
import { Header } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import tabla from "../assets/img/tabla_voluntario_login.png";
import { GeneralContext } from "../context";
import ax from "axios";
import "../sass/rb_login.scss";
function Login() {
  const navigate = useNavigate();
  const { setUsuario, setUsuarioLogeado } = React.useContext(GeneralContext);
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    const toastID = toast.loading("Iniciando sesión");
    const config = {
      method: "post",
      url: "https://wise-helper-backend.onrender.com/api/v1/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: user,
        contrasenia: pass,
      }),
    };
    ax(config)
      .then(function (response) {
        if(response.data.user.tipo !== "voluntario"){
          toast.dismiss(toastID);
          toast.error("Debes ser un voluntario para ingresar a esta sección.");
          return;
        }
        localStorage.setItem("usuario", JSON.stringify(response.data));
        setUsuario(response.data);
        setUsuarioLogeado(true);
        setUser("");
        setPass("");
        toast.dismiss(toastID);
        navigate("/volunter");
      })
      .catch(function (error) {
        console.log(error);
        toast.dismiss(toastID);
        if (error.response.status === 401) {
          toast.error("Error al iniciar sesión, por favor verifique sus credenciales.");
        }
      });
  };

  return (
    <div className="Login">
      <Header></Header>

      <Toaster />
      <div className="content">
        <section className="loginform">
          <h1>Voluntario</h1>
          <form onSubmit={loginHandler} verified >
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
          <h3>O registrate</h3>
          <a onClick={() => navigate("/register")}>Registrarse</a>
        </section>
        <section className="information">
          <h1>¡Bienvenido!</h1>
          <h2>
            Nuestro sistema conecta adultos mayores con voluntarios
            comprometidos para ayudar en tareas y actividades cotidianas
          </h2>
          <div className="imgs">
            <img className="voluntario" src={tabla} alt="" />
          </div>
          <h3>
          Gestiona tus tareas e interactua con los adultos mayores a los que quieres ayudar.
          </h3>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}

export { Login };