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
import data from "../assets/json/data_adulto.json";
function CuadroDialogo({ refTareasContent, open, setOpen, msg, title,flag=true }) {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmmit = () => {
    setOpen(false);
    const ref = document.querySelector("div.TareasA tr.selected");
    const ref2 = document.querySelector("div.TareasA section.tarea_desc2");
    ref.setAttribute("hidden", "");
    ref2.setAttribute("style", "display:none");
    refTareasContent.current.style.display = "flex";
  };

  const handleSubmmit2 = () => {
    setOpen(false);
    navigate("/volunter/tareas")
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={()=>{flag ? handleSubmmit(): handleSubmmit2()}} color="primary" autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}


function Tabla({
  data,
  set,
  setFilaSeleccionada,
  filaSeleccionada,
  refTareasContent,
  refPanel,
}) {
  const img = require.context("../assets/img", true); //Contexto para cargar imagenes

  const filas = data.map((fila, index) => {
    //Recorrido de todas las filas de los datos obtenidos y creación de cada fila
    return (
      <tr
        className={index === filaSeleccionada ? "selected" : ""}
        onClick={() => {
          if (filaSeleccionada === index) {
            setFilaSeleccionada(null);
            set({ display: "none" });
          } else {
            setFilaSeleccionada(index);
            let perfil = fila.perfil === "" ? "" : img(fila.perfil);
            set({
              img: perfil,
              display: "flex",
              score: fila.score,
              nombre: fila.solicitante,
              desc: fila.tarea_desc,
              ubicacion: fila.ubicacion,
            });
            if (parseFloat(refPanel.current.offsetWidth) <= 1006) {
              refTareasContent.current.style.display = "none";
            }
          }
        }}
      >
        <td>{fila.tarea_titulo}</td>
        <td>{fila.fecha}</td>
        <td>{fila.tiempo}</td>
        <td>{fila.perfil === "" ? "" : <img src={img(fila.perfil)} />}</td>
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
              Tiempo Estimado
            </div>
          </th>
          <th>Solicitante</th>
        </tr>
      </thead>
      <tbody>{filas}</tbody>
    </table>
  );
}

function DetalleTarea({ detalle, set, setFilaSeleccionada, refTareasContent, open, setOpen}) {
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <section className="tarea_desc" style={{ display: detalle.display }}>
      <section>
        <RxCross2
          onClick={() => {
            set({ display: "none" });
            setFilaSeleccionada(null);
            refTareasContent.current.style.display = "flex";
          }}
        />
      </section>
      <div>
        <div>
          <img src={detalle.img} alt="" />
          <p>{detalle.nombre}</p>
        </div>
        <div>
          <Rating value={parseFloat(detalle.score)} readOnly precision={0.2} />
          <p>{detalle.score}</p>
        </div>
      </div>
      <div>
        <p>Descripción de la tarea</p>
        <p> {detalle.desc}</p>
      </div>

      <div>
        <p>Ubicación</p>

        <div>
          <MdLocationOn />
          <p>{detalle.ubicacion}</p>
        </div>

        <input type="button" value="Aceptar" onClick={handleClickOpen}/>
        <CuadroDialogo
        open={open}
        setOpen={setOpen}
        refTareasContent={refTareasContent}
        msg="Se aceptará la tarea seleccionada y no se podrán hacer cambios."
        title="Está seguro en querer aceptar la tarea seleccionada?"
        flag={false}
      />

        <p>Para obtener detalles de la tarea debes aceptarla</p>
      </div>
    </section>
  );
}

function TareasVoluntario() {
  const [detalle, setDetalle] = React.useState({
    display: "none",
    score: "",
    nombre: "",
    desc: "",
    img: "",
    ubicacion: "",
  });

  const [filaSeleccionada, setFilaSeleccionada] = React.useState(null); //Variables de estado para saber que fila se seleccionó

  const refTareasContent = React.useRef(null);
  const refPanel = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="TareasV">
      <Header/>
      <div className="containers">
        
        <div className="panel" ref={refPanel}>
          <section className="tareas_content" ref={refTareasContent}>
            <div className="btns">
              <div class="filtro" style={{ display: "none" }}>
                <AiFillFilter />
                <p>Filtrar Contenido</p>
              </div>
            </div>
            <div className="tables">
              <Tabla
                data={data}
                set={setDetalle}
                detalle={detalle}
                filaSeleccionada={filaSeleccionada}
                setFilaSeleccionada={setFilaSeleccionada}
                refTareasContent={refTareasContent}
                refPanel={refPanel}
              />
            </div>
          </section>
          <DetalleTarea
            detalle={detalle}
            set={setDetalle}
            setFilaSeleccionada={setFilaSeleccionada}
            refTareasContent={refTareasContent}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export { TareasVoluntario };
