import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GeneralProvider } from "../context";
import "../css/App.css";
import { PerfilAdultoMayor } from "../pages/MF_Perfil_Adulto";
import { Prueba } from "../pages/Prueba";
import { TareasActivas } from "../pages/MF_Tareas_Voluntario_Activas";
import { AgregarTarea } from "../pages/MF_Agregar_Tarea";
import { Index } from "../pages/MR_Index";
import { Login } from "../pages/RB_Login";
import { Signup } from "../pages/RB_Signup";
import { TareasVoluntario } from "../pages/RB_Tareas_Voluntario";
import { TareasAdulto } from "../pages/RB_Tareas_Adulto";
import { PerfilVoluntario} from "../pages/CHL_Perfil_Voluntario";
import { Soporte } from "../pages/RB_Soporte";
import { TareaFinAdulto } from "../pages/CHL_TareaFin_Adulto";
import { TareaFinVoluntario } from "../pages/CHL_TareaFin_Voluntario";
import { TerminosCondiciones } from "../pages/CHL_Terminos_Condiciones";
import { SoporteMessage } from "../pages/MR_SoporteMessage";
import { TareasHistorialAdulto } from "../pages/RB_Tareas_Historial_Adulto";

function App() {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <Routes>
          <Route path="/prueba" element={<Prueba />} />
          {/* Paginas del index */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/support" element={<Soporte/>} />
          <Route path="/support/send-message" element={<SoporteMessage />} />
          <Route path="/support/tyc" element={<TerminosCondiciones />} />
          {/* Paginas del adulto mayor */}
          <Route path="/adult" element={<TareasAdulto />} />
          <Route path="/adult/agregar-tarea" element={<AgregarTarea />} />
          <Route path="/adult/finalizar" element={<TareaFinVoluntario />} />
          <Route path="/adult/tareas" element={<TareasHistorialAdulto />} />
          <Route path="/adult/perfil" element={<PerfilAdultoMayor />} />
          <Route path="/adult/support" element={<Soporte/>} />
          <Route path="/adult/support/send-message" element={<SoporteMessage />}/>
          <Route path="/adult/support/tyc" element={<TerminosCondiciones />} />
          {/* Paginas del voluntario */}
          <Route path="/volunter" element={<TareasVoluntario />} />
          <Route path="/volunter/tareas" element={<TareasActivas />} />
          <Route path="/volunter/tareas/finalizar" element={<TareaFinAdulto />}/>
          <Route path="/volunter/perfil" element={<PerfilVoluntario />} />
          <Route path="/volunter/support" element={<Soporte/>} />
          <Route path="/volunter/support/send-message" element={<SoporteMessage />}/>
          <Route path="/volunter/support/tyc" element={<TerminosCondiciones />} />
        </Routes>
      </GeneralProvider>
    </BrowserRouter>
  );
}
export { App };
