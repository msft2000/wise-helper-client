/* eslint-disable no-unused-vars */
import React from "react";
import "../sass/chl_terminos_condiciones.scss";
import imgTerm from "../assets/img/term.png";
import { Header as HeaderVoluntario } from "../components/Header_Voluntario";
import { Header as HeaderAdulto } from "../components/Header_Adulto";
import { Header as HeaderIndex } from "../components/Header_Index";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
function TerminosCondiciones() {
  const url = window.location.href;
  return (
    <div className="TerminosCondiciones">

      {url.includes("adult") ? (
        <HeaderAdulto />
      ) : url.includes("volunter") ? (
        <HeaderVoluntario />
      ) : (
        <HeaderIndex></HeaderIndex>
      )}

      <div className="container">
        <div class="div1">
          <h1> Terminos y Condiciones</h1>
          Bienvenido a nuestra aplicación de atención a adultos mayores. Antes
          de utilizar nuestra aplicación, te pedimos que leas detenidamente los
          siguientes términos y condiciones. Al descargar, instalar o utilizar
          nuestra aplicación, estás aceptando cumplir con estos términos y
          condiciones, por lo que es importante que los entiendas completamente.
          Si no estás de acuerdo con estos términos, te recomendamos no utilizar
          nuestra aplicación.
          <h2>Uso de la Aplicación:</h2>
          1.1. Nuestra aplicación está diseñada para brindar servicios de
          atención y cuidado a adultos mayores. Debes utilizarla de acuerdo con
          su propósito previsto y no utilizarla para fines ilegales o
          inapropiados.
          <br /> 1.2. La aplicación está destinada a ser utilizada por adultos
          mayores y sus cuidadores autorizados. Si eres menor de edad,
          necesitarás el consentimiento y la supervisión de un adulto para
          utilizarla.
          <h2>Registro y Cuenta:</h2>
          2.1. Para acceder a ciertas funciones de la aplicación, es posible que
          debas registrarte y crear una cuenta.
          <br /> 2.2. La información que proporciones durante el proceso de
          registro debe ser precisa, completa y actualizada. Eres responsable de
          mantener la confidencialidad de tus credenciales de inicio de sesión y
          de todas las actividades que ocurran en tu cuenta.
          <h2>Privacidad y Datos Personales:</h2>
          3.1. Al utilizar nuestra aplicación, aceptas nuestra Política de
          Privacidad, que describe cómo recopilamos, utilizamos y divulgamos tus
          datos personales.
          <br />
          3.2. Nos comprometemos a proteger tu privacidad y a utilizar tus datos
          personales de acuerdo con las leyes y regulaciones aplicables. Sin
          embargo, no podemos garantizar la seguridad absoluta de la información
          transmitida a través de Internet o almacenada en nuestros sistemas.
          <h2>Propiedad Intelectual:</h2>
          4.1. Nuestra aplicación y todo su contenido, incluidos pero no
          limitados a textos, gráficos, logotipos, imágenes, videos, iconos y
          software, están protegidos por derechos de propiedad intelectual y son
          propiedad nuestra o de nuestros licenciantes.
          <br />
          4.2. No se te otorga ningún derecho de propiedad sobre la aplicación o
          su contenido, excepto una licencia limitada, no exclusiva,
          intransferible y revocable para utilizar la aplicación de acuerdo con
          estos términos y condiciones.
          <h2>Limitación de Responsabilidad:</h2>
          5.1. La aplicación se proporciona "tal cual" y no ofrecemos ninguna
          garantía sobre su disponibilidad, funcionalidad, exactitud o idoneidad
          para un propósito particular.
          <br />
          5.2. No seremos responsables por ningún daño directo, indirecto,
          incidental, especial o consecuente que surja del uso o la
          imposibilidad de utilizar la aplicación, incluso si se nos ha
          informado de la posibilidad de dichos daños.
          <h2>Modificaciones y Terminación:</h2>
          6.1. Nos reservamos el derecho de modificar o suspender la aplicación
          en cualquier momento, sin previo aviso.
          <br />
          6.2. También nos reservamos el derecho de terminar tu acceso a la
          aplicación si violas estos términos y condiciones o si consideramos
          que tu uso de la aplicación es perjudicial para nosotros, otros
          usuarios o terceros.
          <br />
          Estos términos y condiciones constituyen el acuerdo completo entre tú
          y nosotros con respecto a la aplicación de atención a adultos mayores.
          Si tienes alguna duda, Contactanos
        </div>
        <div class="div2">
          <img src={imgTerm} alt="" style={{ width: "100%" }} />
        </div>
      </div>
    <Footer></Footer>
    </div>
  );
}
export { TerminosCondiciones };
