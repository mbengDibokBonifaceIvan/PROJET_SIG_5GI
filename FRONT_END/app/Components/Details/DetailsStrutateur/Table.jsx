import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre d'éléments par page

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
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">
          Liste Nationale Des Utilisateurs
        </h2>
      </div>

      <div className="mb-4"></div>

      <div className="overflow-x-auto">
        <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg dark:bg-gray-800">
          <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2 w-full">Mot de Passe</th>
              <th className="px-4 py-2">Rôle</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, idx) => {
              const actualIndex = indexOfFirstItem + idx;
              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  <td className="px-4 py-2">{row.nomUtilisateur}</td>
                  <td className="px-4 py-2 w-full text-center">
                    {row.motDePasse}
                  </td>
                  <td className="px-4 py-2 text-center">{row.role}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-3">
                      <BsFillPencilFill
                        className="edit-btn cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() => editRow(actualIndex)}
                      />
                      <BsFillTrashFill
                        className="delete-btn cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => deleteRow(actualIndex)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-gray-700"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {totalPages <= 7 ? (
          // Si moins de 7 pages, afficher toutes les pages
          Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {number}
            </button>
          ))
        ) : (
          // Si plus de 7 pages, afficher un nombre limité avec des ellipses
          <>
            {[1, 2, 3].map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
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
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {number}
              </button>
            ))}
          </>
        )}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-gray-700"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicateur du nombre total d'éléments */}
      <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
        Affichage de {indexOfFirstItem + 1} à{" "}
        {Math.min(indexOfLastItem, rows.length)} sur {rows.length} utilisateurs
      </div>
    </div>
  );
};

export default Table;
