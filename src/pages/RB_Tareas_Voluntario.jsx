/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Header } from "../components/Header_Voluntario";
import {Footer} from "../components/Footer"
import "../sass/rb_tarea_voluntario.scss";
import { AiFillFilter } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { MdLocationOn } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GeneralContext } from "../context";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const mensaje_cuadroDialogo="Se aceptará la tarea seleccionada y no se podrán hacer cambios."
const titulo_cuadroDialogo="Está seguro en querer aceptar la tarea seleccionada?"

async function generateChat(usuario,tarea){
  const uid=`userChat-${usuario.user.cedula}`;

  const token_config={
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_WEAVY_API}`
    },
    body: JSON.stringify({
      app: {uid: `chatTarea-${tarea._id}`, name: "Chat", type: "Chat"},
      user: {uid: uid}
    })
  };

  const getToken=async ()=>{//Se genera el token de usuario
    let token_gen = await fetch(`${process.env.REACT_APP_WEAVY_URL}/api/apps/init`,token_config);
    if (token_gen.ok) {
      let resp = await token_gen.json();
      return resp.id;
    }
    else{
      return "";
    }
  }

  var token=await getToken();
  //Agregar datos de usuario
  return token;
}

async function updateTarea(usuario,tarea,navigate){
  const toastID = toast.loading("Aceptando la tarea...");
  let data = JSON.stringify({
    "id_voluntario": usuario.user._id,
    "estado": "En Proceso",
  });

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `https://wise-helper-backend.onrender.com/api/v1/tareas/update/${tarea._id}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${usuario.token}`
    },
    data : data
  };

  axios.request(config)
  .then(async (response) => {
    const id_chat=await generateChat(usuario,tarea);
    console.log("Id Chat ", id_chat);
    if(id_chat!==""){
      toast.success("Tarea Correctamente Aceptada");
      toast.dismiss(toastID);
      navigate("/volunter/tareas");
    }
    else{
      toast.error("Hubo un error al aceptar la tarea. Intentelo después.");
      toast.dismiss(toastID);
    }
  })
  .catch((error) => {
    console.log(error);
    toast.error("Hubo un error al aceptar la tarea. Intentelo después.");
    toast.dismiss(toastID);
  });
}


function CuadroDialogo({ msg, title }) {
  const { open, setOpen, tareaV,usuarioV } = React.useContext(GeneralContext);
  const navigate = useNavigate();
  const handleAceptarTarea = () => {
    setOpen(false); //cerrar el cuadro de dialogo
    updateTarea(usuarioV,tareaV,navigate)//Actualizar el estado de la tarea
  };

  return (
    <Dialog
      open={open}
      onClose={() => {setOpen(false);}}
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
        <Button onClick={() => {setOpen(false);}} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => {handleAceptarTarea()}}
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
    //console.log(fila);
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
        <td>{fila.duracion}</td>
        <td>
          {typeof fila.adulto=== "undefined" ? (
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


function Detalle() {
  const { setSelectedIdx, setTareasDisplay, detalleDisplay, setDetalleDisplay, tareaV, setOpen} = React.useContext(GeneralContext);
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
    <section className="tarea_desc" style={{ display: detalleDisplay }}
    >
      <section>
        <RxCross2 onClick={cerrar_detalle} />
      </section>

      <div className="detalles_adulto">
        <div className="detalles_adulto__informacion">
          <img src={tareaV.adulto.img} alt={tareaV.adulto.nombre} />
          <div className="detalles_adulto_datos">
            <p>{`${tareaV.adulto.nombre} ${tareaV.adulto.apellidos}`}</p>
          </div>
        </div>
        <div className="detalles_adulto__puntaje">
          <Rating
            value={parseFloat(tareaV.adulto.calificacion_general)}
            readOnly
            precision={0.5}
          />
          <p>{tareaV.adulto.calificacion_general}</p>
        </div>
      </div>
     

      <div className="descripcion_tarea">
        <p>Descripción de la tarea</p>
        <p> {tareaV.descripcion}</p>
      </div>
     
      <div>
        <p>Ubicación</p>

        <div>
          <MdLocationOn />
          <p>{tareaV.ubicacion}</p>
        </div>

        <div className="mapaApi">
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution=''
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={myIcon} position={[51.505, -0.09]}>
            </Marker>
        </MapContainer>
        </div>

        <input
          type="button"
          value="Aceptar"
          onClick={() => {setOpen(true);}}
        />
        <CuadroDialogo
          msg={mensaje_cuadroDialogo}
          title={titulo_cuadroDialogo}
        />

        <p>Para obtener detalles de la tarea debes aceptarla</p>
      </div>
    </section>
  );
}

async function getAdulto(id_adulto) {
  const config = {
    headers: {
      "content-type": "application/json",
    }
  };
  try{
    const response= await axios.get(`https://wise-helper-backend.onrender.com/api/v1/auth/user/${id_adulto}`, config);
    return response.data.user;
  }
  catch(error){
    console.log(error);
    return null;
  }
}


async function getAllTareas(setTareas,usuario) {
  const toastID = toast.loading("Cargando Tareas Disponibles...");
  const config = {
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer ${usuario.token}`,
    }
  };

  try{
    const response= await axios.get('https://wise-helper-backend.onrender.com/api/v1/tareas/all', config);
    
    const data= response.data.tareas.filter(i => i.estado === 'Activa');
    
    let adulto_a=[];

    data.forEach(tarea => {
      tarea.adulto={};
      if(!adulto_a.includes(tarea.id_adulto_mayor)) adulto_a=[...adulto_a,tarea.id_adulto_mayor]
    });
    
    for (let i=0; i<adulto_a.length ; i++){
      let id_adulto=adulto_a[i];
      let data_adulto=await getAdulto(id_adulto);
      if(data_adulto !== null) {
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
  }
}


function TareasVoluntario() {
  const { refPanel, tareasDisplay, tareaV, setTareasV, usuarioV } = React.useContext(GeneralContext);
  let effect_exe=0;//Control de ejecuciones de useEffect

  React.useEffect(()=>{
    if(effect_exe===0){
      getAllTareas(setTareasV,usuarioV)
      effect_exe=1;
    }
  },[]);

  return (
    <div id="TareasV">
      <Header></Header>
      <Toaster></Toaster>
      <div className="containers" ref={refPanel}>
        <section className="tareas_content" style={{ display: tareasDisplay }}>
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

export { TareasVoluntario };