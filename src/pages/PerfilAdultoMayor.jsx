import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/PerfilAdultoMayor.css";
import adultoMayor from "../assets/img/adultoMayor-hombre.png";
import mujerResenia from "../assets/img/resenia-ujer.png";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Navbar } from "../components/Navbar";

function PerfilAdultoMayor() {
    const  navigate  = useNavigate();
    return (
        <div id="perfil-adulto-mayor--page-container">
            <Navbar flag={3}/>
            <div className="perfil-datos--container">
                
                <div className="perfil-datos--container--titulo">
                    <p>Datos</p>
                    <hr />
                </div>
                <div className="perfil-datos--container--datos">
                    <div className="perfil-datos--container--datos--detalle">
                        <p>
                            Nombre: <span>Juan Garcia</span>
                        </p>
                        <p>
                            Direccion: <span>Rio Sol, 3-14</span>
                        </p>
                        <p>
                            Edad: <span>34</span>
                        </p>
                        <p>
                            Contacto: <span>0987654321</span>
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
                <button >Actualizar Informacion</button>
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
                <button>Agregar Reseña</button>
                <p>Mateo Flores</p>
                <hr/>
            </div>
        </div>
    );
}

export { PerfilAdultoMayor };
