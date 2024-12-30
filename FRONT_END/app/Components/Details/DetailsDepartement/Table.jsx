import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance Axios
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  // Gestion de la suppression d'un département
  const handleDeleteRow = async (idx) => {
    const departementToDelete = rows[idx];
    try {
      await apiClient.delete(`/departements/deleteDepartement/${departementToDelete.id_département}`);
      deleteRow(idx); // Appeler la fonction parent pour mettre à jour l'état
    } catch (error) {
      console.error("Erreur lors de la suppression du département :", error);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">
          Liste Nationale des Départements
        </h2>
      </div>
      <div className="mb-4"></div> {/* Espacement entre le titre et la table */}
      <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg dark:bg-gray-800">
        <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
          <tr>
            <th>Nom du Département</th>
            <th>Région</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-200 dark:hover:bg-gray-500">
              <td>{row.nom_département}</td>
              <td>{row.région?.nom_région || "Non spécifiée"}</td>
              <td className="flex items-center justify-center">
                <BsFillPencilFill
                  className="edit-btn cursor-pointer"
                  onClick={() => editRow(idx)}
                />
                <span className="mx-2"></span> {/* Espacement entre les icônes */}
                <BsFillTrashFill
                  className="delete-btn cursor-pointer"
                  onClick={() => handleDeleteRow(idx)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
