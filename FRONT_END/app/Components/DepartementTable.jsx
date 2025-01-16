import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DepartementTable = ({ rows, editRow, deleteRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const filtered = rows.filter(
      (row) =>
        row.nom_département.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (row.région?.nom_région || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
    setCurrentPage(1);
  }, [searchTerm, rows]);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredRows].sort((a, b) => {
      if (key === "région") {
        const aVal = a.région?.nom_région || "";
        const bVal = b.région?.nom_région || "";
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return direction === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
    setFilteredRows(sorted);
  };

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 dark:from-purple-900 dark:to-indigo-950 shadow-2xl rounded-xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-6">
          Liste Nationale des Départements
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              size={20}
            />
            <input
              type="text"
              placeholder="     Rechercher un département ou une région..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10  border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value={5}>5 par page</option>
              <option value={8}>8 par page</option>
              <option value={10}>10 par page</option>
              <option value={15}>15 par page</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-grey rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th
                  onClick={() => sortData("nom_département")}
                  className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750"
                >
                  <div className="flex text-center items-center gap-2">
                    Nom du Département
                    <span className="text-gray-500">
                      {getSortIcon("nom_département")}
                    </span>
                  </div>
                </th>
                <th
                  onClick={() => sortData("région")}
                  className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750"
                >
                  <div className="flex text-center items-center gap-2">
                    Région
                    <span className="text-gray-500">
                      {getSortIcon("région")}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-sm text-center text-gray-900 dark:text-gray-200">
                    {row.nom_département}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-900 dark:text-gray-200">
                    {row.région?.nom_région || "Non spécifiée"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center  justify-center space-x-6">
                      <Button
                        onClick={() => editRow(idx)}
                        className="p-2 text-indigo-600 bg-white dark:bg-black hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-150"
                      >
                        <BsFillPencilFill className="w-4 h-4 dark:text-black" />
                      </Button>
                      <Button
                        onClick={() => deleteRow(idx)}
                        className="p-2 text-red-600 bg-white dark:bg-black hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
                      >
                        <BsFillTrashFill className="w-4 h-4 dark:text-black" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === pageNumber
                      ? "bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-700 dark:border-indigo-700"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  } transition-colors duration-150`}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Affichage de {indexOfFirstItem + 1} à{" "}
          {Math.min(indexOfLastItem, filteredRows.length)} sur{" "}
          {filteredRows.length} départements
        </div>
      </div>
    </div>
  );
};

export default DepartementTable;
