import React from "react";
import ax from "axios";
import { useNavigate } from "react-router-dom";
import "../sass/mf_agregarTarea.scss";
import { Header } from "../components/Header_Adulto";
import { Footer } from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { GeneralContext } from "../context";

async function generateChat(uid,id_tarea){
  uid=`userChat-${uid}`;

  const token_config={
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_WEAVY_API}`
    },
    body: JSON.stringify({
      app: {uid: `chatTarea-${id_tarea}`, name: "Chat", type: "Chat"},
      user: {uid: uid}
    })
  };

  const getToken=async ()=>{//Se genera el token de usuario
    let token_gen = await fetch(`${process.env.REACT_APP_WEAVY_URL}/api/apps/init`,token_config);
    if (token_gen.ok) {
      let resp = await token_gen.json();
      console.log(resp);
      return resp.id;
    }
    else{
      return "";
    }
  }

  var id=await getToken();
  return id;
}

async function updateIdChat(id_tarea,id_chat,toastID,user_token){
  const config = {
    method: "patch",
    url: `https://wise-helper-backend.onrender.com/api/v1/tareas/update/${id_tarea}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user_token}`
    },
    data: JSON.stringify({
      id_chat: id_chat,
    }),
  };

  ax(config)
    .then(async function (response) {
      //Actualizar id de chat
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
      toast.dismiss(toastID);
      if (error.response.status === 401) {
        toast.error("No se pudo actualizar la tarea. Intentelo en otra ocasión.");
      }
    });
}

function AgregarTarea() {
  const { usuario } = React.useContext(GeneralContext);
  const [titulo,setTitulo]=React.useState("");
  const [fechaLimite,setFechaLimite]=React.useState("");
  const [tiempoEstimado,setTiempoEstimado]=React.useState("");
  const [descripcion,setDescripcion]=React.useState("");
  
  const navigate = useNavigate();

  const handleSubmmit=(e)=>{
    e.preventDefault();
    const toastID = toast.loading("Agregando Tarea...");
    if (titulo === "" || fechaLimite === "" || tiempoEstimado === "" || descripcion === "") {
      toast.error("Ingrese todos los campos");
      toast.dismiss(toastID);
      return;
    }
    if (titulo.length < 3 ) {
      toast.error("El titulo debe contener como mínimo 3 caracteres");
      toast.dismiss(toastID);
      return;
    }
    const fecha_actual=Date.now();
    if (Date.parse(fechaLimite) < fecha_actual){
      toast.error("La fecha de la tarea debe ser superior o igual a la actual");
      toast.dismiss(toastID);
      return;
    }
    const p_tiempo=tiempoEstimado.split(':');
    const hora=parseInt(p_tiempo[0]);
    const minuto=parseInt(p_tiempo[1]);
    if (hora === 0 && minuto < 30){
      toast.error("Las tareas como mínimo deben tener un tiempo de desarrollo de 30 minutos");
      toast.dismiss(toastID);
      return;
    }

    const estado="Activa";
    const ubicacion="Avenida Prueba";
    const config = {
      method: "post",
      url: "https://wise-helper-backend.onrender.com/api/v1/tareas/create",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${usuario.token}`
      },
      data: JSON.stringify({
        titulo: titulo,
        descripcion: descripcion,
        fecha_limite: fechaLimite,
        duracion: tiempoEstimado,
        estado: estado,
        ubicacion: ubicacion,
        id_adulto_mayor:usuario.user._id,
        id_chat: "default",
      }),
    };

    ax(config)
      .then(async function (response) {
        //Actualizar id de chat
        const id_tarea=response.data.tarea._id;
        const id_chat = await generateChat(usuario.user.cedula,id_tarea);
        if (id_chat===""){
          toast.error("No se pudo generar el chat para esta tarea. Intentelo más luego.");
          toast.dismiss(toastID);
          return;
        }
        updateIdChat(id_tarea,id_chat,toastID,usuario.token);
        setTitulo("");
        setFechaLimite("");
        setTiempoEstimado("");
        setDescripcion("");
        toast.dismiss(toastID);
        navigate("/adult");
      })
      .catch(function (error) {
        console.log(error);
        toast.dismiss(toastID);
        if (error.response.status === 401) {
          toast.error("No se pudo agregar la tarea. Intentelo en otra ocasión.");
        }
      });
  }

  return (
    <div className="agregar-tareas">
      <Header></Header>

      <div className="agregar-tarea-general--container">
        <div className="agregar-tareas--header">
          <h1>Agregar Tarea</h1>
          <hr/>
        </div>
        <div className="agregar-tarea-form-container">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" id="titulo" onChange={(e)=>{setTitulo(e.target.value)}}/>
          <label htmlFor="fecha">Fecha Limite</label>
          <input type="date" name="fecha" id="fecha" onChange={(e)=>{setFechaLimite(e.target.value)}}/>
          <label htmlFor="tiempo-estimado">Tiempo Estimado</label>
          <input type="time" name="tiempo-estimado" id="tiempo-estimado" onChange={(e)=>{setTiempoEstimado(e.target.value)}}/>
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            name="descripcion"
            id="descripcion"
            cols="30"
            rows="5"
            onChange={(e)=>{setDescripcion(e.target.value)}}
          ></textarea>
          <button onClick={handleSubmmit}>Agregar Tarea</button>
          <Toaster />
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export { AgregarTarea };
