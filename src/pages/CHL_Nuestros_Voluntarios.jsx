/* eslint-disable no-unused-vars */
import React from "react";
import "../sass/chl_nuestros_voluntarios.scss";
import { Header as HeaderVoluntario } from "../components/Header_Voluntario";
import { Header as HeaderAdulto } from "../components/Header_Adulto";
import { Header as HeaderIndex } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import Rating from "@mui/material/Rating";
import adultoMayor from "../assets/img/adultoMayor-hombre.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";





function NuestrosVoluntarios() {
  const [volunters, setVolunters]=React.useState([]);
  const obtenerVoluntarios= async () =>  {
    //const toastID = toast.loading("Obteniendo voluntarios...");
    let data = '';
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://wise-helper-backend.onrender.com/api/v1/auth/all',
      headers: { },
      data : data
    };
    axios.request(config)
    .then((response) => {
      const data=response.data.users;
      let voluntarios=data.filter(u => u.tipo==="voluntario");
      setVolunters(voluntarios);
      console.log(voluntarios);
      //toast.dismiss(toastID);
    })
    .catch((error) => {
      console.log(error);
      //toast.dismiss(toastID);
      //toast.error("Error en el servidor.");
    });
  }
  const url = window.location.href;
  let effect_exe=0;//Control de ejecuciones de useEffect

  React.useEffect(()=>{
    if(effect_exe===0){
      // Código a ejecutar después de la carga de la página
      obtenerVoluntarios();
      effect_exe=1;
    }
  },[]);

  function ShowVoluntario({v, flag}){

    return(
      <div className={flag ? "voluntario v1" : "voluntario v2"}>
        <div className="informacion">
        <h2>{v.nombre+" "+v.apellidos}</h2>
            <span>{v.descripcion}</span>
            <div>
                <Rating value={parseFloat(v.calificacion_general)} readOnly precision={0.5} />
            </div>
        </div>
        <div className="imagen">
            <img src={v.img} alt="" />
        </div>       
      </div> 
    );
  }

  return (
    <div className="nuestrosVoluntarios">

      {url.includes("/adult") ? (
        <HeaderAdulto />
      ) : url.includes("/volunter") ? (
        <HeaderVoluntario /> 
      ) : (
        <HeaderIndex />
      )}

      <div className="container">
        <div className="general">
          <h1> Nuestros Voluntarios </h1>
          <p>
            Bienvenidos a nuestra página de ayuda para adultos mayores. Nos enorgullece presentar a nuestros maravillosos voluntarios, quienes desinteresadamente brindan apoyo y asistencia a los adultos mayores en sus necesidades de compras. Estos valiosos miembros de nuestra comunidad son el corazón y el alma de nuestra iniciativa.
          </p>
        </div> 
        <div className="voluntarios">
            <div className="inicio">
                <h3> Nuestros Voluntarios</h3>
            </div>
            {
              volunters ? (
                volunters.map((volunter, index)=>
                  (
                    <ShowVoluntario v={volunter} flag={index % 2 === 0}/>  
                  )

                )
              ) : (
                <div></div>
              )
            }  
        </div>
        <div className="general">
          <p>
            Nuestros voluntarios son individuos comprometidos que dedican su tiempo y energía para hacer una diferencia positiva en la vida de los adultos mayores. 
          </p>
          <p>
            Cuando se trata de ayudar con las compras, nuestros voluntarios están capacitados para entender las necesidades y preferencias específicas de cada adulto mayor. Ya sea que estén comprando alimentos, medicamentos u otros productos esenciales, nuestros voluntarios se aseguran de que se cumplan todos los requisitos y de que cada artículo sea seleccionado cuidadosamente.
          </p>
          <p>
            Además de su apoyo en las compras, nuestros voluntarios también brindan una compañía invaluable. Sabemos que la soledad es un desafío significativo para muchos adultos mayores, y nuestros voluntarios se aseguran de que cada interacción sea una oportunidad para establecer conexiones significativas y ofrecer un oído atento.
          </p>
          <p>
            Nos sentimos profundamente agradecidos por el compromiso y la dedicación de nuestros voluntarios. Su generosidad y su pasión por ayudar son una inspiración para todos nosotros. Si estás interesado en unirte a nuestro equipo de voluntarios o si conoces a alguien que pueda beneficiarse de nuestros servicios, no dudes en ponerte en contacto con nosotros.
          </p><p>
            Juntos, estamos construyendo una comunidad solidaria y amorosa, donde los adultos mayores se sienten apoyados y valorados. Únete a nosotros en esta hermosa misión y hagamos la diferencia en la vida de aquellos que más lo necesitan.
          </p>
        </div> 
      </div>
    <Footer></Footer>
    </div>
  );
}
export { NuestrosVoluntarios };
