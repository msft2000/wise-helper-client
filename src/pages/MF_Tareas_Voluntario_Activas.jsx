/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Header } from "../components/Header_Voluntario";
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
import {
  WeavyClient,
  WeavyProvider,
  Chat as WeavyChat,
} from "@weavy/uikit-react";
import "@weavy/uikit-react/dist/css/weavy.css";
import { GeneralContext } from "../context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const msg_finalizar_tarea =
  "Se finalizará la tarea seleccionada y no se podrán hacer cambios.";
const title_finalizar_tarea =
  "Está seguro en querer finalizar la tarea seleccionada?";

/*Detalle de la tarea: Seccion que aparece cuando se da click sobre una tarea*/

function Chat() {
  const { usuarioV, tarea } = React.useContext(GeneralContext);
  //Componente de chat entre el voluntario y el adulto mayor
  const weavyClient = new WeavyClient({
    url: process.env.REACT_APP_WEAVY_URL,
    tokenFactory: async () => usuarioV.user.token_chat,
  });
  return (
    <div className="msgs">
      <WeavyProvider client={weavyClient}>
        <WeavyChat uid={`chatTarea-${tarea._id}`} features={{thumbnails:false, previews: false, cloudFiles: false, mentions: false, polls: false, reactions: false, meetings: false }}/>
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
    <section
      className={"tarea_desc"}
      style={{ display: detalleDisplay }}
    >
      <section>
        <RxCross2 onClick={cerrar_detalle} />
      </section>

      <div className="detalles_voluntario">
        <div className="detalles_voluntario__informacion">
          <img src={tarea.adulto.img} alt={tarea.adulto.nombre} />
          <div className="detalles_voluntario__datos">
            <p>{`${tarea.adulto.nombre} ${tarea.adulto.apellidos}`}</p>
            <p></p>
          </div>
        </div>
        <div className="detalles_voluntario__puntaje">
          <Rating
            value={parseFloat(tarea.adulto.calificacion_general)}
            readOnly
            precision={0.5}
          />
          <p>{tarea.adulto.calificacion_general}</p>
        </div>
      </div>
      <div className="descripcion_tarea">
        <p>Descripción de la tarea</p>
        <p> {tarea.descripcion}</p>
        {tarea.estado === "En Proceso" ? (
          <input
            type="button"
            value={"Finalizar Tarea"}
            onClick={() => {
              setOpen(true);
            }}
          />
        ) : (
          <></>
        )}
        <CuadroDialogo
          msg={msg_finalizar_tarea}
          title={title_finalizar_tarea}
        />
      </div>
      <div className="chat_tarea">
        <p>Mensajes</p>
        <Chat />
      </div>
    </section>
  );
}

function CuadroDialogo({ msg, title }) {
  const {open, setOpen } =
    React.useContext(GeneralContext);
  const navigate = useNavigate();

  const handleFinalizarTarea = () => {
    setOpen(false); //cerrar el cuadro de dialogo
    /*Actualizar el estado en la base de datos*/
    navigate("/volunter/tareas/finalizar");
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
            handleFinalizarTarea();
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
  const {
    selectedIdx,
    refPanel,
    setDetalleDisplay,
    setTarea,
    setSelectedIdx,
    setTareasDisplay,
    tareas,
  } = React.useContext(GeneralContext);

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
      <tr
        className={index === selectedIdx ? "selected" : ""}
        onClick={() => {
          handleOnClickFila(fila, index);
        }}
        key={fila._id}
      >
        <td>{fila.titulo}</td>
        <td>{new Date(fila.fecha_limite).toJSON().slice(0, 10)}</td>
        <td>
          <p className={fila.estado.toLowerCase().replace(/ /g, "")}>
            {fila.estado}
          </p>
        </td>
        <td>{fila.duracion}</td>
        <td>
          {typeof fila.adulto === "undefined" ? (
            ""
          ) : (
            <img src={fila.adulto.img} />
          )}
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
          <th>Solicitante</th>
        </tr>
      </thead>
      <tbody>{tareas_e}</tbody>
    </table>
  );
}

