import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  ScaleControl,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statesData from "../../../gadm41_CMR_3.json";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { Icon } from "leaflet";

const icon = new Icon({
  iconUrl: "marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyToActiveCity({ activeCityCords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 8;
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

function getColor(region) {
  const colorMap = {
    Adamaoua: "#800026",
    Centre: "#BD0026",
    Est: "#E31A1C",
    Littoral: "#FC4E2A",
    Nord: "#FD8D3C",
    "Nord-Ouest": "#FEB24C",
    Ouest: "#FED976",
    Sud: "#FFEDA0",
    "Sud-Ouest": "#41B6C4",
    "Extrême-Nord": "#225EA8",
  };

  return colorMap[region] || "#ccc"; // Retourne la couleur associée à la région ou une couleur par défaut
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();
}

function Mapss() {
  const { forecast } = useGlobalContext();
  const [activeCityCords, setActiveCityCords] = useState(null);
  const geoJsonRef = useRef(null); // Référencer la couche GeoJSON
  const { bureauDeVote, votesResults } = useGlobalContext();
  const { BaseLayer } = LayersControl;
  useEffect(() => {
    if (!forecast || !forecast.coord) {
      return;
    }

    setActiveCityCords(forecast.coord);
  }, [forecast]);

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        console.log(feature.properties.NAME_1);
        highlightFeature({ target: layer });
      },
      mouseout: () => {
        geoJsonRef.current.resetStyle(layer); 
      },
    });
  };

  if (!activeCityCords) {
    return (
      <div>
        <h1>Chargement de la carte...</h1>
      </div>
    );
  }

  return (
    <div id="map" style={{ height: "100vh" }}>
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={8}
        scrollWheelZoom={true}
        className="rounded-lg m-4 w-full h-full"
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> WebGenius 2025'
            />
          </BaseLayer>
          <BaseLayer name="CartoDB">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://carto.com/">CartoDB</a> WebGenius 2025'
            />
          </BaseLayer>
        </LayersControl>

        <Marker
          position={[activeCityCords.lat, activeCityCords.lon]}
          icon={icon}
          eventHandlers={{
            click: () => {
              console.log("Hello Ivan");
            },
          }}
        >
          <Popup>
            <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Bienvenue au bureau de vote {bureauDeVote.nom_bureau}!
              </h3>
              {votesResults.length > 0 ? (
                <ul className="mt-4">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Voici les résultats de cette zone:
                  </p>
                  {votesResults.map((resultat, index) => (
                    <li key={index} className="mb-2">
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        Session {resultat.annee_election}
                      </p>
                      <p className="text-md text-gray-700 dark:text-gray-300">
                        {resultat.candidat.nom_candidat}: {resultat.nombre_voix}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-md text-red-600 dark:text-red-400 mt-4">
                  Aucun résultat trouvé pour ce bureau de vote.
                </p>
              )}
            </div>
          </Popup>
        </Marker>

        <GeoJSON
          ref={geoJsonRef}
          data={statesData}
          style={(feature) => ({
            fillColor: getColor(feature.properties.NAME_1),
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
          })}
          onEachFeature={onEachFeature}
        />

        <ScaleControl position="bottomleft" imperial={false} />
        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Mapss;
