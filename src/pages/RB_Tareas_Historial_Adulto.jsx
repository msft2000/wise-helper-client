/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Header } from "../components/Header_Adulto";
import "../sass/rb_tarea_historial_adulto.scss";
import {AiFillFilter } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { RxCross2 } from "react-icons/rx";
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

      <div className="descripcion_tarea">
        <p>Descripción de la tarea</p>
        <p> {tarea.descripcion}</p>
      </div>
      
      <div className="chat_tarea">
        <p>Mensajes</p>
        <Chat />
      </div>

    </section>
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
        <td>{new Date(fila.createdAt).toJSON().slice(0, 10)}</td>
        <td>
          <p className={fila.estado.toLowerCase().replace(/ /g, "")}>
            {fila.estado}
          </p>
        </td>
        <td>
            <img src={fila.voluntario.img} alt={fila.voluntario.nombre}/>
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
              Fecha Publicación
            </div>
          </th>
          <th>
            <div>
              <AiFillFilter />
              Estado
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
    const data= response.data.tareas.filter(i => i.estado === 'Finalizada');
    let voluntario_a=[];
    data.forEach(tarea => {
      tarea.voluntario={};
      if(tarea.hasOwnProperty('id_voluntario') && !voluntario_a.includes(tarea.id_voluntario)) voluntario_a=[...voluntario_a,tarea.id_voluntario]
    });
    voluntario_a.map(a => getVoluntario(a,data));//Obtener los datos de los voluntarios por tarea
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

function TareasHistorialAdulto() {
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
    <div id="TareasHistorialA">
      <Header></Header>
      <Toaster></Toaster>
      <div className="containers" ref={refPanel}>
        <section className="tareas_content" style={{ display: tareasDisplay }}>
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

export { TareasHistorialAdulto };
