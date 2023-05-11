/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Navbar2 } from "../components/Navbar2";
import "../sass/rb_tarea_v.scss";
import { AiFillFilter } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { MdLocationOn } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

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

function DetalleTarea({ detalle, set, setFilaSeleccionada, refTareasContent }) {
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

        <input type="button" value="Aceptar" />

        <p>Para obtener detalles de la tarea debes aceptarla</p>
      </div>
    </section>
  );
}

function TareasVoluntario() {
  const data = [
    {
      solicitante: "Javier Sánchez",
      score: "5",
      perfil: "./img12.png",
      tarea_titulo: "Limpieza de hogar",
      tarea_desc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, asperiores. Iure ut aliquid unde itaque a! Sunt pariatur ullam harum asperiores nam aspernatur quis, earum inventore facere magni, numquam laudantium.",
      fecha: "12 Mar 2023",
      tiempo: "00:45:10",
      ubicacion: "123 Main Street, Anytown, CA 12345, USA",
    },
    {
      solicitante: "Pedro Perez",
      score: "2",
      perfil: "./img12.png",
      tarea_titulo: "Limpieza de hogar",
      tarea_desc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, asperiores. Iure ut aliquid unde itaque a! Sunt pariatur ullam harum asperiores nam aspernatur quis, earum inventore facere magni, numquam laudantium.",
      fecha: "12 Mar 2023",
      tiempo: "00:45:10",
      ubicacion: "123 Main Street, Anytown, CA 12345, USA",
    },
    {
      solicitante: "Juan Galarza",
      score: "3.5",
      perfil: "./img12.png",
      tarea_titulo: "Limpieza de hogar",
      tarea_desc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, asperiores. Iure ut aliquid unde itaque a! Sunt pariatur ullam harum asperiores nam aspernatur quis, earum inventore facere magni, numquam laudantium.",
      fecha: "12 Mar 2023",
      tiempo: "00:45:10",
      ubicacion: "123 Main Street, Anytown, CA 12345, USA",
    },
  ];

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

  return (
    <div className="TareasV">
      <div className="container">
        <Navbar2 flag={1} />
        <div className="panel" ref={refPanel}>
          <section className="tareas_content" ref={refTareasContent}>
            <div className="btns">
              <div class="filtro" style={{ display: "none" }}>
                <AiFillFilter />
                <p>Filtrar Contenido</p>
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
          <DetalleTarea
            detalle={detalle}
            set={setDetalle}
            setFilaSeleccionada={setFilaSeleccionada}
            refTareasContent={refTareasContent}
          />
        </div>
      </div>
      <footer>Realizado por Renato Berrezueta</footer>
    </div>
  );
}
export { TareasVoluntario };
