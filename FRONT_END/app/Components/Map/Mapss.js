import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  ScaleControl,
  useMap,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "leaflet";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import statesData from "../../../gadm41_CMR_3.json";


// Style personnalisé pour le conteneur de la carte
const mapContainerStyle = {
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  
};

// Création d'une icône personnalisée avec animation
const icon = new Icon({
  iconUrl: "marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "pulse-marker",
});

// Composant pour l'animation de transition vers une ville
function FlyToActiveCity({ activeCityCords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLevel = 8;
      map.flyTo([activeCityCords.lat, activeCityCords.lon], zoomLevel, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [activeCityCords, map]);

  return null;
}

// Fonction pour obtenir la couleur des régions avec une palette améliorée
function getColor(region) {
  const colorMap = {
    Adamaoua: "#1a237e",
    Centre: "#311b92",
    Est: "#4a148c",
    Littoral: "#006064",
    Nord: "#004d40",
    "Nord-Ouest": "#1b5e20",
    Ouest: "#33691e",
    Sud: "#bf360c",
    "Sud-Ouest": "#3e2723",
    "Extrême-Nord": "#263238",
  };
  return colorMap[region] || "#78909c";
}

function Mapss() {
  const { forecast, bureauDeVote, votesResults } = useGlobalContext();
  const [activeCityCords, setActiveCityCords] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [showLegend, setShowLegend] = useState(true);
  const geoJsonRef = useRef(null);
  const { BaseLayer } = LayersControl;

  // Mémorisation des styles GeoJSON pour éviter les re-rendus inutiles
  const geoJsonStyle = useMemo(() => {
    return (feature) => ({
      fillColor: getColor(feature.properties.NAME_1),
      weight: activeRegion === feature.properties.NAME_1 ? 4 : 2,
      opacity: 1,
      color: "white",
      dashArray: activeRegion === feature.properties.NAME_1 ? "" : "3",
      fillOpacity: activeRegion === feature.properties.NAME_1 ? 0.8 : 0.6,
    });
  }, [activeRegion]);

  useEffect(() => {
    if (forecast?.coord) {
      setActiveCityCords(forecast.coord);
    }
  }, [forecast]);

  // Gestionnaire d'événements amélioré pour les régions
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        setActiveRegion(feature.properties.NAME_1);
        layer.setStyle({
          weight: 4,
          opacity: 1,
          dashArray: "",
          fillOpacity: 0.8,
        });
        layer.bringToFront();
      },
      mouseout: (e) => {
        setActiveRegion(null);
        geoJsonRef.current?.resetStyle(layer);
      },
      click: (e) => {
        const map = e.target._map;
        map.fitBounds(e.target.getBounds(), {
          padding: [50, 50],
          duration: 1,
        });
      },
    });
  };

  // Composant de légende
  const Legend = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute bottom-8 left-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-[1000]"
    >
      <h4 className="font-bold mb-2 dark:text-white">Régions</h4>
      {Object.entries(getColor("")).map(([region, color]) => (
        <div key={region} className="flex items-center mb-1">
          <div
            className="w-4 h-4 mr-2 rounded"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm dark:text-white">{region}</span>
        </div>
      ))}
    </motion.div>
  );

  if (!activeCityCords) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-gray-700 dark:text-white"
        >
          Chargement de la carte...
        </motion.div>
      </div>
    );
  }

  return (
    <div style={mapContainerStyle}>
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={8}
        zoomControl={false}
        className="w-full h-full rounded-lg"
      >
        <ZoomControl position="bottomright" />
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

        <AnimatePresence>{showLegend && <Legend />}</AnimatePresence>

        <motion.div
          initial={false}
          animate={{ scale: 1 }}
          className="map-marker"
        >
          <Marker
            position={[activeCityCords.lat, activeCityCords.lon]}
            icon={icon}
          >
            <Popup className="custom-popup">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-md"
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {bureauDeVote.nom_bureau}
                </h3>
                {votesResults.length > 0 ? (
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      Session {new Date().getFullYear()}
                    </h4>
                    {votesResults.map((resultat, index) => (
                      <motion.li
                        key={index}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        className="mb-4 border-b last:border-b-0 pb-2"
                      >
                        <p className="text-gray-700 dark:text-gray-300">
                          {resultat.candidat.nom_candidat}:{" "}
                          {resultat.nombre_voix} voix
                        </p>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 dark:text-red-400"
                  >
                    Aucun résultat disponible
                  </motion.p>
                )}
              </motion.div>
            </Popup>
          </Marker>
        </motion.div>

        <GeoJSON
          ref={geoJsonRef}
          data={statesData}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />

        <ScaleControl position="bottomleft" imperial={false} />
        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowLegend(!showLegend)}
        className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-[1000]"
      >
        {showLegend ? "Masquer légende" : "Afficher légende"}
      </motion.button>
    </div>
  );
}

export default Mapss;
