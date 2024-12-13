import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ScaleControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statesData from "../../../gadm41_CMR_3.json";
import { useGlobalContext } from "@/app/context/globalContext";
import chroma from "chroma-js";
import { Icon } from "leaflet";
{
  /**
  const Region = {
  id_region: Number,
  nom_region: "",
};

const Departement = {
  id_departement: Number,
  nom_departement: "",
  region: Region,
};

const Arrondissement = {
  id_arrondissement: Number,
  nom_arrondissement: "",
  departement: Departement,
};

const CentreDeVote = {
  id_centre_vote: Number,
  nom_centre: "",
  arrondissement: Arrondissement,
};

const Coordonnees = {
  latitude: Number,
  longitude: Number,
};

const Candidat = {
  id_candidat: Number,
  nom_candidat: "",
  parti_politique: "",
};

const BureauDeVote = {
  id_bureau_vote: Number,
  nom_bureau: "",
  coordonnees: Coordonnees,
  centreVote: CentreDeVote,
};

const Resultats = {
  id_resultat: Number,
  bureauVote: BureauDeVote,
  candidat: Candidat,
  nombre_voix: Number,
  date_saisie: new Date(),
  annee_election: Number,
};


   */
}
const icon = new Icon({
  iconUrl: "marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
//const [activeEvent, setActiveEvent] = (useState < Resultats) | (null > null);

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
function getColor(d) {
  const scale = chroma.scale(["white", "red"]).domain([0, 1000]); // Ajustez la palette et les valeurs
  return scale(d);
}

function Mapss() {
  const { forecast } = useGlobalContext();
  const [activeCityCords, setActiveCityCords] = useState(null);

  useEffect(() => {
    if (!forecast || !forecast.coord) {
      return;
    }

    setActiveCityCords(forecast.coord);


  }, [forecast]);

  if (!activeCityCords) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div id="map" style={{ height: "100vh" }}>
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={6}
        scrollWheelZoom={true}
        className="rounded-lg m-4 w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[activeCityCords.lat, activeCityCords.lon]}
          icon={icon}
          eventHandlers={{
            click: () => {
              //setActiveEvent(event);
              console.log("Hello Ivan");
            },
          }}
        >
            <Popup>
              <div>
                <h3>Hello</h3>
               
              </div>
            </Popup>

  
        </Marker>
        <GeoJSON
          data={statesData}
          style={(feature) => ({
            fillColor: getColor(feature.properties.NAME_1),
            weight: 2,
            opacity: 1,
            color: "magenta",
            dashArray: "3",
            fillOpacity: 0.7,
          })}
        />

        <ScaleControl position="bottomleft" imperial={false} />
        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Mapss;
