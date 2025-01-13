import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ElecteurTable = ({ rows, editRow, deleteRow }) => {
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
        <div className="w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">
              Liste Nationale Des Électeurs
            </h2>
          </div>
          <div className="mb-4"></div>
          <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg dark:bg-gray-800">
            <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
              <tr>
                <th className="dark:bg-gray-800">Nom</th>
                <th className="dark:bg-gray-800">Prénom</th>
                <th className="dark:bg-gray-800">Numéro</th>
                <th className="dark:bg-gray-800">Date de Naissance</th>
                <th className="dark:bg-gray-800">Date d'Inscription</th>
                <th className="dark:bg-gray-800">Adresse</th>
                <th className="dark:bg-gray-800">Bureau de Vote</th>
                <th className="dark:bg-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  <td className="column-cell">{row.nom}</td>
                  <td className="column-cell text-center">{row.prénom}</td>
                  <td className="column-cell">{row.numéro_électeur}</td>
                  <td className="column-cell">{row.date_naissance}</td>
                  <td className="column-cell">{row.date_inscription}</td>
                  <td className="column-cell">{row.adresse}</td>
                  <td className="column-cell">
                    {row.bureauVote?.nom_bureau || "Non défini"}
                  </td>
                  <td className="actions-cell flex items-center justify-center">
                    <BsFillPencilFill
                      className="edit-btn cursor-pointer"
                      onClick={() => editRow(idx)}
                    />
                    <span className="mx-2"></span>
                    <BsFillTrashFill
                      className="delete-btn cursor-pointer"
                      onClick={() => deleteRow(idx)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          {Math.min(indexOfLastItem, rows.length)} sur {rows.length} electeurs
        </div>
      </div>
    </div>
  );
};

export default ElecteurTable;
