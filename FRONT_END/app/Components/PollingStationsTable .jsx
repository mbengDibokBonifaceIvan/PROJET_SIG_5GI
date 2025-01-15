import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PollingStationsTable = ({ rows, editRow, deleteRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  // Obtenir les éléments de la page courante
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  // Changer de page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">
            Liste Nationale des Bureaux de Vote
          </h2>
        </div>
        <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg dark:bg-gray-800">
          <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Latitude</th>
              <th className="px-4 py-2">Longitude</th>
              <th className="px-4 py-2">Centre de Vote</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, idx) => (
              <tr
                key={row.id_bureau_vote || idx}
                className="hover:bg-gray-200 dark:hover:bg-gray-500"
              >
                <td className="px-4 py-2">{row.nom_bureau}</td>
                <td className="px-4 py-2 text-center">
                  {row.coordonnees?.latitude || "Non défini"}
                </td>
                <td className="px-4 py-2 text-center">
                  {row.coordonnees?.longitude || "Non défini"}
                </td>
                <td className="px-4 py-2">
                  {row.centreVote?.nom_centre || "Centre inconnu"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center gap-3">
                    <BsFillPencilFill
                      className="edit-btn cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => editRow(indexOfFirstItem + idx)}
                    />
                    <BsFillTrashFill
                      className="delete-btn cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => deleteRow(indexOfFirstItem + idx)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1">
            {totalPages <= 7 ? (
              // Afficher toutes les pages si totalPages <= 7
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === number
                        ? "bg-blue-500 text-white border-blue-500"
                        : "hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                    }`}
                  >
                    {number}
                  </button>
                )
              )
            ) : (
              // Afficher les pages avec ellipsis si totalPages > 7
              <>
                {[1, 2, 3].map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === number
                        ? "bg-blue-500 text-white border-blue-500"
                        : "hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <span className="px-2">...</span>
                {[totalPages - 2, totalPages - 1, totalPages].map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === number
                        ? "bg-blue-500 text-white border-blue-500"
                        : "hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </>
            )}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Informations sur la pagination */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Affichage de {indexOfFirstItem + 1} à{" "}
          {Math.min(indexOfLastItem, rows.length)} sur {rows.length} bureaux de
          vote
        </div>
      </div>
    </div>
  );
};

export default PollingStationsTable;
