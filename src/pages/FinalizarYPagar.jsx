import React from "react";
import { Menu } from "../components/Menu";
import "../css/FinYpago.css";
import logoTienda from "../assets/img/logoTienda.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PaidIcon from "@mui/icons-material/Paid";
import AddCardIcon from "@mui/icons-material/AddCard";
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

function FinYPago() {
    return (
        <div id="finYPago--container">
            <Menu />
            <div className="especificaciones-finYPago--container">
                <div className="especificaciones-section--container">
                    <h2>Direccion de Entrega</h2>
                    <p className="direccion-texto">
                        Avenida 6 de Diciembre, Quito, Ecuador
                    </p>
                    <label className="info-adicional" htmlFor="info-adicional">
                        Instrucciones de Entrega (Opcional)
                    </label>
                    <input
                        className="info-adicional--input"
                        name="info-adicional"
                        type="text"
                        placeholder="Detalles Adicionales..."
                    />
                    <h2>Tienda</h2>
                    <div className="tienda-especificaciones--container">
                        <img src={logoTienda} alt="Logo-tienda" />
                        <div className="tienda-especificaciones--info">
                            <p>1 producto</p>
                            <ArrowDropDownIcon />
                        </div>
                    </div>
                    <div className="entrega-especification-container">
                        <p className="entrega-text">Entrega Estimada</p>
                        <p className="entrega-time">24 - 39 min</p>
                    </div>
                    <h2>Metodo de Pago</h2>
                    <div className="metodo-pago--container">
                        <div className="metodo-pago--info">
                            <PaidIcon />
                            <p>Efectivo</p>
                        </div>
                        <input type="radio" />
                    </div>
                    <div className="agregar-tarjeta--container">
                        <div className="agregar-tarjeta--text">
                            <AddCardIcon />
                            <p>Agregar Tarjeta de credito o debito</p>
                        </div>
                        <ArrowRightRoundedIcon />
                    </div>
                    <h2>Añade Propina</h2>
                    <div className="propina--container">
                        <div className="propinas-content--container">
                          <button>$0.60</button>
                        </div>
                        <div className="propinas-content--container">
                          <button>$1.15</button>
                        </div>
                        <div className="propinas-content--container">
                          <button>$1.70</button>
                        </div>
                        <div className="propinas-content--container">
                          <button>Otro</button>
                          <EditRoundedIcon />
                        </div>
                    </div>
                </div>
                <div className="resumen-section--container">
                    <div className="resumen-info-container">
                        <h2>Resumen</h2>
                        <table>
                            <tr>
                                <td>Costo Productos</td>
                                <td>$11.05</td>
                            </tr>
                            <tr>
                                <td>Tarifa de Servicio</td>
                                <td>$0.00</td>
                            </tr>
                            <tr>
                                <td>Costo Envio</td>
                                <td>$0.00</td>
                            </tr>
                            <tr>
                                <td>Propina</td>
                                <td>$1.15</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>$12.20</td>
                            </tr>
                            <tr>
                                <td>Ver Detalle</td>
                                <td>Asi funcionan los costos</td>
                            </tr>
                        </table>
                    </div>
                    <button>Finalizar Compra</button>
                </div>
            </div>
        </div>
    );
}

export { FinYPago };
