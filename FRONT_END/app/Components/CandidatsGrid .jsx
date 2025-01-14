import React, { useState } from "react";
import { Award, ChevronRight, User, ChevronUp } from "lucide-react";
import { lusitana } from "../Components/lib/fonts";

const CandidatsGrid = ({ candidats, resultats }) => {
  const [displayCount, setDisplayCount] = useState(8); // Nombre initial de candidats à afficher
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDisplay = () => {
    if (isExpanded) {
      setDisplayCount(8);
      setIsExpanded(false);
    } else {
      setDisplayCount(candidats.length);
      setIsExpanded(true);
    }
  };

  const displayedCandidats = candidats.slice(0, displayCount);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-purple-500 dark:text-purple-400 mr-3" />
          <h2
            className={`${lusitana.className} text-xl font-bold text-gray-800 dark:text-white`}
          >
            CANDIDATS
          </h2>
        </div>
        {candidats.length > 8 && (
          <button
            onClick={toggleDisplay}
            className="text-sm text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 flex items-center transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                Voir moins <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                Voir tout <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedCandidats.map((candidat) => (
          <div
            key={candidat.id_candidat}
            className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 
                     rounded-2xl p-6 transition-all duration-300 hover:shadow-xl
                     border border-gray-100 dark:border-gray-700"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-green-500/10 dark:bg-green-400/10 rounded-full p-1">
                <Award className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-24 h-24">
                {candidat.photo ? (
                  <div className="relative h-full">
                    <img
                      src={`http://localhost:8080/candidats/photo/${candidat.id_candidat}`}
                      alt={candidat.nom_candidat}
                      className="w-full h-full rounded-2xl object-cover shadow-lg
                               group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
                  </div>
                ) : (
                  <div
                    className="h-full rounded-2xl bg-gray-100 dark:bg-gray-700 
                                flex items-center justify-center shadow-lg"
                  >
                    <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>

              <div className="space-y-3 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {candidat.nom_candidat}
                </h3>

                <div
                  className="inline-block px-3 py-1 bg-purple-50 dark:bg-purple-900/30 
                              rounded-full text-sm text-purple-600 dark:text-purple-400"
                >
                  {candidat.parti_politique}
                </div>

                {resultats.map(
                  (resultat) =>
                    candidat.nom_candidat ===
                      resultat.candidat.nom_candidat && (
                      <div
                        key={resultat.id_résultat}
                        className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 
                               rounded-full text-sm text-blue-600 dark:text-blue-400"
                      >
                        <span className="font-medium">
                          {resultat.nombre_voix?.toLocaleString()}
                        </span>
                        <span className="ml-1 text-xs opacity-75">voix</span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicateur de chargement optionnel */}
      {displayCount < candidats.length &&
        !isExpanded &&
        candidats.length > 8 && (
          <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            Affichage de {displayCount} sur {candidats.length} candidats
          </div>
        )}
    </div>
  );
};

export default CandidatsGrid;
