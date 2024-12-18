import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      {/* Titre du tableau */}
      <div className="table-title">
        <h2>Liste Nationale des Régions</h2>
      </div>

      {/* Tableau des régions */}
      <table className="table">
        <thead>
          <tr>
            <th>Nom de la Région</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={row.id_région || idx}>
                <td>{row.nom_région}</td> {/* Utilisation de "nom_région" */}
                <td className="fit">
                  <span className="actions">
                    {/* Bouton Supprimer */}
                    <BsFillTrashFill
                      className="delete-btn"
                      title="Supprimer"
                      onClick={() => deleteRow(idx)}
                    />
                    {/* Bouton Modifier */}
                    <BsFillPencilFill
                      className="edit-btn"
                      title="Modifier"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
          {/* Message si aucune donnée */}
          {rows.length === 0 && (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Aucune région disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