async function getAdulto(id_adulto, tareas) {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const response = await axios.get(
      `https://wise-helper-backend.onrender.com/api/v1/auth/user/${id_adulto}`,
      config
    );
    tareas.forEach((tarea) => {
      if (tarea.id_adulto_mayor === id_adulto) {
        tarea.adulto = response.data.user;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function getTareas(user_id, user_token, setTareas) {
  const toastID = toast.loading("Cargando Tareas...");
  // let data = JSON.stringify({
  //   "tipo": "voluntario",
  // });
  
  // let config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: `https://wise-helper-backend.onrender.com/api/v1/tareas/get-tareas-by-user/${user_id}`,
  //   headers: { 
  //     'Content-Type': 'application/json', 
  //     'Authorization': `Bearer ${user_token}`
  //   },
  //   data : data
  // };

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://wise-helper-backend.onrender.com/api/v1/tareas/all',
    headers: { 
      'Authorization': `Bearer ${user_token}`
    },
    data : ''
  };
  
  axios.request(config)
  .then((response) => {
    const data = response.data.tareas.filter((i) => i.estado !== "Activa" && i.id_voluntario===user_id);
    console.log(data);
    let adulto_a = [];
    data.forEach((tarea) => {
      tarea.adulto = {};
      if (!adulto_a.includes(tarea.id_adulto_mayor))
        adulto_a = [...adulto_a, tarea.id_adulto_mayor];
    });
    adulto_a.map(async (a) => {
      await getAdulto(a, data);
    });
    localStorage.setItem("tarea", JSON.stringify(data));
    setTareas(data);
    toast.dismiss(toastID);
    toast.success("Tareas Cargadas con éxito");
  })
  .catch((error) => {
    console.log(error);
    toast.error("Error en el servidor. Intentelo de nuevo en otra ocasión.");
    toast.dismiss(toastID);
  });
  
  
  
  
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${user_token}`,
  //   },
  //   data: JSON.stringify({
  //     "tipo": "voluntario"
  //   })
  // };
  // try {
  //   const response = await axios.get(
  //     `https://wise-helper-backend.onrender.com/api/v1/tareas/get-tareas-by-user/${user_id}`,
  //     config
  //   );
  //   console.log(response.data);
  //   const data = response.data.tareas.filter((i) => i.estado !== "Activa");
  //   let adulto_a = [];
  //   data.forEach((tarea) => {
  //     tarea.adulto = {};
  //     if (!adulto_a.includes(tarea.id_adulto_mayor))
  //       adulto_a = [...adulto_a, tarea.id_adulto_mayor];
  //   });
  //   adulto_a.map(async (a) => {
  //     await getAdulto(a, data);
  //   });
  //   localStorage.setItem("tarea", JSON.stringify(data));
  //   setTareas(data);
  //   toast.dismiss(toastID);
  //   toast.success("Tareas Cargadas con éxito");
  // } catch (error) {
  //   console.log(error);
  //   toast.error("Error en el servidor. Intentelo de nuevo en otra ocasión.");
  //   toast.dismiss(toastID);
  // }
}

function TareasActivas() {
  const { refPanel, tareasDisplay, tarea, setTareas, usuarioV } =
    React.useContext(GeneralContext);
  let effect_exe = 0; //Control de ejecuciones de useEffect

  React.useEffect(() => {
    if (effect_exe === 0) {
      // Código a ejecutar después de la carga de la página
      getTareas(usuarioV.user._id, usuarioV.token, setTareas);
      effect_exe = 1;
    }
  }, []);

  return (
    <div id="TareasA">
      <Header></Header>
      <Toaster></Toaster>
      <div className="containers" ref={refPanel}>
        <section className="tareas_content" style={{ display: tareasDisplay }}>
          <div className="btns" style={{display:"none"}}>
            <div className="agregar">
              <AiOutlinePlus />
              <p></p>
            </div>
          </div>

          <div className="tables">
            <Tabla />
          </div>
        </section>
        {tarea !== null ? <Detalle /> : <></>}
      </div>

      <Footer></Footer>
    </div>
  );
}

export { TareasActivas };
