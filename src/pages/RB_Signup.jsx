/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import "../sass/rb_signup.scss";
import img3 from "../assets/img/img3.png";
import img4 from "../assets/img/img4.png";
import { isValidDNI } from "ec-dni-validator";
import { Header } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import ax from "axios";
import { GeneralContext } from "../context";

async function getChatToken(uid, email, nombre, apellido) {
  uid=`userChat-${uid}`;
  const token_config={
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_WEAVY_API}`,
    },
    body: JSON.stringify({
      expires_in:999999,
    }),
  };
  const update_config={
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_WEAVY_API}`,
    },
    body: JSON.stringify({
      expires_in:999999,
    }),
  };

  const updateUser= async()=>{//Se agregan los datos de usuario
    let response = await fetch(
      `${process.env.REACT_APP_WEAVY_URL}/api/users/${uid}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_WEAVY_API}`,
        },
        body: JSON.stringify({
          email: email,
          name: nombre,
          family_name: apellido,
        }),
      }
    );
  }

  const getToken=async ()=>{//Se genera el token de usuario
    let token_gen = await fetch(`${process.env.REACT_APP_WEAVY_URL}/api/users/${uid}/tokens`,token_config);
    if (token_gen.ok) {
      let resp = await token_gen.json();
      return resp.access_token;
    }
    else{
      return "";
    }
  }
  var token=await getToken();
  if(token.length!==0){
    updateUser();
  }
  //Agregar datos de usuario
  return token;
}

function Signup() {
  const { setUsuario, setUsuarioLogeado } = React.useContext(GeneralContext);
  const [flag, setFlag] = React.useState(true);
  const [pass, setPass] = React.useState(""); //Contrasenia
  const [nombre, setNombre] = React.useState("");
  const [apellidos, setApellidos] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setID] = React.useState(""); //Cedula
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const toastID = toast.loading("Registrando");
    if (!isValidDNI(id)) {
      toast.error("La cédula ingresada no es válida. Intentelo de nuevo.");
      toast.dismiss(toastID);
      return;
    } else if (pass.length < 8) {
      toast.error("La contraseña ingresada debe tener como mínimo 8 caracteres.");
      toast.dismiss(toastID);
      return;
    }
    const tipo_usuario = flag ? "voluntario" : "adulto_mayor";
    var token = await getChatToken(id,email,nombre,apellidos);
    if (token === ""){
      toast.error(
        "Se produjo un error con el servidor intentelo despues"
      );
      toast.dismiss(toastID);
      return;
    }
    const config = {
      method: "POST",
      url: "https://wise-helper-backend.onrender.com/api/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: email,
        contrasenia: pass,
        nombre: nombre,
        apellidos: apellidos,
        cedula: id,
        tipo: tipo_usuario,
        token_chat: token,
        direccion: "def",
        edad: 0,
        descripcion: "ded"
      }),
    };
    ax(config)
      .then(function (response) {
        localStorage.setItem("usuario", JSON.stringify(response.data));
        setUsuario(response.data);
        setUsuarioLogeado(true);
        setEmail("");
        setPass("");
        setID("");
        setApellidos("");
        setNombre("");
        toast.dismiss(toastID);
        tipo_usuario==="voluntario" ? navigate("/volunter") : navigate("/adult");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error en el servidor, intentelo de nuevo en otra ocasión.");
        toast.dismiss(toastID);
      });
  };

  return (
    <div className="Signup">
      <Header></Header>
      <Toaster />
      <div className="container">
        <div className="content">
          <div className="form">
            <h1>Sign Up</h1>
            <form onSubmit={registerHandler}>
              <div>
                <input
                  type="text"
                  placeholder="Nombres*"
                  required
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Apellidos*"
                  required
                  onChange={(e) => {
                    setApellidos(e.target.value);
                  }}
                />
              </div>
              <input
                type="email"
                placeholder="Correo Electrónico*"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Cédula*"
                required
                onChange={(e) => {
                  setID(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Crea una Contraseña*"
                required
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              <h2>La contraseña debe tener mínimo 8 caracteres</h2>
              <div className="btnUser">
                <p
                  className={flag ? "selected" : ""}
                  onClick={() => {
                    setFlag(true);
                  }}
                >
                  Voluntario
                </p>
                <p>O</p>
                <p
                  className={!flag ? "selected" : ""}
                  onClick={() => {
                    setFlag(false);
                  }}
                >
                  Adulto Mayor
                </p>
              </div>
              <input type="submit" value="Sign Up" />
            </form>
            <a
              href="#"
              onClick={() => {
                navigate("/portal");
              }}
            >
              o Inicia Sesión
            </a>
          </div>

          <div className="photos">
            <div className="elipse1">
              <img src={img4} alt="" />
            </div>
            <div className="elipse2">
              <img src={img3} alt="" />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export { Signup };
