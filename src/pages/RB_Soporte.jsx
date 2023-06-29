import React from "react";
import "../sass/rb_soporte.scss";
import {
  MdMarkUnreadChatAlt,
  MdSend,
  MdLocalPhone,
  MdLiveHelp,
  MdHelp,
} from "react-icons/md";
import { BsHeadset, BsFileEarmarkText } from "react-icons/bs";
import { Header as HeaderVoluntario } from "../components/Header_Voluntario";
import { Header as HeaderAdulto } from "../components/Header_Adulto";
import { Header as HeaderIndex } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
function CuadroDialogo({open,setOpen}){
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'20px',
    boxShadow: 24,
    p: 4,
  };
  return(
    <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¡Contactate con nosotros!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
  );
}

function FAQQuest(props) {
  const [flag, setFlag] = React.useState(0);

  return (
    <div
      onClick={() => {
        setFlag(1 - flag);
      }}
    >
      <div>
        <p>{props.quest}</p>
        <p style={flag === 1 ? { display: "flex" } : { display: "none" }}>
          {props.answ}
        </p>
      </div>
      <p>{flag === 1 ? "-" : "+"}</p>
    </div>
  );
}

function Soporte() {
  const navigate = useNavigate();
  const [flag, setFlag] = React.useState([0, 1, 0]);
  const url = window.location.href;
  const [open, setOpen] = React.useState(false);
  
  return (
    <div className="Soporte">
      {url.includes("adult") ? (
        <HeaderAdulto />
      ) : url.includes("volunter") ? (
        <HeaderVoluntario />
      ) : (
        <HeaderIndex></HeaderIndex>
      )}
      <div className="container">
        <div className="btns">
          {/*Bloque de botones*/}
          <div
            class="Guia"
            onClick={() => {
              navigate("tyc");
            }}
          >
            <BsFileEarmarkText />
            <p>TyC</p>
          </div>

          <div
            class="FAQ"
            onClick={() => {
              if (flag[1] === 0) setFlag([0, 1 - flag[1], 0]);
            }}
          >
            <MdHelp />
            <p>FAQ</p>
          </div>

          <div
            class="Contacto"
            onClick={() => {
              if (flag[2] === 0) setFlag([0, 0, 1 - flag[2]]);
            }}
          >
            <BsHeadset />
            <p>Contacto</p>
          </div>
        </div>

        <div className="content">
          {/*Bloque de contenido de cada sección*/}

          <div
            class="Guia"
            style={flag[0] === 1 ? { display: "flex" } : { display: "none" }}
          >
            {/*Todavía no está completa la aplicación*/}
          </div>

          <div
            class="FAQ"
            style={flag[1] === 1 ? { display: "flex" } : { display: "none" }}
          >
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

          <div
            class="Contacto"
            style={flag[2] === 1 ? { display: "flex" } : { display: "none" }}
          >
            {/*Bloque de contacto*/}
            <h1>Contacto</h1>
            <section>
              <div>
                <MdLiveHelp />
                <div>
                  <h2>Centro de Ayuda</h2>
                  <p>
                    Si necesitas contactarte con el personal de soporte,
                    llamanos.
                  </p>
                </div>
                <MdLocalPhone onClick={()=>{setOpen(true)}}/>
              </div>
              <div>
                <MdMarkUnreadChatAlt />
                <div>
                  <h2>Soporte</h2>
                  <p>
                    Contactanos por mensaje, tus dudas seran respondidas lo más
                    pronto posible.
                  </p>
                </div>
                <MdSend onClick={() => navigate("send-message")} />
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <CuadroDialogo open={open} setOpen={setOpen}/>
    </div>
  );
}
export { Soporte };
