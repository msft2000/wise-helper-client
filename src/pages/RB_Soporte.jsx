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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import questions from "../assets/json/faq_questions.json";
function CuadroDialogo({ open, setOpen }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "20px",
    boxShadow: 20,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ¡Contactate con nosotros!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          <a href="tel:+593-987654321">+593-987654321</a>
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

function getQuestions() {
  return questions.map((quest, index) => {
    return <FAQQuest quest={quest.quest} answ={quest.answ} />;
  });
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
              {getQuestions()}
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
                <MdLocalPhone
                  onClick={() => {
                    setOpen(true);
                  }}
                />
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
      <CuadroDialogo open={open} setOpen={setOpen} />
    </div>
  );
}
export { Soporte };
