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
import {
  WeavyClient,
  WeavyProvider,
  Chat as WeavyChat,
} from "@weavy/uikit-react";
import "../css/weavy.css";
import { GeneralContext } from "../context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { render } from "react-dom";

const msg_finalizar_tarea =
  "Se finalizará la tarea seleccionada y no se podrán hacer cambios.";
const title_finalizar_tarea =
  "Está seguro en querer finalizar la tarea seleccionada?";
const msg_cancelar_tarea =
  "Se eliminará la tarea seleccionada y no podrá ser asignada ni seleccionada por un voluntario.";
const title_cancelar_tarea =
  "Está seguro en querer cancelar la tarea seleccionada?";
let ref = null;
/*Detalle de la tarea: Seccion que aparece cuando se da click sobre una tarea*/
async function eliminarChat(tarea,usuario){
  const toastID = toast.loading("Cancelando la Tarea...");
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_WEAVY_URL}/api/apps/${tarea.id_chat}`,
    headers: { 
      'Authorization': `Bearer ${process.env.REACT_APP_WEAVY_API}`
    }
  };

  axios.request(config)
  .then((response) => {
    //Se elimino el chat correctamente
    cancelarTarea(tarea._id,usuario.token,toastID);
  })
  .catch((error) => {
    console.log(error);
    toast.dismiss(toastID);
    toast.error("Error en el servidor. No se logro cancelar la tarea.");
  });
}

async function cancelarTarea(id_tarea,user_token,toastID){
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://wise-helper-backend.onrender.com/api/v1/tareas/delete/${id_tarea}`,
    headers: { 
      'Authorization': `Bearer ${user_token}`
    },
  };

  axios.request(config)
  .then((response) => {
    //Tarea eliminada correctamente
    ref.setAttribute("class", " ");
    ref.setAttribute("hidden", "");
    toast.dismiss(toastID);
    toast.success("Tarea Cancelada Correctamente!");
  })
  .catch((error) => {
    console.log(error);
    toast.dismiss(toastID);
    toast.error("Error en el servidor. No se logro cancelar la tarea.");
  });
}

async function finalizarTarea(id_tarea,user_token,navigate){
  const toastID = toast.loading("Finalizando la Tarea...");
  let data = JSON.stringify({
    "estado": "Finalizada"
  });

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `https://wise-helper-backend.onrender.com/api/v1/tareas/update/${id_tarea}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${user_token}`
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    //Tarea Finalizada
    ref.setAttribute("class", " ");
    ref.setAttribute("hidden", "");
    toast.dismiss(toastID);
    toast.success("Tarea Finalizada Correctamente!")
    navigate("/adult/finalizar");
  })
  .catch((error) => {
    console.log(error);
    toast.dismiss(toastID);
    toast.error("Error en el servidor. No se puede finalizar la tarea.")
  });
}

