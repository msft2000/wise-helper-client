import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header_Admin";
import "../sass/mf_administrar_usuarios.scss";

function AdministrarUsuarios() {
  return (
    <React.Fragment>
      <Header />
      <div id="administrar-usuarios">
        <h1>Administrar Usuarios</h1>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export { AdministrarUsuarios };
