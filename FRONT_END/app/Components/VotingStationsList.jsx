import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Mapss from "./Map/Mapss";

const VotingStationsList = ({
  BureauDeVote,
  getClickedCityCords,
  calender,
  lusitana,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(BureauDeVote.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = BureauDeVote.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
   

      <div
        className={`${lusitana.className} border rounded-lg states flex flex-col gap-3 flex-1 h-full p-4`}
      >
        <h2 className="mb-4 text-xl md:text-2xl flex items-center gap-2 font-medium text-wrap text-blue-500">
          {calender} Résultats Des Élections Dans Quelques Bureaux De Vote
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentItems.map((state, index) => (
            <div
              key={index}
              className="border rounded-lg cursor-pointer shadow-sm dark:shadow-none bg-white dark:bg-dark-grey"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-950 dark:text-blue-300">
                  {state.nom_bureau}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white mt-2">
                  Centre de vote: {state.centreVote.nom_centre}
                </p>
                <div className="mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      getClickedCityCords(
                        state.coordonnees.latitude,
                        state.coordonnees.longitude
                      );
                    }}
                  >
                    Voir sur la carte
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    
  );
};

export default VotingStationsList;
