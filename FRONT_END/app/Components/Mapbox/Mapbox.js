"use client";
import React, { useEffect } from "react";
import {
  LayersControl,
  MapContainer,
  TileLayer,
  ScaleControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";
const { BaseLayer } = LayersControl;


function FlyToActiveCity({ activeCityCords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo(
        [activeCityCords.lat, activeCityCords.lon],
        zoomLev,
        flyToOptions
      );
    }
  }, [activeCityCords, map]);

  return null;
}

function Mapbox() {
  const { forecast } = useGlobalContext(); // Your coordinates

  const activeCityCords = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 border rounded-lg w-full h-full">
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={6}
        scrollWheelZoom={false}
        className="rounded-lg m-4 w-full h-full"
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 5GI_2024_ENSPY'
            />
          </BaseLayer>
          <BaseLayer name="CartoDB">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://carto.com/">CartoDB</a> 5GI_2024_ENSPY'
            />
          </BaseLayer>
        </LayersControl>

        <ScaleControl position="bottomleft" imperial={false} />
        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;
