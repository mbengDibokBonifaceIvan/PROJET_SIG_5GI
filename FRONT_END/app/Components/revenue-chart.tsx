import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./lib/fonts";
import { generateYAxis, ResultatNational } from "./lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";

const today = new Date().toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ResultatChart() {
  const [resultat, setResultat] = useState<ResultatNational[]>([]);
  const [hasError, setHasError] = useState(false); 

  useEffect(() => {
    const fetchVotesResults = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/resultats/totalVoixByCandidatWithNames"
        );
        setResultat(res.data);
      } catch (error: any) {
        console.error(
          "Erreur sur la récupération des résultats:",
          error.message
        );
        setHasError(true); // Set error flag
      }
    };

    fetchVotesResults();
  }, []);
console.log(resultat);
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(resultat);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        VOTE PAR CANDIDAT
      </h2>

      {hasError ? (
        <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
          Une erreur est survenue lors de la récupération des résultats.
          Veuillez réessayer plus tard.
        </div>
      ) : (
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

            {resultat.map((candidatVote: ResultatNational) => (
              <div
                key={candidatVote.idCandidat}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-md bg-blue-600"
                  style={{
                    height: `${
                      (chartHeight / topLabel) * candidatVote.totalVoix
                    }px`,
                  }}
                ></div>
                <p className="rotate-90 text-sm text-gray-900 sm:rotate-0">
                  {candidatVote.nomCandidat}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <CalendarIcon className="h-5 w-5 text-gray-900" />
            <h3 className="text-sm text-gray-500">Mis à jour le {today}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
