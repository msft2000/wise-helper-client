import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GeneralProvider } from "../context";
import { FinYPago } from "../pages/FinalizarYPagar";
import "../css/App.css";
import { PerfilAdultoMayor } from "../pages/PerfilAdultoMayor";

function App() {
    return (
        <BrowserRouter>
            <GeneralProvider>
                <Routes>
                    <Route path="/" element={<FinYPago />} />
                    <Route path="/perfil-adulto-mayor" element={<PerfilAdultoMayor />} />
                    
                </Routes>
            </GeneralProvider>
        </BrowserRouter>
    );
}
export { App };