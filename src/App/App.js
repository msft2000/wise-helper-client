import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GeneralProvider } from "../context";
import { FinYPago } from "../pages/FinalizarYPagar";

function App() {
    return (
        <BrowserRouter>
            <GeneralProvider>
                <Routes>
                    <Route path="/" element={<FinYPago />} />
                </Routes>
            </GeneralProvider>
        </BrowserRouter>
    );
}
export { App };