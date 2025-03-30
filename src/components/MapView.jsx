import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Default map center (Change it dynamically if needed)
const defaultPosition = [53.3444, -6.2573];

const MapView = () => {
  return (
    <div className="w-full mt-4">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={defaultPosition}>
          <Popup>📍 You are here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
