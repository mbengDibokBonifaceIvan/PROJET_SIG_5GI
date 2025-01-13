import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
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
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-200 dark:hover:bg-gray-500">
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
  );
};
