/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
import "../css/weavy.css";
import { GeneralContext } from "../context";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MdLocationOn } from "react-icons/md";

const msg_finalizar_tarea =
  "Se finalizará la tarea seleccionada y no se podrán hacer cambios.";
const title_finalizar_tarea =
  "Está seguro en querer finalizar la tarea seleccionada?";
let ref = null;
/*Detalle de la tarea: Seccion que aparece cuando se da click sobre una tarea*/

function Chat() {
  const { usuarioV, tareaV } = React.useContext(GeneralContext);
  //Componente de chat entre el voluntario y el adulto mayor
  const weavyClient = new WeavyClient({
    url: process.env.REACT_APP_WEAVY_URL,
    tokenFactory: async () => usuarioV.user.token_chat,
  });
  return (
    <div className="msgs">
      <WeavyProvider client={weavyClient}>
        <WeavyChat uid={`chatTarea-${tareaV._id}`} features={{thumbnails:false, previews: false, cloudFiles: false, mentions: false, polls: false, reactions: false, meetings: false }}/>
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
    tareaV,
    setOpen,
  } = React.useContext(GeneralContext);

  var myIcon = L.icon({//Icono de punto en el mapa
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131546.png',
    iconRetinaUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131546.png',
    popupAnchor:  [-0, -0],
    iconSize: [32,40], 
  });

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
          <img src={tareaV.adulto.img} alt={tareaV.adulto.nombre} />
          <div className="detalles_voluntario__datos">
            <p>{`${tareaV.adulto.nombre} ${tareaV.adulto.apellidos}`}</p>
            <p></p>
          </div>
        </div>
        <div className="detalles_voluntario__puntaje">
          <Rating
            value={parseFloat(tareaV.adulto.calificacion_general)}
            readOnly
            precision={0.1}
          />
          <p>{Math.round(parseFloat(tareaV.adulto.calificacion_general)*10)/10}</p>
        </div>
      </div>
      <div className="descripcion_tarea">
        <p>Descripción de la tarea</p>
        <p> {tareaV.descripcion}</p>
        {tareaV.estado === "En Proceso" ? (
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

      <div className="ubicacion">
        <p>Ubicación</p>

        <div>
          <MdLocationOn />
          {
            tareaV.adulto.direccion.split("%").length === 3 ?
            <p style={{cursor:"pointer"}} onClick={()=>window.open(`https://www.openstreetmap.org/?mlat=${tareaV.adulto.direccion.split("%")[1]}&mlon=${tareaV.adulto.direccion.split("%")[2]}`,'_blank')}>{tareaV.adulto.direccion.split("%")[0]}</p> :
            <p>Aún no se define una dirección</p>
          }
        </div>

        {
          tareaV.adulto.direccion.split("%").length === 3 ? <div className="mapaApi">
          <MapContainer center={[parseFloat(tareaV.adulto.direccion.split("%")[1]), parseFloat(tareaV.adulto.direccion.split("%")[2])]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker icon={myIcon} position={[parseFloat(tareaV.adulto.direccion.split("%")[1]), parseFloat(tareaV.adulto.direccion.split("%")[2])]}>
              </Marker>
          </MapContainer>
          </div> : <></>
        }
      </div>

      <div className={tareaV.estado==="Finalizada" ? "chat_tarea finalizada" :"chat_tarea"}>
        <p>Mensajes</p>
        <Chat />
      </div>
    </section>
  );
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
    toast.dismiss(toastID);
    toast.success("Tarea Finalizada Correctamente!");
    navigate("/volunter/tareas/finalizar");
  })
  .catch((error) => {
    console.log(error);
    toast.dismiss(toastID);
    toast.error("Error en el servidor. No se puede finalizar la tarea.");
    return null;
  });
}


