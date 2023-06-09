import React from "react";
import { Navbar } from "../components/Navbar";
import "../css/tarea_a.css";
import { AiOutlinePlus, AiFillFilter } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import { FaImage } from "react-icons/fa";
import { GrLink } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
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
          if (filaSeleccionada == index) {
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
        <input type="button" value="Finalizar Tarea" />
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
}) {
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
      <input type="submit" value="Cancelar" />
    </section>
  );
}

function TareasAdulto() {
  const navigate=useNavigate();
  const data = [
    {
      voluntario: "Ana Garcia",
      tipo: "Voluntaria",
      score: "4",
      perfil: "./img7.png",
      tarea_titulo: "Limpieza de hogar",
      tarea_desc:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, asperiores. Iure ut aliquid unde itaque a! Sunt pariatur ullam harum asperiores nam aspernatur quis, earum inventore facere magni, numquam laudantium.",
      fecha: "12 Mar 2023",
      estado: "En Proceso",
      tiempo: "00:45:10",
    },
    {
      voluntario: "Lucia Garcia",
      tipo: "Voluntaria",
      score: "3.2",
      perfil: "./img7.png",
      tarea_titulo: "Limpieza de hogar",
      tarea_desc: "Hola",
      fecha: "12 Mar 2023",
      estado: "En Proceso",
      tiempo: "00:45:10",
    },
    {
      voluntario: "",
      tipo: "Voluntaria",
      score: "3.2",
      perfil: "",
      tarea_titulo: "Limpieza de hogar",
      tarea_desc: "Hola",
      fecha: "12 Mar 2023",
      estado: "Activa",
      tiempo: "00:45:10",
    },
  ];

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
              <div class="agregar" onClick={()=>navigate("/adult/agregar-tarea")}>
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
          {detalle.nombre != "" ? (
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
            />
          )}
        </div>
      </div>
      <footer>Realizado por Renato Berrezueta</footer>
    </div>
  );
}
export { TareasAdulto };
