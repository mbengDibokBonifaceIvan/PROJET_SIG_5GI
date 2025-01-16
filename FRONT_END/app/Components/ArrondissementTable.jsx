import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ArrondissementTable = ({ rows, editRow, deleteRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Augmenté pour mieux utiliser l'espace

  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 shadow-lg rounded-lg p-4 mb-6">
        <h2 className="text-3xl font-bold text-black dark:text-white text-center">
          Liste Nationale Des Arrondissements
        </h2>
      </div>

      <div className="overflow-hidden bg-white dark:bg-dark-grey rounded-lg shadow-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Nom
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Département
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((row, idx) => (
              <tr
                key={row.id_arrondissement}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 ease-in-out"
              >
                <td className="px-6 py-4 text-sm text-center text-gray-900 dark:text-gray-200">
                  {row.nom_arrondissement}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900 dark:text-gray-200">
                  {row.département?.nom_département || "Non spécifié"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-center justify-center space-x-3">
                    <button
                      onClick={() => editRow(idx)}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
                    >
                      <BsFillPencilFill className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteRow(idx)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
                    >
                      <BsFillTrashFill className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="flex items-center gap-1">
            {totalPages <= 7 ? (
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === number
                        ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    } transition-colors duration-150`}
                  >
                    {number}
                  </button>
                )
              )
            ) : (
              <>
                {[1, 2, 3].map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === number
                        ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    } transition-colors duration-150`}
                  >
                    {number}
                  </button>
                ))}
                <span className="px-2 text-gray-600 dark:text-gray-400">
                  ...
                </span>
                {[totalPages - 2, totalPages - 1, totalPages].map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === number
                        ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    } transition-colors duration-150`}
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
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Affichage de {indexOfFirstItem + 1} à{" "}
          {Math.min(indexOfLastItem, rows.length)} sur {rows.length}{" "}
          arrondissements
        </div>
      </div>
    </div>
  );
};

export default ArrondissementTable;