function CuadroDialogo({ msg, title }) {
  const {setTareasDisplay, setDetalleDisplay, setSelectedIdx, open, setOpen, tareaV, usuarioV } =
    React.useContext(GeneralContext);
  const navigate = useNavigate();

  const handleFinalizarTarea = async () => {
    setOpen(false); //cerrar el cuadro de dialogo
    /*Actualizar el estado en la base de datos*/
    ref=document.querySelector("#TareasA tr.selected");
    const res=await finalizarTarea(tareaV._id,usuarioV.token,navigate);
    if(res===null){
      setDetalleDisplay("none");
      setTareasDisplay("flex");
      setSelectedIdx(null);
    }
    
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
    setTareaV,
    setSelectedIdx,
    setTareasDisplay,
    tareasV,
    setTareasV
  } = React.useContext(GeneralContext);

  const [sort_type,setSortType]=React.useState(1);

  const handleOnClickFila = (tarea, index) => {
    if (selectedIdx === index) {
      //Deseleccionar un elemento ya seleccionado
      setSelectedIdx(null);
      setDetalleDisplay("none");
      setTareaV(null);
    } else {
      //Seleccionar un elemento
      setSelectedIdx(index);
      setTareaV(tarea);
      setDetalleDisplay("flex");

      if (parseFloat(refPanel.current.offsetWidth) <= 1006) {
        //Ocultar las tareas cuando se usa la versión movil
        setTareasDisplay("none");
      }
    }
  };

  const sorting=(idx,field)=>{
    setDetalleDisplay("none");
    let tareas_copy=[...tareasV];
    let tareas_sorted=[];
    if(idx===1){
      tareas_sorted=tareas_copy.sort((a,b)=>{
        if(a[field].toLowerCase() < b[field].toLowerCase()) return 1 * sort_type;
        else if(a[field].toLowerCase()  > b[field].toLowerCase()) return -1 * sort_type;
        return 0;
      });
      setSortType(-1*sort_type);
    }
    else if(idx===2){
      tareas_sorted=tareas_copy.sort((a,b)=>{
        let f_a=new Date(a[field]);
        let f_b=new Date(b[field]);
        if( f_a > f_b) return 1 * sort_type;
        else if(f_a < f_b) return -1 * sort_type;
        return 0;
      });
      setSortType(-1*sort_type);
    }
    else{
      tareas_sorted=tareas_copy.sort((a,b)=>{
        let f_a=a[field].split(":");
        let f_b=b[field].split(":");
        console.log(f_a,f_b)
        let f_a_h=parseInt(f_a[0]);
        let f_b_h=parseInt(f_b[0]);
        let f_a_m=parseInt(f_a[1]);
        let f_b_m=parseInt(f_b[1]);
        if( f_a_h > f_b_h ){
          return 1 * sort_type;
        }
        else if(f_a_h < f_b_h){
          return -1 * sort_type;
        }
        else{
          if(f_a_m > f_b_m){
            return 1 * sort_type;
          }
          else if(f_a_m < f_b_m){
            return -1 * sort_type;
          }
          return 0;
        }
    });
    setSortType(-1*sort_type);
  }
    setTareasV(tareas_sorted);
  }


  const tareas_e = tareasV.map((fila, index) => {
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
          <th onClick={()=>{sorting(3,"duracion")}}>
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

async function getAdulto(id_adulto) {
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
    return response.data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getTareas(user_id, user_token, setTareas) {
  const toastID = toast.loading("Cargando Tareas...");
  const config = {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${user_token}`,
    },
  };
  
  try{
    const response= await axios.get(`https://wise-helper-backend.onrender.com/api/v1/tareas/get-tareas-by-user/voluntario/${user_id}`, config);
    const data = response.data.tareas.filter((i) => i.estado !== "Activa");
    let adulto_a = [];
    data.forEach((tarea) => {
      tarea.adulto = {};
      if (!adulto_a.includes(tarea.id_adulto_mayor))
        adulto_a = [...adulto_a, tarea.id_adulto_mayor];
    });

    for (let i=0; i<adulto_a.length ; i++){
      //Obtener la información del adulto mayor
      let id_adulto=adulto_a[i];
      let data_adulto=await getAdulto(id_adulto);//Datos del adulto mayor
      if(data_adulto !== null) {
        //Agregar la información del adulto a la lista de tareas
        data.forEach(tarea => {
          if(tarea.id_adulto_mayor===id_adulto){
            tarea.adulto=data_adulto;
          }
        });
      }
    }
    setTareas(data);
    toast.dismiss(toastID);
    toast.success("Tareas Cargadas con éxito");
  }
  catch(error){
    console.log(error);
    toast.error("Error en el servidor. Intentelo de nuevo en otra ocasión.");
    toast.dismiss(toastID);
  };
}

function TareasActivas() {
  const { refPanel, tareasDisplay, tareaV, setTareasV, usuarioV } =
    React.useContext(GeneralContext);
  let effect_exe = 0; //Control de ejecuciones de useEffect

  React.useEffect(() => {
    if (effect_exe === 0) {
      // Código a ejecutar después de la carga de la página
      getTareas(usuarioV.user._id, usuarioV.token, setTareasV);
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
        {tareaV !== null ? <Detalle /> : <></>}
      </div>

      <Footer></Footer>
    </div>
  );
}

export { TareasActivas };
