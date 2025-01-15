import React from "react";

const PvDetailsModal = ({ pv, onClose }) => {
  if (!pv) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl m-4 overflow-hidden">
        {/* Header */}
        <div className="bg-primary-600 dark:bg-gray-700 px-6 py-4">
          <h3 className="text-2xl font-semibold text-white">
            Détails du Procès Verbal
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Grid layout for details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ID PV */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Identifiant PV
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {pv.id_Pv}
              </p>
            </div>

            {/* Bureau de vote */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Bureau de vote
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {pv.bureauVote?.nom_bureau || "Non spécifié"}
              </p>
            </div>

            {/* Candidat */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Candidat
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {pv.candidat?.nom_candidat || "Non spécifié"}
              </p>
            </div>

            {/* Nombre de voix */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Nombre de voix
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {pv.nombre_voix}
              </p>
            </div>

            {/* Date de saisie */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Date de saisie
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatDate(pv.date_saisie)}
              </p>
            </div>

            {/* Année d'élection */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Année d'élection
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {pv.annee_election}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PvDetailsModal;
