import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GeneralProvider } from "../context";
import "../css/App.css";
import { PerfilAdultoMayor } from "../pages/PerfilAdultoMayor";
import { Prueba } from "../pages/Prueba";
import { TareasActivas } from "../pages/TareasActivas";
import { AgregarTarea } from "../pages/AgregarTarea";
import { Index } from "../pages/Index";
import { Login } from "../pages/RB_Login";
import { Signup } from "../pages/RB_Signup";
import { TareasVoluntario } from "../pages/RB_TareasV";
import { TareasAdulto } from "../pages/RB_Tareas_A";
import { PerfilAyudante } from "../pages/PerfilAyudante";
import { Soporte } from "../pages/RB_Soporte";
import { Soporte2 } from "../pages/Soporte2";
import { Soporte3 } from "../pages/Soporte3";
import { TareaFinAdulto } from "../pages/TareaFinAdulto";
import { TareaFinVoluntario } from "../pages/TareaFinVoluntario";
import { TerminosCondiciones } from "../pages/TerminosCondiciones";
import { SoporteMessage } from "../pages/SoporteMessage";
import { TareasHistorialAdulto } from "../pages/RB_Tareas_Historial_A";

function App() {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <Routes>
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/support" element={<Soporte3 />} />
          <Route path="/support/send-message" element={<SoporteMessage />} />
          <Route path="/adult" element={<TareasAdulto />} />
          <Route
            path="/adult/support/send-message"
            element={<SoporteMessage />}
          />
          <Route path="/tyc" element={<TerminosCondiciones />} />
          <Route path="/adult/agregar-tarea" element={<AgregarTarea />} />
          <Route path="/adult/finalizar" element={<TareaFinVoluntario />} />
          <Route path="/adult/tareas" element={<TareasHistorialAdulto />} />
          <Route path="/adult/perfil" element={<PerfilAdultoMayor />} />
          <Route path="/adult/support" element={<Soporte />} />
          <Route path="/volunter" element={<TareasVoluntario />} />
          <Route path="/volunter/tareas" element={<TareasActivas />} />
          <Route
            path="/volunter/tareas/finalizar"
            element={<TareaFinAdulto />}
          />
          <Route path="/volunter/perfil" element={<PerfilAyudante />} />
          <Route path="/volunter/support" element={<Soporte2 />} />
          <Route
            path="/volunter/support/send-message"
            element={<SoporteMessage />}
          />
          2{/* <Route path="soporte" element={<SoporteAyudante />} /> */}
          <Route path="/adtarea" element={<AgregarTarea />} />
          <Route path="/pam" element={<PerfilAdultoMayor />} />
          <Route path="/tareas" element={<TareasActivas />} />
        </Routes>
      </GeneralProvider>
    </BrowserRouter>
  );
}
export { App };
