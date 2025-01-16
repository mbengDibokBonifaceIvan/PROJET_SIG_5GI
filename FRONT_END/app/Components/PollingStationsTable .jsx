import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PollingStationsTable = ({ rows, editRow, deleteRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
    <div className="w-full px-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white  bg-blue-500 rounded-md px-6 py-3 shadow-md">
          Liste Nationale des Bureaux de Vote
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 px-4 py-2 rounded-md shadow">
          Total: {rows.length} bureaux
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-xl rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full">
          <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Nom</th>
              <th className="px-6 py-4 text-left font-semibold">Latitude</th>
              <th className="px-6 py-4 text-left font-semibold">Longitude</th>
              <th className="px-6 py-4 text-left font-semibold">
                Centre de Vote
              </th>
              <th className="px-6 py-4 text-center font-semibold w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((row, idx) => (
              <tr
                key={row.id_bureau_vote || idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {row.nom_bureau}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {row.coordonnees?.latitude || "Non défini"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {row.coordonnees?.longitude || "Non défini"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {row.centreVote?.nom_centre || "Centre inconnu"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onClick={() => editRow(indexOfFirstItem + idx)}
                      className="text-blue-500 dark:text-black hover:text-blue-700 transition-colors"
                    >
                      <BsFillPencilFill className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={() => deleteRow(indexOfFirstItem + idx)}
                      className="text-white  dark:text-black hover:text-red-700 transition-colors"
                    >
                      <BsFillTrashFill className="w-5 h-5 " />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-1">
            {totalPages <= 5 ? (
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <Button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === number
                        ? "bg-blue-500 text-white border-blue-500"
                        : "hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                    }`}
                  >
                    {number}
                  </Button>
                )
              )
            ) : (
              <>
                <Button
                  onClick={() => paginate(1)}
                  className={`px-3 py-1 rounded-lg border ${
                    currentPage === 1
                      ? "bg-blue-500 text-white border-blue-500"
                      : "hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  }`}
                >
                  1
                </Button>
                {currentPage > 3 && <span className="px-2">...</span>}
                {currentPage > 2 && currentPage < totalPages - 1 && (
                  <Button
                    onClick={() => paginate(currentPage)}
                    className="px-3 py-1 rounded-lg border bg-blue-500 text-white border-blue-500"
                  >
                    {currentPage}
                  </Button>
                )}
                {currentPage < totalPages - 2 && (
                  <span className="px-2">...</span>
                )}
                <Button
                  onClick={() => paginate(totalPages)}
                  className={`px-3 py-1 rounded-lg border ${
                    currentPage === totalPages
                      ? "bg-blue-500 text-white border-blue-500"
                      : "hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  }`}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

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
