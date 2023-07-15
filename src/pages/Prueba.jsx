import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
function Prueba(){
    return(
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution=''
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
            </Marker>
        </MapContainer>
    );
}
export {Prueba};