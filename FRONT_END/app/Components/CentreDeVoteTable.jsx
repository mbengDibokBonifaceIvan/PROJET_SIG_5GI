
import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CentreDeVoteTable = ({ rows, editRow, deleteRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="py-6">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white bg-blue-500 mx-auto max-w-2xl py-3 px-4 rounded-lg shadow-md">
          Liste Nationale Des Centres De Votes
        </h2>
      </div>

      <div className="px-6 pb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-300 dark:bg-gray-600">
                <th className="px-6 py-3 text-center text-black dark:text-white font-semibold">
                  Nom
                </th>
                <th className="px-6 py-3 text-center text-black dark:text-white font-semibold">
                  Arrondissement
                </th>
                <th className="px-6 py-3 text-center text-black dark:text-white font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((row, idx) => (
                <tr
                  key={row.id_centre_vote}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-center">{row.nom_centre}</td>
                  <td className="px-6 py-4 text-center">
                    {row.arrondissement?.nom_arrondissement ||
                      "Arrondissement inconnu"}
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => editRow(idx)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <BsFillPencilFill className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteRow(idx)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <BsFillTrashFill className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
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
                Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded-lg border ${
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
                <>
                  {[1, 2, 3].map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === number
                          ? "bg-blue-500 text-white border-blue-500"
                          : "hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <span className="px-2">...</span>
                  {[totalPages - 2, totalPages - 1, totalPages].map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-lg border ${
                          currentPage === number
                            ? "bg-blue-500 text-white border-blue-500"
                            : "hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
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

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Affichage de {indexOfFirstItem + 1} à{" "}
            {Math.min(indexOfLastItem, rows.length)} sur {rows.length} centres
            de vote
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentreDeVoteTable;