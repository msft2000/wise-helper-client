import React from "react";
import { Navbar } from "../components/Navbar";
import "../sass/soporte2.scss";
import {MdMarkUnreadChatAlt, MdSend,MdLocalPhone,MdLiveHelp,MdHelp} from "react-icons/md"
import {BsHeadset,BsFileEarmarkText} from "react-icons/bs"
import { useNavigate } from "react-router-dom";
function FAQQuest(props) {
  const [flag, setFlag] = React.useState(0);
  return (
    <div onClick={() => {
      setFlag(1 - flag);
    }}>
      <div>
        <p>{props.quest}</p>
        <p style={flag === 1 ? {display:"flex"} : {display:"none"}}>
          {props.answ}
        </p>
      </div>
      <p>{flag===1 ? "-":"+"}</p>
    </div>
  );
}

function Soporte() {
  const navigate=useNavigate();
  const [flag,setFlag]=React.useState([0,1,0]);
  return (
    <div className="Soporte">

      <div className="container">

        <Navbar flag={4} />

        <div className="btns">
          {/*Bloque de botones*/}
          <div class="Guia" onClick={()=>{navigate("/tyc")}} >
            <BsFileEarmarkText/>
            <p>TyC</p>
          </div>

          <div class="FAQ" onClick={()=>{if(flag[1]===0) setFlag([0,1-flag[1],0])}} >
            <MdHelp/>
            <p>FAQ</p>
          </div>

          <div class="Contacto" onClick={()=>{if(flag[2]===0) setFlag([0,0,1-flag[2]])}} >
            <BsHeadset/>
            <p>Contacto</p>
          </div>

        </div>

        <div className="content">
          {/*Bloque de contenido de cada sección*/}

          <div class="Guia" style={flag[0]===1 ? {display:"flex"}:{display:"none"}}>
            {/*Todavía no está completa la aplicación*/}
          </div>

          <div class="FAQ" style={flag[1]===1 ? {display:"flex"}:{display:"none"}}>
            {/*Bloque de Preguntas Frecuentes*/}
            <h1>Preguntas frecuentes</h1>
            <section>
                <FAQQuest
                  quest="¿Qué es el sitio web y para qué sirve?"
                  answ="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                />
                <FAQQuest
                  quest="¿Es gratis registrarse en el sitio web como voluntario o
                  adulto mayor?"
                  answ="Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Obcaecati sunt amet hic voluptatibus facilis, placeat vero
                  excepturi neque. Iusto nam possimus dolores repellat fuga,
                  temporibus dicta at labore in molestias."
                />
                <FAQQuest
                  quest="¿Cómo funciona el proceso de selección de tareas para los
                  voluntarios?"
                  answ="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore iure, odit animi tenetur sed quibusdam optio sequi
                  architecto dolor. Officia accusamus veniam architecto
                  perspiciatis voluptates error nisi tenetur impedit fuga."
                />
                <FAQQuest
                  quest="¿Cómo se realiza la comunicación entre los voluntarios y los
                  adultos mayores?"
                  answ="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Mollitia cupiditate ipsam sint rerum. Molestiae, expedita
                  omnis quibusdam alias deleniti sequi nesciunt quae ea nemo
                  optio recusandae exercitationem, asperiores nihil eligendi."
                />
                <FAQQuest
                  quest="¿Qué tipo de tareas pueden publicar los adultos mayores?"
                  answ="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore iure, odit animi tenetur sed quibusdam optio sequi
                  architecto dolor. Officia accusamus veniam architecto
                  perspiciatis voluptates error nisi tenetur impedit fuga."
                />
                <FAQQuest
                  quest="¿Qué información debo proporcionar cuando publico una tarea
                  como adulto mayor?"
                  answ="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore iure, odit animi tenetur sed quibusdam optio sequi
                  architecto dolor. Officia accusamus veniam architecto
                  perspiciatis voluptates error nisi tenetur impedit fuga."
                />
                <FAQQuest
                  quest="¿Cómo se garantiza la seguridad y privacidad de los datos de
                  los voluntarios y adultos mayores?"
                  answ="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore iure, odit animi tenetur sed quibusdam optio sequi
                  architecto dolor. Officia accusamus veniam architecto
                  perspiciatis voluptates error nisi tenetur impedit fuga."
                />
                <FAQQuest
                  quest="¿Qué medidas de seguridad se aplican en el sitio web para
                  evitar fraudes o estafas?"
                  answ="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore iure, odit animi tenetur sed quibusdam optio sequi
                  architecto dolor. Officia accusamus veniam architecto
                  perspiciatis voluptates error nisi tenetur impedit fuga."
                />
                <FAQQuest
                  quest="¿Qué pasa si un voluntario acepta una tarea y después no
                  puede cumplir con ella?"
                  answ="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore iure, odit animi tenetur sed quibusdam optio sequi
                  architecto dolor. Officia accusamus veniam architecto
                  perspiciatis voluptates error nisi tenetur impedit fuga."
                />
                <FAQQuest
                  quest="¿Cómo funciona el sistema de calificación y cómo puede
                  ayudar a elegir al mejor voluntario para realizar una tarea?"
                  answ="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore iure, odit animi tenetur sed quibusdam optio sequi
                  architecto dolor. Officia accusamus veniam architecto
                  perspiciatis voluptates error nisi tenetur impedit fuga."
                />
            </section>
          </div>

          <div class="Contacto" style={flag[2]===1 ? {display:"flex"}:{display:"none"}} >
            {/*Bloque de contacto*/}
            <h1>Contacto</h1>
            <section>
              <div>
                <MdLiveHelp/>
                <div>
                  <h2>Centro de Ayuda</h2>
                  <p>
                    Si necesitas contactarte con el personal de soporte,
                    llamanos.
                  </p>
                </div>
               <MdLocalPhone/>
              </div>
              <div>
                <MdMarkUnreadChatAlt/>
                <div>
                  <h2>Soporte</h2>
                  <p>
                    Contactanos por mensaje, tus dudas seran respondidas lo más
                    pronto posible.
                  </p>
                </div>
                <MdSend onClick={()=>navigate("send-message")}/>
              </div>
            </section>
          </div>

        </div>
      </div>
      <footer>Realizado por Renato Berrezueta</footer>
    </div>
  );
}
export { Soporte };
