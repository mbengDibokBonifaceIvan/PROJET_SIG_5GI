import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { pollIcon } from "../../utils/Icons";
//import { Candidat, Resultat } from "../lib/utils"; // Might not be needed depending on your data structure
import axios from "axios";

const colors = ["#FF6633", "#FFB399", "#FF33FF", "#3366E6", "#00a64f"];

interface resultat {
  totalVoix: number;
  nomCandidat: string;
}

const Histogramme: React.FC = () => {
  const { fiveDayForecast } = useGlobalContext();
  const { city, list } = fiveDayForecast;
  const { bureauDeVote } = useGlobalContext();
  console.log(bureauDeVote.id_bureau_vote);

  if (!bureauDeVote || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }


  const [fetchedVotes, setFetchedVotes] = useState<resultat[]>([]); 
  const [totalVotes, setTotalVotes] = useState(0); 

  useEffect(() => {
  
    const fetchVotesResults = async () => {
      try {
        const bureauId = bureauDeVote.id_bureau_vote;
        console.log(bureauId)
        const res = await axios.get(
          `http://localhost:8080/resultats/totalVoixByCandidatAndBureauDeVote/${bureauId}`
        );
        console.log(res.data);
        setFetchedVotes(res.data);

        // Calculate total votes (assuming data structure from your API response)
        const total = res.data.reduce(
          (acc:number, result: resultat) => acc + result.totalVoix,
          0
        );
        setTotalVotes(total);
      } catch (error:any) {
        console.log(
          "Erreur sur la récupération des résultats: ",
          error.message
        );
      }
    };

    fetchVotesResults();
  }, [bureauDeVote]);

  const hasCompleteData =
    fetchedVotes.length > 0 &&
    fetchedVotes.every(
      (result) => result.nomCandidat && typeof result.totalVoix === "number"
    );
  
  return (
    <div className="rounded-lg border shadow-md p-12 dark:text-gray-100">
      <h2 className="font-medium mb-4 ">
        <span className="flex items-center gap-2 font-medium text-blue-500 ">
          {pollIcon} Histogramme des Votes à {city.name}/
          {bureauDeVote.nom_bureau}
        </span>
      </h2>
      <div className="flex flex-col gap-4">
        {!hasCompleteData && (
          <div>
            Aucune donnée de vote valide n'a pu être récupérée. Veuillez
            vérifier votre connexion internet ou contacter l'administrateur.
          </div>
        )}
        {hasCompleteData && (
          <>
            {fetchedVotes.map((result, i) => (
              <div key={i} className="flex items-center gap-4 text-nowrap">
                <div style={{ width: "120px" }}>{result.nomCandidat}:</div>
                <div className="flex items-center w-full">
                  <div className="w-3/4 bg-gray-200 h-8 rounded-lg relative">
                    <div
                      className="h-full rounded-lg"
                      style={{
                        width: `${(result.totalVoix / totalVotes) * 100}%`,
                        backgroundColor: colors[i % colors.length],
                      }}
                    >
                      <span className="absolute right-2 text-xs p-2 text-gray-600">
                        {((result.totalVoix / totalVotes) * 100).toFixed(3)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Histogramme;
