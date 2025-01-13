import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CandidatesTable = ({
  candidats,
  handleEdit,
  handleDelete,
  BiEditIcon,
  BiTrashIcon,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(candidats.length / itemsPerPage);

  // Obtenir les éléments de la page courante
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = candidats.slice(indexOfFirstItem, indexOfLastItem);

  // Changer de page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full mx-auto w-full bg-white dark:bg-dark-grey text-center border rounded-lg cursor-pointer shadow-sm dark:shadow-none">
          <thead className="dark:bg-gray-800">
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Nom du Candidat</th>
              <th className="py-2 px-4 border-b">Nombre de voix</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id_résultat}
                className="hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-2 px-4 border-b">
                  {item.candidat?.nom_candidat || "Unknown"}
                </td>
                <td className="py-2 px-4 border-b">{item.nombre_voix}</td>
                <td className="py-2 px-4 border-b flex gap-5 text-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    {BiEditIcon}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id_résultat)}
                  >
                    {BiTrashIcon}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Numéros de page */}
          <div className="flex items-center space-x-1">
            {totalPages <= 7 ? (
              // Afficher toutes les pages si totalPages <= 7
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Button>
                )
              )
            ) : (
              // Afficher les pages avec ellipsis si totalPages > 7
              <>
                {[1, 2, 3].map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Button>
                ))}
                <span className="px-2">...</span>
                {[totalPages - 2, totalPages - 1, totalPages].map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Button>
                ))}
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Informations sur la pagination */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Affichage de {indexOfFirstItem + 1} à{" "}
          {Math.min(indexOfLastItem, candidats.length)} sur {candidats.length}{" "}
          candidats
        </div>
      </div>
    </div>
  );
};

export default CandidatesTable;
