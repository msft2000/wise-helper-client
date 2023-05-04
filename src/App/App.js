import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GeneralProvider } from "../context";
import "../css/App.css";
import { PerfilAdultoMayor } from "../pages/PerfilAdultoMayor";
import { TareasActivas } from "../pages/TareasActivas";
import { AgregarTarea } from "../pages/AgregarTarea";
import { Index } from "../pages/Index";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { TareasVoluntario } from "../pages/TareasV";
import { TareasAdulto } from "../pages/Tareas_A";
import { PerfilAyudante } from "../pages/PerfilAyudante";
import { Soporte } from "../pages/Soporte";
import { Soporte2 } from "../pages/Soporte2";
import { Soporte3 } from "../pages/Soporte3";
function App() {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/support" element={<Soporte3/>} />
          <Route path="/adult" element={<TareasAdulto />}/>
          <Route path="/adult/agregar-tarea" element={<AgregarTarea/>}/>
            <Route path="/adult/tareas"  />

            <Route path="/adult/perfil" element={<PerfilAdultoMayor/>}/>
            <Route path="/adult/support" element={<Soporte/>} />
          <Route path="/volunter" element={<TareasVoluntario/>}/>
            <Route path="/volunter/tareas" element={<TareasActivas />}/>
              
            <Route path="/volunter/perfil" element={<PerfilAyudante />} />
            <Route path="/volunter/support" element={<Soporte2/>} />
            
            
            {/* <Route path="soporte" element={<SoporteAyudante />} /> */}
          <Route path="/adtarea" element={<AgregarTarea />} />
          <Route path="/pam" element={<PerfilAdultoMayor />} />
          <Route path="/tareas" element={<TareasActivas />} />
        </Routes>
      </GeneralProvider>
    </BrowserRouter>
  );
}
export { App };
