import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      {/* Titre */}
      <div className="table-title">
        <h2>Liste des Utilisateurs</h2>
      </div>

      {/* Tableau */}
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th className="expand">Mot de Passe</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const roleText =
              row.role.charAt(0).toUpperCase() + row.role.slice(1);
console.log(row.motDePasse);
            return (
              <tr key={idx}>
                <td>{row.nom_utilisateur}</td> {/* Nom aligné au backend */}
                <td className="text-black text-center dark:text-white">{row.motDePasse}</td>{" "}
                {/* Mot de Passe */}
                <td>
                  <span className="text-black">{roleText}</span>
                </td>
                {/* Actions */}
                <td className="fit">
                  <span className="actions">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
