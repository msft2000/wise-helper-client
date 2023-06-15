/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Logo from "../assets/img/logo_n.png";
import "../css/Index.scss";
import p1PNG from "../assets/img/p1.png";
import p2PNG from "../assets/img/p2.png";
import p3PNG from "../assets/img/p3.png";
import p4PNG from "../assets/img/tuto.png";
import { useNavigate } from "react-router-dom";
import {Soporte3} from "../pages/Soporte3";
import {Footer} from '../components/Footer';
function Index() {
  const navigate = useNavigate();
  const contentList = [
    {
      h2: "Únete a la primera comunidad que conecta a  jóvenes y mayores a través de la ayuda mutua",
      p: "Brinda tus servicios y ayuda a un adulto mayor a cambio de un pago justo. Comunícate, acuerda los pagos y garantiza la calidad del servicio. Únete a nuestra comunidad intergeneracional hoy mismo",
      src: p1PNG,
    },
    {
      h2: "Conoce a personas de todas las edades y ayuda a crear un futuro mejor.",
      p: "Ofrece tus habilidades para ayudar a adultos mayores y recibe una compensación justa por tus servicios. Únete a nuestra comunidad intergeneracional y comienza a hacer la diferencia hoy mismo.",
      src: p2PNG,
    },
    {
      h2: "Aprovecha la oportunidad de conectarte con personas de diferentes edades y culturas y aprende de sus experiencias.",
      p: "Conviértete en parte de nuestra comunidad intergeneracional y brinda apoyo a adultos mayores de tu zona. Acuerda una compensación justa por tus servicios y ayuda a mejorar la calidad de vida de las personas mayores.",
      src: p3PNG,
    },
  ];
  
  const [carrusel_h2, setCarrusel_h2] = React.useState(contentList[0].h2);
  const [carrusel_p, setCarrusel_p] = React.useState(contentList[0].p);
  const [carrusel_img, setCarrusel_img] = React.useState(contentList[0].src);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const changeContent = (index) => {
    setCarrusel_h2(contentList[index].h2);
    setCarrusel_p(contentList[index].p);
    setCarrusel_img(contentList[index].src);
  };
  return (
    <React.Fragment>
      <div className="Index">
        <header>

          <div>
            <div className="logo">
              <img src={Logo} alt="Logo" />
            </div>
            <nav>
              <ul>
                <li className="selected">
                  <a href="#">Inicio</a>
                </li>
                <li>
                  <a onClick={() => navigate("/support")}>Soporte</a>
                </li>
                <div className="right">
                  <li>
                    <a onClick={() => navigate("/login")}>Iniciar sesión</a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/register")}>Registrarse</a>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
        </header>

        <section>
          {/*--Div contenedor de la imagen --*/}
          <div id="img" style={{ backgroundImage: `url(${carrusel_img})` }}>
            {/*--La imagen tiene flex direction column--*/} 
            <h2>{carrusel_h2}</h2>
            <div>
              <a
                className="carousel-control prev"
                href="#carousel"
                role="button"
                data-slide="prev"
                onClick={() => {
                  if (currentIndex <= 0) {
                    setCurrentIndex(contentList.length - 1);
                  } else {
                    setCurrentIndex(currentIndex - 1);
                  }
                  changeContent(currentIndex);
                }}
              >
                <span className="carousel-control-icon" aria-hidden="true"></span>
                <span className="sr-only"> {"<"} </span>
              </a>
              <a
                className="carousel-control next"
                href="#carousel"
                role="button"
                data-slide="next"
                onClick={() => {
                  if (currentIndex >= contentList.length - 1) {
                    setCurrentIndex(0);
                  } else {
                    setCurrentIndex(currentIndex + 1);
                  }
                  changeContent(currentIndex);
                }}
              >
                <span className="carousel-control-icon" aria-hidden="true"></span>
                <span className="sr-only"> {">"}</span>
              </a>
            </div>
            <p>{carrusel_p}</p>
          </div>
          
          <img src={p4PNG} alt="imgTuto" />
        </section>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
}

export { Index };
