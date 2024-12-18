import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./lib/fonts";
import { generateYAxis } from "./lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export type Region = {
  id_region: number;
  nom_region: string;
};
export type Departement = {
  id_departement: number;
  nom_departement: string;
  region: Region;
};
export type Arrondissement = {
  id_arrondissement: number;
  nom_arrondissement: string;
  departement: Departement;
};
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

export default function ResultatChart() {
  const [resultats, setResultats] = useState<Resultat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/resultats/totalVoixByCandidatWithNames"
        );
        setResultats(
          response.data.map((data: any) => ({
            id_resultat: data[0],
            candidat: { nom_candidat: data[1] },
            nombre_voix: data[2],
          }))
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats:", error);
      }
    };

    fetchData();
  }, []);

  if (!resultats || resultats.length === 0) {
    return (
      <>
        <Skeleton className="h-[12rem] w-full" />;
      </>
    );
  }

  const maxVotes = Math.max(
    ...resultats.map((resultat) => resultat.nombre_voix)
  );

  return (
    <div className="w-full md:col-span-4 bg-white dark:bg-dark-grey  p-6 border rounded-lg shadow-md">
      <h2
        className={`${lusitana.className} mb-4 text-xl md:text-2xl text-black dark:text-white`}
      >
        Résultats Généraux par candidat
      </h2>

      {resultats.map((resultat) => (
        <div key={resultat.candidat.nom_candidat} className="mb-4">
          <p className="font-semibold text-gray-700 dark:text-white">
            {resultat.candidat.nom_candidat}
          </p>
          <div className="bg-blue-300 dark:bg-white rounded-lg h-10 relative">
            <div
              className="bg-blue-500 dark:bg-blue-700 h-10 rounded-lg"
              style={{ width: `${(resultat.nombre_voix / maxVotes) * 100}%` }}
            ></div>
            <p className="absolute inset-y-0 right-2 flex items-center text-white font-semibold dark:text-gray-500">
              {resultat.nombre_voix} voix
            </p>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-end mt-4">
        <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-300 mr-2" />
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Mis à jour le{" "}
          {new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
