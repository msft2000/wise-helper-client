/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Navbar } from "../components/Navbar";
import "../sass/rb_tarea_a.scss";
import { AiOutlinePlus, AiFillFilter } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { FaImage } from "react-icons/fa";
import { GrLink } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import data from "../assets/json/data_adulto.json"; //Archivo con los datos de tareas

function CuadroDialogo({ refTareasContent, open, setOpen, msg, title }) {
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
        <Button onClick={handleSubmmit} color="primary" autoFocus>
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
              nombre: fila.voluntario,
              tipo: fila.tipo,
              desc: fila.tarea_desc,
            });

            if (parseFloat(refPanel.current.offsetWidth) <= 1006) {
              refTareasContent.current.style.display = "none";
            }
          }
        }}
      >
        <td>{fila.tarea_titulo}</td>
        <td>{fila.fecha}</td>
        <td>
          <p className={fila.estado.toLowerCase().replace(/ /g, "")}>
            {fila.estado}
          </p>
        </td>
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
              Estado
            </div>
          </th>
          <th>
            <div>
              <AiFillFilter />
              Tiempo Estimado
            </div>
          </th>
          <th>Voluntario</th>
        </tr>
      </thead>
      <tbody>{filas}</tbody>
    </table>
  );
}

function DetalleTarea({ detalle, set, setFilaSeleccionada, refTareasContent }) {
  const navigate = useNavigate();
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
          <div>
            <p>{detalle.nombre}</p>
            <p>{detalle.tipo}</p>
          </div>
        </div>
        <div>
          <Rating value={parseFloat(detalle.score)} readOnly precision={0.5} />
          <p>{detalle.score}</p>
        </div>
      </div>
      <div>
        <p>Descripción de la tarea</p>
        <p> {detalle.desc}</p>
        <input
          type="button"
          value="Finalizar Tarea"
          onClick={() => navigate("/adult/finalizar")}
        />
      </div>

      <div>
        <p>Mensajes</p>

        <div className="msgs"></div>

        <div className="txtfield">
          <textarea placeholder="Escriba un mensaje aquí"></textarea>
          <div>
            <FaImage />
            <GrLink />
          </div>
        </div>
        <input type="button" value="Enviar" />
      </div>
    </section>
  );
}

function DetalleTarea2({
  detalle,
  set,
  setFilaSeleccionada,
  refTareasContent,
  open,
  setOpen,
}) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <section className="tarea_desc2" style={{ display: detalle.display }}>
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
        <p>Descripción de la tarea</p>
        <p>{detalle.desc}</p>
      </div>
      <input type="submit" value="Cancelar" onClick={handleClickOpen} />

      {/* Cuadrado de dialogo para aceptar o rechazar la cancelación de una tarea */}
      <CuadroDialogo
        open={open}
        setOpen={setOpen}
        refTareasContent={refTareasContent}
        msg="Se eliminará la tarea seleccionada y no podrá ser asignada ni
            seleccionada por un voluntario."
        title="Está seguro en querer cancelar la tarea seleccionada?"
      />
    </section>
  );
}

function TareasAdulto() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [detalle, setDetalle] = React.useState({
    display: "none",
    score: "",
    nombre: "",
    tipo: "",
    desc: "",
    img: "",
  });

  const [filaSeleccionada, setFilaSeleccionada] = React.useState(null); //Variables de estado para saber que fila se seleccionó

  const refTareasContent = React.useRef(null);
  const refPanel = React.useRef(null);

  return (
    <div className="TareasA">
      <div className="container">
        <Navbar flag={1} />
        <div className="panel" ref={refPanel}>
          <section className="tareas_content" ref={refTareasContent}>
            <div className="btns">
              <div
                class="agregar"
                onClick={() => navigate("/adult/agregar-tarea")}
              >
                <AiOutlinePlus />
                <p>Agregar Tarea</p>
              </div>
            </div>
            <div className="table">
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
          {detalle.nombre !== "" ? (
            <DetalleTarea
              detalle={detalle}
              set={setDetalle}
              setFilaSeleccionada={setFilaSeleccionada}
              refTareasContent={refTareasContent}
            />
          ) : (
            <DetalleTarea2
              detalle={detalle}
              set={setDetalle}
              setFilaSeleccionada={setFilaSeleccionada}
              refTareasContent={refTareasContent}
              open={open}
              setOpen={setOpen}
            />
          )}
        </div>
      </div>
      <footer>Realizado por Renato Berrezueta</footer>
    </div>
  );
}
export { TareasAdulto };
