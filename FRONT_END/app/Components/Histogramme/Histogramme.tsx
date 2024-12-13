import React from "react";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { pollIcon } from "../../utils/Icons";

const colors = ["#FF6633", "#FFB399", "#FF33FF", "#3366E6", "#00a64f"];

interface CandidateData {
  main: { temp_min: number; temp_max: number };
  dt: number;
}

interface ProcessedData {
  candidate: string;
  votes: number;
}

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

interface Resultats {
  id_resultat: number;
  bureauVote: BureauDeVote;
  candidat: Candidat;
  nombre_voix: number;
  date_saisie: Date;
  annee_election: number;
}

function processData(
  votesResults: Resultats[],
  candidatData: Candidat[]
): ProcessedData[] {
  return candidatData.map((candidat, index) => {
    const totalVotes = votesResults
      .filter((result) => result.candidat.id_candidat === candidat.id_candidat)
      .reduce((acc, result) => acc + result.nombre_voix, 0);
    return {
      candidate: candidat.nom_candidat, // Assuming 'nom' is the field for candidate name in Candidats model
      votes: totalVotes,
    };
  });
}

const Histogramme: React.FC = () => {
  const { fiveDayForecast, bureauDeVote, candidatData, votesResults } =
    useGlobalContext();
  const { city, list } = fiveDayForecast;
  const { setActiveCityCoords } = useGlobalContextUpdate();

  if (!bureauDeVote || !candidatData || !votesResults) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const processedCandidates = processData(votesResults, candidatData).slice(
    0,
    5
  );

  const totalVotes = processedCandidates.reduce(
    (acc, candidate) => acc + candidate.votes,
    0
  );

  return (
    <div className="rounded-lg border shadow-md p-12 dark:text-gray-100">
      <h2 className="font-medium mb-4 ">
        <span className="flex items-center gap-2 font-medium text-blue-500 ">
          {pollIcon} Histogramme des Votes à {city.name}
        </span>
      </h2>
      <div className="flex flex-col gap-4">
        {processedCandidates.map((candidateData, i) => (
          <div key={i} className="flex items-center gap-4 text-nowrap">
            <div style={{ width: "120px" }}>{candidateData.candidate}:</div>
            <div className="flex items-center w-full">
              <div className="w-3/4 bg-gray-200 h-8 rounded-lg relative">
                <div
                  className="h-full rounded-lg"
                  style={{
                    width: `${(candidateData.votes / totalVotes) * 100}%`,
                    backgroundColor: colors[i % colors.length],
                  }}
                >
                  <span className="absolute right-2 text-xs p-2 text-gray-600">
                    {((candidateData.votes / totalVotes) * 100).toFixed(3)}%
                  </span>
                </div>
              </div>
              <div className="text-xl text-blue-200 ml-2 dark:text-gray-200 text-nowrap px-5">
                {candidateData.votes} K
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Histogramme;
