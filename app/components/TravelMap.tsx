"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Place = {
  name: string;
  latitude: number;
  longitude: number;
};

type Props = {
  places: Place[];
};

export default function TravelMap({ places }: Props) {
  if (!places.length) {
    return null;
  }

  const firstPlace = places[0];

  return (
    <div className="mt-8 overflow-hidden rounded-2xl">
      <MapContainer
        center={[firstPlace.latitude, firstPlace.longitude]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place, index) => (
          <Marker
            key={index}
            position={[place.latitude, place.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <strong>{place.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}