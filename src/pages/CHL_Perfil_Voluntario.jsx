import React from "react";
import "../sass/mf_perfil.scss";
import adultoMayor from "../assets/img/adultoMayor-hombre.png";
import mujerResenia from "../assets/img/resenia-ujer.png";
import { Header } from "../components/Header_Voluntario";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

import Rating from "@mui/material/Rating";

function PerfilVoluntario() {
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
                  Nombre: <input defaultValue={"Martha Garcia"} />
                </p>
                <p>
                  Direccion: <input defaultValue={"Rio Sol, 3-14"} />
                </p>
                <p>
                  Edad: <input defaultValue={"37"} />
                </p>
                <p>
                  Contacto: <input defaultValue={"0987654321"} />
                </p>
                <p>
                  Calificacion: <span>4.0</span>
                </p>
                <div>
                  <Rating value={parseFloat(4)} readOnly precision={0.5} />
                </div>
              </div>
              <img src={mujerResenia} alt="foto-perfil" />
            </div>
            <p className="descripcion-ayudante--title">
              Descripcion del Voluntario
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
              <img src={adultoMayor} alt="foto-perfil-resenia" />
              <p>
                Lorem ipsum sum man sop pium pam pum ajsdak aksdjak dk asjda
                lasdjasd lasdasdl alskd alsdk asldka lsd
              </p>
              <div>
                <Rating value={parseFloat(4)} readOnly precision={0.5} />
              </div>
            </div>
            <div className="resenias--inforesenia--container">
              <img src={adultoMayor} alt="foto-perfil-resenia" />
              <p>
                Lorem ipsum sum man sop pium pam pum ajsdak aksdjak dk asjda
                lasdjasd lasdasdl alskd alsdk asldka lsd
              </p>
              <div>
                <Rating value={parseFloat(4)} readOnly precision={0.5} />
              </div>
            </div>
            <div className="resenias--inforesenia--container">
              <img src={adultoMayor} alt="foto-perfil-resenia" />
              <p>
                Lorem ipsum sum man sop pium pam pum ajsdak aksdjak dk asjda
                lasdjasd lasdasdl alskd alsdk asldka lsd
              </p>
              <div>
                <Rating value={parseFloat(4)} readOnly precision={0.5} />
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

export { PerfilVoluntario };
