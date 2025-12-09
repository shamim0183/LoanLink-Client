import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const LocationMap = ({ latitude, longitude, locationName }) => {
  const position = [latitude, longitude]

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl border-4 border-primary/20">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="font-semibold text-center">
              <p className="text-primary font-bold">{locationName}</p>
              <p className="text-sm">Level-4, 34, Awal Centre</p>
              <p className="text-sm">Dhaka 1213, Bangladesh</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default LocationMap
