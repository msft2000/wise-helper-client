/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Header } from "../components/Header_Adulto";
import "../sass/rb_tarea_adulto.scss";
import { AiOutlinePlus, AiFillFilter } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Footer } from "../components/Footer";
import { WeavyClient, WeavyProvider, Chat as WeavyChat } from "@weavy/uikit-react";
import "@weavy/uikit-react/dist/css/weavy.css";
import data from "../assets/json/data_adulto.json"; //Archivo con los datos de tareas
import { GeneralContext } from "../context";
import ax from "axios";
import toast, { Toaster } from "react-hot-toast";

const cargar_img = require.context("../assets/img", true);

const msg_finalizar_tarea = "Se finalizará la tarea seleccionada y no se podrán hacer cambios.";
const title_finalizar_tarea = "Está seguro en querer finalizar la tarea seleccionada?";
const msg_cancelar_tarea = "Se eliminará la tarea seleccionada y no podrá ser asignada ni seleccionada por un voluntario.";
const title_cancelar_tarea = "Está seguro en querer cancelar la tarea seleccionada?";

/*Detalle de la tarea: Seccion que aparece cuando se da click sobre una tarea*/

function Chat() {
  const { usuario, tarea } = React.useContext(GeneralContext);
  //Componente de chat entre el voluntario y el adulto mayor
  const weavyClient = new WeavyClient({
    url: process.env.REACT_APP_WEAVY_URL,
    tokenFactory: async () => usuario.token_chat,
  });
  console.log(process.env.REACT_APP_WEAVY_URL);
  return (
    <div className="msgs">
      <WeavyProvider client={weavyClient}>
        <WeavyChat uid={tarea._id} />
      </WeavyProvider>
    </div>
  );
}

