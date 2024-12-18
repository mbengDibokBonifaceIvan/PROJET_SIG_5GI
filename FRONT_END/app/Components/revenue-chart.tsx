import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./lib/fonts";
import { generateYAxis } from "./lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import Resultat from "./Results/Resultat";

interface Region {
  id_region: number;
  nom_region: string;
}

interface Departement {
  id_departement: number;
  nom_departement: string;
  region: Region;
}

interface Arrondissement {
  id_arrondissement: number;
  nom_arrondissement: string;
  departement: Departement;
}

interface CentreDeVote {
  id_centre_vote: number;
  nom_centre: string;
  arrondissement: Arrondissement;
}

interface Coordonnees {
  latitude: number;
  longitude: number;
}

interface Candidat {
  id_candidat: number;
  nom_candidat: string;
  parti_politique: string;
}

interface BureauDeVote {
  id_bureau_vote: number;
  nom_bureau: string;
  coordonnees: Coordonnees;
  centreVote: CentreDeVote;
}

interface Resultat {
  id_resultat: number;
  bureauVote: BureauDeVote;
  candidat: Candidat;
  nombre_voix: number;
  date_saisie: Date;
  annee_election: number;
}

 const today = new Date().toLocaleDateString("en-US", {
   day: "numeric",
   month: "long",
   year: "numeric",
 });

export default function ResultatChart() {
  const [resultat, setResultat] = useState<Resultat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Resultat[]>(
          "http://localhost:8080/resultats/all"
        );
        setResultat(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats:", error);
      }
    };

    fetchData();
  }, []);
const selectedBureauDeVoteId = 1; // Remplacez 123 par l'ID du bureau de vote souhaité

const filteredResultats = resultat.filter(
  (resultat) => resultat.bureauVote.id_bureau_vote === selectedBureauDeVoteId
);

const chartHeight = 350;
const { yAxisLabels, topLabel } = generateYAxis(filteredResultats);

if (!filteredResultats || filteredResultats.length === 0) {
  return <p className="mt-4 text-gray-900">No data available.</p>;
}
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        VOTE PAR CANDIDAT
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-900 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {filteredResultats.map((candidatVote: Resultat) => (
            <div
              key={candidatVote.candidat.nom_candidat}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-md bg-blue-600"
                style={{
                  height: `${
                    (chartHeight / topLabel) * candidatVote.nombre_voix
                  }px`,
                }}
              ></div>
              <p className="rotate-90 text-sm text-gray-900 sm:rotate-0">
                {candidatVote.candidat.nom_candidat}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-900" />
          <h3 className="text-sm text-gray-500">Mis à jour le {today}</h3>
        </div>
      </div>
    </div>
  );
}
