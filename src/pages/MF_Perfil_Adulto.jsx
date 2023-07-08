import React from "react";
import axios from "axios";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Header } from "../components/Header_Adulto";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { GeneralContext } from "../context";
import "../sass/mf_perfil.scss";

function PerfilAdultoMayor() {
  const { usuario } = React.useContext(GeneralContext);
  const [nombre, setNombre] = React.useState(usuario.user.nombre);
  const [apellidos, setApellidos] = React.useState(usuario.user.apellidos);
  const [email, setEmail] = React.useState(usuario.user.email);
  const [direccion, setDireccion] = React.useState(usuario.user.direccion);
  const [edad, setEdad] = React.useState(usuario.user.edad);
  const [descripcion, setDescripcion] = React.useState(usuario.user.descripcion);
  const save = async () => {
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://wise-helper-backend.onrender.com/api/v1/auth/update/${usuario.user._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        nombre,
        apellidos,
        email,
        direccion,
        edad,
        descripcion,
      }),
    };

    await axios.request(config).then((response) => {});
  };
  const notify = () => {
    toast.promise(save(), {
      loading: "Actualizando Informacion...",
      success: <b>Informacion Actualizada</b>,
      error: <b>No se actualizar informacion.</b>,
    });
  };
  return (
    <div className="perfil-adulto-mayor--page-container">
      <Header></Header>
      <div className="container">
        <div className="perfil">
          <div className="perfil-datos--container" id="left--container">
            <div className="perfil-datos--container--titulo">
              <p>Datos</p>
              <hr />
            </div>
            <div className="perfil-datos--container--datos">
              <div className="perfil-datos--container--datos--detalle">
                <p>
                  Nombre:{" "}
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </p>
                <p>
                  Apellido:{" "}
                  <input
                    type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                  />
                </p>
                <p>
                  Email:{" "}
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </p>
                <p>
                  Direccion:{" "}
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </p>
                <p>
                  Edad:{" "}
                  <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </p>
                <p>Calificacion: {usuario.user.calificacion_general}</p>
                {/* <div className="ratings">
                  <StarRateRoundedIcon />
                  <StarRateRoundedIcon />
                  <StarRateRoundedIcon />
                  <StarRateRoundedIcon />
                  <StarRateRoundedIcon />
                </div> */}
              </div>
              <img src={usuario.user.img} alt="foto-perfil" />
            </div>
            <p className="descripcion-ayudante--title">
              Descripcion del Adulto Mayor
            </p>
            {/* A cotinuacion tenemos el input donde agregaremos la descripcion actual del adulto mayor en un text area */}
            <textarea
              name="descripcion"
              id="descripcion"
              cols="30"
              rows="5"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <button onClick={notify}>Actualizar Informacion</button>
          </div>

          <div className="perfil-resenias--container">
            <div className="resenias--container--titulo">
              <p>Reseñas</p>
              <hr />
            </div>
            <div className="resenias--container--resenias">
              {usuario.user.calificaciones.map((calificacion) => {
                return (
                  <div
                    className="resenias--inforesenia--container"
                    key={calificacion._id}
                  >
                    <img src={usuario.user.img} alt="foto-perfil-resenia" />
                    <p>calificacion comentario</p>
                    <span>{calificacion.calificacion}</span>
                    <div className="ratings">
                      <StarRateRoundedIcon />
                      <StarRateRoundedIcon />
                      <StarRateRoundedIcon />
                      <StarRateRoundedIcon />
                      <StarRateRoundedIcon />
                    </div>
                  </div>
                );
              })}
            </div>
            <button hidden>Agregar Reseña</button>
            <hr />
          </div>
        </div>
      </div>

      <Toaster />
      <Footer></Footer>
    </div>
  );
}

export { PerfilAdultoMayor };
