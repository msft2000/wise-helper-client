import React from "react";
import { useNavigate } from "react-router-dom";
import imgLogo from '../assets/img/logo.png'
import {GrMail} from 'react-icons/gr';
import {ImLocation,ImPhone} from 'react-icons/im';
import {MdWatchLater,MdKeyboardArrowRight} from 'react-icons/md';
import '../sass/components/footer.scss';
function Footer(){
    const navigate=useNavigate();//Para navegar entre paginas del sitio
    return(
        <footer className="footer">
            <section className="logo">
                <img src={imgLogo} alt="" />
                <h1>WiseHelpers</h1>
                <h2>© 2023 Todos los Derechos Reservados</h2>
            </section>

            <section className="aboutUs">
                <h1>Sobre nosotros</h1>
                <p>En WiseHelpers, conectamos adultos mayores con voluntarios comprometidos. Nuestra misión es aliviar la carga de las tareas diarias para los mayores, fomentando una comunidad solidaria.  Valoramos la interacción intergeneracional y trabajamos arduamente para brindar un apoyo confiable y respetuoso.  Únete a WiseHelpers y sé parte de esta comunidad dedicada al bienestar de nuestros mayores.</p>
            </section>

            <section className="contacto">
                <h1>Contactanos</h1>
                <div>
                    <ImLocation/>
                    <p>Calle Benigno Malo 12-34, Cuenca, Azuay, Ecuador</p>
                </div>
                <div>
                    <ImPhone/>
                    <p>+593 9 8765 4321</p>
                </div>
                <div>
                    <GrMail/>
                    <p>contacto@wisehelpers.com</p>
                </div>
                <div>
                    <MdWatchLater/>
                    <p>Lun-Vie: 9:00 a.m. - 6:00 p.m. (Ecuador)</p>
                </div>
            </section>

            <section className="links">
                <h1>Enlaces de utilidad</h1>
                <ul>
                    <li><MdKeyboardArrowRight/><a href="">Inicio</a></li>
                    <li><MdKeyboardArrowRight/><a href="">Nuestros Voluntarios</a></li>
                    <li><MdKeyboardArrowRight/><a href="">Soporte</a></li>
                    <li><MdKeyboardArrowRight/><a href="">Términos y Condiciones</a></li>
                    <li><MdKeyboardArrowRight/><a href="">FAQ</a></li>
                </ul>
            </section>

        </footer>
    );
}

export {Footer};