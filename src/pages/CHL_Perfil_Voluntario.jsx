import React from "react";
import axios from "axios";
import { Header } from "../components/Header_Voluntario";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { GeneralContext } from "../context";
import Rating from "@mui/material/Rating";
import "../sass/mf_perfil.scss";

function PerfilVoluntario() {
  const { usuarioV, setUsuarioV } = React.useContext(GeneralContext);
  const [nombre, setNombre] = React.useState(usuarioV.user.nombre);
  const [apellidos, setApellidos] = React.useState(usuarioV.user.apellidos);
  const [email, setEmail] = React.useState(usuarioV.user.email);
  const [direccion, setDireccion] = React.useState(
    usuarioV.user.direccion.includes("%")
      ? usuarioV.user.direccion.split("%")[0]
      : usuarioV.user.direccion
  );
  const [edad, setEdad] = React.useState(usuarioV.user.edad);
  const [descripcion, setDescripcion] = React.useState(usuarioV.user.descripcion);
  const [img, setImg] = React.useState(undefined);
  const save = async (direccionActualizada) => {
    let objetoAEnviar = {
      nombre,
      apellidos,
      email,
      direccion: direccionActualizada,
      edad,
      descripcion,
    };
    if (img) {
      const formData = new FormData();
      formData.append("image", img);
      try {
        const {
          data: {
            image: { src },
          },
        } = await axios.post(
          "https://wise-helper-backend.onrender.com/api/v1/auth/img-upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        objetoAEnviar = {
          ...objetoAEnviar,
          img: src,
        };
        console.log(objetoAEnviar);
      } catch (error) {
        console.log(error);
      }
    }
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://wise-helper-backend.onrender.com/api/v1/auth/update/${usuarioV.user._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(objetoAEnviar),
    };

    await axios
      .request(config)
      .then((response) => {
        let auxObj = {
          user: response.data.user,
          token: usuarioV.token,
        };
        localStorage.setItem("usuario", JSON.stringify(auxObj));
        setUsuarioV(auxObj);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const calculoCoordenadas = async () => {
    if (direccion.includes("%")) {
      let aux = direccion.split("%");
      await setDireccion(aux[0]);
    }
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.mymappi.com/v2/geocoding/direct?apikey=1ea60b6e-dfcd-4aea-866c-73583c5e199e&country_code=ECU&limit=1&q=${direccion}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        save(
          `${direccion}%${response.data.data[0].lat}%${response.data.data[0].lon}`
        );
      })
      .catch((error) => {
        toast.error("Error al encontrar la direccion");
      });
  };
  const notify = () => {
    toast.promise(calculoCoordenadas(), {
      loading: "Actualizando Informacion...",
      success: <b>Informacion Actualizada</b>,
      error: <b>No se actualizar informacion.</b>,
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
                    type="email"
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
                <p>
                  Nueva Foto de Perfil:{" "}
                  <input type="file" style={{width: "100%"}} onChange={(e) => setImg(e.target.files[0])} />
                </p>
                <p>Calificacion: {usuarioV.user.calificacion_general}</p>
                <div>
                  <Rating value={usuarioV.calificacion_general} readOnly precision={0.05} />
                </div>
              </div>
              <img src={usuarioV.user.img} alt="foto-perfil" />
            </div>
            <p className="descripcion-ayudante--title">
              Descripcion del Voluntario
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
              {usuarioV.user.calificaciones.length > 0 ? (
                usuarioV.user.calificaciones.map((calificacion) => {
                  return (
                    <div
                      className="resenias--inforesenia--container"
                      key={calificacion._id}
                    >
                      <img src={usuarioV.user.img} alt="foto-perfil-resenia" />
                      <p>{calificacion.comentario}</p>
                      <span>{calificacion.calificacion}</span>
                      <div>
                        <Rating value={calificacion.calificacion} readOnly precision={0.05} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2 style={{ textAlign: "center" }}>Sin Calificaciones Aun</h2>
              )}
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
