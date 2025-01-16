import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ElecteurTable = ({ rows, editRow, deleteRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Augmenté pour mieux utiliser l'espace vertical

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
    <div className="w-full px-4 py-6 space-y-4">
      {/* En-tête avec titre */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white bg-blue-500 rounded-md px-6 py-3 shadow-md">
          Liste Nationale Des Électeurs
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 px-4 py-2 rounded-md shadow">
          Total: {rows.length} électeurs
        </div>
      </div>

      {/* Table Container */}
      <div className="relative overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Prénom</th>
              <th className="px-4 py-3 text-left">Numéro</th>
              <th className="px-4 py-3 text-left">Date de Naissance</th>
              <th className="px-4 py-3 text-left">Date d'Inscription</th>
              <th className="px-4 py-3 text-left">Adresse</th>
              <th className="px-4 py-3 text-left">Bureau de Vote</th>
              <th className="px-4 py-3 text-center w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {row.nom}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.prénom}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {row.numéro_électeur}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {row.date_naissance}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {row.date_inscription}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{row.adresse}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  {row.bureauVote?.nom_bureau || "Non défini"}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onClick={() => editRow(idx)}
                      className="text-white space-x-3 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <BsFillPencilFill className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => deleteRow(idx)}
                      className="text-white  hover:text-red-800 dark:text-black dark:hover:text-red-300"
                    >
                      <BsFillTrashFill className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination optimisée */}
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
                {currentPage > 2 && (
                  <Button
                    onClick={() => paginate(currentPage - 1)}
                    className="px-3 py-1 rounded-lg border hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    {currentPage - 1}
                  </Button>
                )}
                {currentPage !== 1 && currentPage !== totalPages && (
                  <Button className="px-3 py-1 rounded-lg border bg-blue-500 text-white border-blue-500">
                    {currentPage}
                  </Button>
                )}
                {currentPage < totalPages - 1 && (
                  <Button
                    onClick={() => paginate(currentPage + 1)}
                    className="px-3 py-1 rounded-lg border hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    {currentPage + 1}
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
          {Math.min(indexOfLastItem, rows.length)} sur {rows.length} électeurs
        </div>
      </div>
    </div>
  );
};

export default ElecteurTable;
