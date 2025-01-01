import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">
          Liste Nationale Des Candidats
        </h2>
      </div>
      <div className="mb-4"></div> {/* Espacement entre le titre et la table */}
      <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg dark:bg-gray-800">
        <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
          <tr>
            <th className="px-4 py-2">Nom</th> {/* Espacement avec padding */}
            <th className="px-4 py-2">Parti Politique</th> {/* Espacement avec padding */}
            <th className="px-4 py-2">Actions</th> {/* Espacement avec padding */}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx} className="hover:bg-gray-200 dark:hover:bg-gray-500">
                <td className="px-4 py-2">{row.nom_candidat}</td> {/* Espacement avec padding */}
                <td className="px-4 py-2 text-center">{row.parti_politique}</td> {/* Espacement avec padding */}
                <td className="px-4 py-2 flex items-center justify-center">
                  <BsFillPencilFill
                    className="edit-btn cursor-pointer"
                    onClick={() => editRow(idx)}
                  />
                  <span className="mx-2"></span> {/* Espacement entre les icônes */}
                  <BsFillTrashFill
                    className="delete-btn cursor-pointer"
                    onClick={() => deleteRow(idx)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
