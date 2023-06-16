import React from "react";
import "../sass/mf_perfil_adulto.scss";
import adultoMayor from "../assets/img/adultoMayor-hombre.png";
import mujerResenia from "../assets/img/resenia-ujer.png";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Header } from "../components/Header_Adulto";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

function PerfilAdultoMayor() {
  const save = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  const notify = () => {
    // toast.success("Informacion Actualizada");
    toast.promise(save(), {
      loading: "Actualizando Informacion...",
      success: <b>Informacion Actualizada</b>,
      error: <b>Could not save.</b>,
    });
  };
  return (
    <div className="perfil-adulto-mayor--page-container">
      <Header></Header>
      <div className="container">
        {/* Contenido de tu pagina web aqui */}
        <div className="perfil">
          <div className="perfil-datos--container">
            <div className="perfil-datos--container--titulo">
              <p>Datos</p>
              <hr />
            </div>
            <div className="perfil-datos--container--datos">
              <div className="perfil-datos--container--datos--detalle">
                <p>
                  Nombre: <input defaultValue={"Juan Garcia"} />
                </p>
                <p>
                  Direccion: <input defaultValue={"Rio Sol, 3-14"} />
                </p>
                <p>
                  Edad: <input defaultValue={"70"} />
                </p>
                <p>
                  Contacto: <input defaultValue={"0987654321"} />
                </p>
                <p>
                  Calificacion: <span>5.0</span>
                </p>
                <div className="ratings">
                  <StarRateRoundedIcon />
                  <StarRateRoundedIcon />
                  <StarRateRoundedIcon />
                  <StarRateRoundedIcon />
                  <StarRateRoundedIcon />
                </div>
              </div>
              <img src={adultoMayor} alt="foto-perfil" />
            </div>
            <p className="descripcion-ayudante--title">
              Descripcion del Adulto Mayor
            </p>
            {/* A cotinuacion tenemos el input donde agregaremos la descripcion actual del adulto mayor en un text area */}
            <textarea name="descripcion" id="descripcion" cols="30" rows="5">
              Lorem ipmsum nol
            </textarea>
            <button onClick={notify}>Actualizar Informacion</button>
          </div>
          <div className="perfil-resenias--container">
            <div className="resenias--container--titulo">
              <p>Reseñas</p>
              <hr />
            </div>
            <div className="resenias--inforesenia--container">
              <img src={mujerResenia} alt="foto-perfil-resenia" />
              <p>
                Lorem ipsum sum man sop pium pam pum ajsdak aksdjak dk asjda
                lasdjasd lasdasdl alskd alsdk asldka lsd
              </p>
              <div className="ratings">
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
              </div>
            </div>
            <div className="resenias--inforesenia--container">
              <img src={mujerResenia} alt="foto-perfil-resenia" />
              <p>
                Lorem ipsum sum man sop pium pam pum ajsdak aksdjak dk asjda
                lasdjasd lasdasdl alskd alsdk asldka lsd
              </p>
              <div className="ratings">
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
              </div>
            </div>
            <div className="resenias--inforesenia--container">
              <img src={mujerResenia} alt="foto-perfil-resenia" />
              <p>
                Lorem ipsum sum man sop pium pam pum ajsdak aksdjak dk asjda
                lasdjasd lasdasdl alskd alsdk asldka lsd
              </p>
              <div className="ratings">
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
                <StarRateRoundedIcon />
              </div>
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
