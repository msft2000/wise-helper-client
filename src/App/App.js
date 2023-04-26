import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { GeneralProvider } from "../context";
import "../css/App.css";
import { PerfilAdultoMayor } from "../pages/PerfilAdultoMayor";
import { TareasActivas } from "../pages/TareasActivas";
import { AgregarTarea } from "../pages/AgregarTarea";
import { AdminLogin } from "../pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="Index" style={{
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center",
                "fontSize": "x-large",
              }}>
                <h1>Pages</h1>
                <Link to="/login">Login</Link>
                <Link to="/adtarea">Agregar Tarea</Link>
                <Link to="/pam">Perfil Adulto Mayor</Link>
                <Link to="/tareas">Tareas Activas</Link>
              </div>
            }
          />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/adtarea" element={<AgregarTarea />} />
          <Route path="/pam" element={<PerfilAdultoMayor />} />
          <Route path="/tareas" element={<TareasActivas />} />
        </Routes>
      </GeneralProvider>
    </BrowserRouter>
  );
}
export { App };
