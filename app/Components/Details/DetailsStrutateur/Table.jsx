import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      {/* Titre */}
      <div className="table-title">
        <h2>Liste Nationale des Scrutateurs</h2>
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

            return (
              <tr key={idx}>
                <td>{row.nom_utilisateur}</td> {/* Nom aligné au backend */}
                <td className="expand">{row.mot_de_passe}</td> {/* Mot de Passe */}
                <td>
                  <span className={`label label-${row.role}`}>
                    {roleText}
                  </span>
                </td>
                {/* Actions */}
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
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