function Chat() {
  const { usuario, tarea } = React.useContext(GeneralContext);
  //Componente de chat entre el voluntario y el adulto mayor
  const weavyClient = new WeavyClient({
    url: process.env.REACT_APP_WEAVY_URL,
    tokenFactory: async () => usuario.user.token_chat,
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
      className={
        Object.keys(tarea.voluntario).length === 0
          ? "tarea_desc2"
          : "tarea_desc"
      }
      style={{ display: detalleDisplay }}
    >
      <section>
        <RxCross2 onClick={cerrar_detalle} />
      </section>

      {Object.keys(tarea.voluntario).length !== 0 ? (
        <div className="detalles_voluntario">
          <div className="detalles_voluntario__informacion">
            <img src={tarea.voluntario.img} alt={tarea.voluntario.nombre} />
            <div className="detalles_voluntario__datos">
              <p>{`${tarea.voluntario.nombre} ${tarea.voluntario.apellidos}`}</p>
              <p>Voluntario</p>
            </div>
          </div>
          <div className="detalles_voluntario__puntaje">
            <Rating
              value={parseFloat(tarea.voluntario.calificacion_general)}
              readOnly
              precision={0.5}
            />
            <p>{tarea.voluntario.calificacion_general}</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="descripcion_tarea">
        <p>Descripción de la tarea</p>
        <p> {tarea.descripcion}</p>
        <input
          type="button"
          value={
            Object.keys(tarea.voluntario).length === 0
              ? "Cancelar"
              : "Finalizar Tarea"
          }
          onClick={() => {
            setOpen(true);
          }}
        />
        <CuadroDialogo
          msg={
            Object.keys(tarea.voluntario).length === 0
              ? msg_cancelar_tarea
              : msg_finalizar_tarea
          }
          title={
            Object.keys(tarea.voluntario).length === 0
              ? title_cancelar_tarea
              : title_finalizar_tarea
          }
          flag={Object.keys(tarea.voluntario).length === 0 ? true : false}
        />
      </div>

      {Object.keys(tarea.voluntario).length !== 0 ? (
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
  const { setTareasDisplay, setDetalleDisplay, setSelectedIdx, open, setOpen, tarea, usuario } =
    React.useContext(GeneralContext);
  const navigate = useNavigate();

  const handleCancelarTarea = async () => {
    setOpen(false); //cerrar el cuadro de dialogo
    ref=document.querySelector("#TareasA tr.selected");
    await eliminarChat(tarea, usuario)
    setDetalleDisplay("none");
    setTareasDisplay("flex");
    setSelectedIdx(null);
  };

  const handleFinalizarTarea = async () => {
    setOpen(false); //cerrar el cuadro de dialogo
    ref=document.querySelector("#TareasA tr.selected");
    await finalizarTarea(tarea._id,usuario.token,navigate);
    setDetalleDisplay("none");
    setTareasDisplay("flex");
    setSelectedIdx(null);
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
  const {
    selectedIdx,
    refPanel,
    setDetalleDisplay,
    setTarea,
    setTareas,
    setSelectedIdx,
    setTareasDisplay,
    tareas,
  } = React.useContext(GeneralContext);

  const sorting=(idx,field)=>{
    if(idx===1){
      const tareas_sorted=tareas.sort((a,b)=>{
        if(a[field] < b[field]) return 1;
        else if(a[field]  > b[field]) return -1;
        return 0;
      });
      setTareas(tareas_sorted);
    }
    else{
      const tareas_sorted=tareas.sort((a,b)=>{
        let f_a=new Date(a[field]);
        let f_b=new Date(b[field]);
        if( f_a > f_b) return 1;
        else if(f_a < f_b) return -1;
        return 0;
      });
      console.log(tareas_sorted)
      setTareas(tareas_sorted);
    }
  }
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

  let tareas_e=tareas.map((fila, index) => {
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
          {Object.keys(fila.voluntario).length===0 ? (
            <></>
          ) : (
            <img src={fila.voluntario.img} alt={fila.voluntario.nombre}/>
          )}
        </td>
      </tr>
    );
});

  return (
    <table>
      <thead>
        <tr>
          <th onClick={()=>{sorting(1,"titulo")}}>
            <div>
              <AiFillFilter /> Tarea
            </div>
          </th>
          <th onClick={()=>{sorting(2,"fecha_limite")}}>
            <div>
              <AiFillFilter />
              Fecha Límite
            </div>
          </th>
          <th onClick={()=>{sorting(1,"estado")}}>
            <div>
              <AiFillFilter />
              Estado
            </div>
          </th>
          <th onClick={()=>{sorting(2,"duracion")}}>
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

async function getVoluntario(id_voluntario,tareas) {
  const config = {
    headers: {
      "content-type": "application/json",
    }
  };
  try{
    const response= await axios.get(`https://wise-helper-backend.onrender.com/api/v1/auth/user/${id_voluntario}`, config);
    tareas.forEach(tarea => {
      if(tarea.id_voluntario===id_voluntario){
        tarea.voluntario=response.data.user;
      }
    });
  }
  catch(error){
    console.log(error);
  }
}

async function getTareas(user_id, user_token, setTareas) {
  const toastID = toast.loading("Cargando Tareas...");
  const config = {
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${user_token}`,
    }
  };
  try{
    const response= await axios.get(`https://wise-helper-backend.onrender.com/api/v1/tareas/get-tareas-by-user/adulto_mayor/${user_id}`, config);
    const data= response.data.tareas.filter(i => i.estado !== 'Finalizada');
    let voluntario_a=[];
    data.forEach(tarea => {
      tarea.voluntario={};
      if(tarea.hasOwnProperty('id_voluntario') && !voluntario_a.includes(tarea.id_voluntario)) voluntario_a=[...voluntario_a,tarea.id_voluntario]
    });
    voluntario_a.map(a => getVoluntario(a,data));
    //localStorage.setItem("tarea", JSON.stringify(data));
    setTareas(data);
    toast.dismiss(toastID);
    toast.success("Tareas Cargadas con éxito");
    return;
  }
  catch(error){
    console.log(error);
    toast.error("Error en el servidor. Intentelo de nuevo en otra ocasión.");
    toast.dismiss(toastID);
    return;
  }
}

function TareasAdulto() {
  const navigate = useNavigate();
  const { refPanel, tareasDisplay, tarea, setTareas, usuario } = React.useContext(GeneralContext);
  let effect_exe=0;//Control de ejecuciones de useEffect

  React.useEffect(()=>{
    if(effect_exe===0){
      // Código a ejecutar después de la carga de la página
      getTareas(usuario.user._id, usuario.token,setTareas);
      effect_exe=1;
    }
  },[]);

  return (
    <div id="TareasA">
      <Header></Header>
      <Toaster></Toaster>
      <div className="containers" ref={refPanel}>
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

export { TareasAdulto };