function Detalle() {
  const {
    setSelectedIdx,
    setTareasDisplay,
    detalleDisplay,
    setDetalleDisplay,
    tarea,
    setOpen,
  } = React.useContext(GeneralContext);

  const cerrar_detalle = () => {
    //Funcion ejecutada cuando se presiona X en el detalle
    setDetalleDisplay("none"); //Se cierra el detalle de la tarea
    setSelectedIdx(null); //Se deselecciona la tarea
    setTareasDisplay("flex"); //Se muestra la lista de tareas
  };

  return (
    <section className={tarea.id_voluntario ? "tarea_desc2" : "tarea_desc"} style={{ display: detalleDisplay }}>
      <section>
        <RxCross2 onClick={cerrar_detalle} />
      </section>

      {tarea.id_voluntario ? (
        <div className="detalles_voluntario">
          <div className="detalles_voluntario__informacion">
            <img src={tarea.voluntario.img} alt={tarea.voluntario.nombre} />
            <div className="detalles_voluntario__datos">
              <p>{`${tarea.voluntario.nombre} ${tarea.voluntario.apellidos}`}</p>
              <p>Voluntario</p>
            </div>
          </div>
          <div className="detalles_voluntario__puntaje">
            <Rating value={parseFloat(tarea.voluntario.calificacion_general)} readOnly precision={0.5} />
            <p>{tarea.voluntario.calificacion_general}</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="descripcion_tarea">
        <p>Descripción de la tarea</p>
        <p> {tarea.tarea_desc}</p>
        <input
          type="button"
          value={tarea.voluntario === "" ? "Cancelar" : "Finalizar Tarea"}
          onClick={() => {
            setOpen(true);
          }}
        />
        <CuadroDialogo
          msg={
            tarea.voluntario === "" ? msg_cancelar_tarea : msg_finalizar_tarea
          }
          title={
            tarea.voluntario === ""
              ? title_cancelar_tarea
              : title_finalizar_tarea
          }
          flag={tarea.voluntario === "" ? true : false}
        />
      </div>

      {tarea.voluntario !== "" ? (
        <div className="chat_tarea">
          <p>Mensajes</p>
          <Chat />
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

function CuadroDialogo({ msg, title, flag }) {
  const { setTareasDisplay, setDetalleDisplay, setSelectedIdx, open, setOpen } =
    React.useContext(GeneralContext);
  const navigate = useNavigate();

  const handleCancelarTarea = () => {
    setOpen(false); //cerrar el cuadro de dialogo
    /*Eliminar de la base de datos*/
    const ref = document.querySelector("div.TareasA tr.selected"); //fila seleccionada
    ref.setAttribute("class", " ");
    ref.setAttribute("hidden", "");
    ref.setAttribute("class", " ");
    setDetalleDisplay("none");
    setTareasDisplay("flex");
    setSelectedIdx(null);
  };

  const handleFinalizarTarea = () => {
    setOpen(false); //cerrar el cuadro de dialogo
    /*Actualizar el estado en la base de datos*/
    navigate("/adult/finalizar");
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            flag ? handleCancelarTarea() : handleFinalizarTarea();
          }}
          color="primary"
          autoFocus
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Tabla() {
  const { selectedIdx, refPanel, setDetalleDisplay, setTarea, setSelectedIdx, setTareasDisplay, tareas} = React.useContext(GeneralContext);
  
  const handleOnClickFila = (tarea, index) => {
    if (selectedIdx === index) {
      //Deseleccionar un elemento ya seleccionado
      setSelectedIdx(null);
      setDetalleDisplay("none");
      setTarea(null);
    } else {
      //Seleccionar un elemento
      setSelectedIdx(index);
      setTarea(tarea);
      setDetalleDisplay("flex");

      if (parseFloat(refPanel.current.offsetWidth) <= 1006) {
        //Ocultar las tareas cuando se usa la versión movil
        setTareasDisplay("none");
      }
    }
  };

  const tareas_e = tareas.map((fila, index) => {
    //Recorrido de todas las tareas de los datos obtenidos y creación de cada tarea
    return (
      <tr className={index === selectedIdx ? "selected" : ""} onClick={() => { handleOnClickFila(fila, index); }}>
        <td>{fila.titulo}</td>
        <td>{fila.fecha_limite}</td>
        <td>
          <p className={fila.estado.toLowerCase().replace(/ /g, "")}>
            {fila.estado}
          </p>
        </td>
        <td>{fila.duracion}</td>
        <td>
          {fila.id_voluntario ? "" : <img src={fila.voluntario.img} />}
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>
            <div>
              <AiFillFilter /> Tarea
            </div>
          </th>
          <th>
            <div>
              <AiFillFilter />
              Fecha Límite
            </div>
          </th>
          <th>
            <div>
              <AiFillFilter />
              Estado
            </div>
          </th>
          <th>
            <div>
              <AiFillFilter />
              Tiempo Estimado
            </div>
          </th>
          <th>Voluntario Asignado</th>
        </tr>
      </thead>
      <tbody>{tareas_e}</tbody>
    </table>
  );
}

function getVoluntario(id_voluntario,user_token){
  const config = {
    method: "GET",
    url: `https://wise-helper-backend.onrender.com/api/v1/auth/user`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user_token}`
    },
    data: JSON.stringify({userID: id_voluntario})
  };

  ax(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {};
    });
}

function getTareas(user_id,user_token) {
  const toastID = toast.loading("Cargando Tareas...");
  const config = {
    method: "GET",
    url: `https://wise-helper-backend.onrender.com/api/v1/tareas/get-tareas-by-user/${user_id}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user_token}`
    }
  };
  ax(config)
    .then(function (response) {
      let data=response.data.tareas;
      data.forEach(tarea => {
        if(tarea.id_voluntario){
          tarea.voluntario=getVoluntario(tarea.id_voluntario,user_token);
        }
        else{
          tarea.voluntario={};
        }
      });
      localStorage.setItem("tarea", JSON.stringify(data));
      toast.dismiss(toastID);
      toast.success("Tareas Cargadas con éxito");
    })
    .catch(function (error) {
      console.log(error);
      toast.error("Error en el servidor. Intentelo de nuevo en otra ocasión.");
      toast.dismiss(toastID);
    });
}

function TareasAdulto() {
  const navigate = useNavigate();
  const { refPanel, tareasDisplay, tarea, tareas, setTareas, usuario} =
    React.useContext(GeneralContext);
  
  // React.useEffect(() => {
  //   getTareas(usuario.user._id,usuario.token);
  //   setTareas(localStorage.getItem("tarea"));
  // }, []);

  getTareas(usuario.user._id,usuario.token);
  setTareas(JSON.parse(localStorage.getItem("tarea")));

  return (
    <div className="TareasA">
      <Header></Header>
      <Toaster></Toaster>
      <div className="container" ref={refPanel}>
        <section className="tareas_content" style={{ display: tareasDisplay }}>
          <div className="btns">
            <div
              className="agregar"
              onClick={() => navigate("/adult/agregar-tarea")}
            >
              <AiOutlinePlus />
              <p>Agregar Tarea</p>
            </div>
          </div>

          <div className="table">
            {/* <Tabla /> */}
          </div>
        </section>
        {tarea !== null ? <Detalle /> : <></>}
      </div>

      <Footer></Footer>
    </div>
  );
}

export { TareasAdulto };
