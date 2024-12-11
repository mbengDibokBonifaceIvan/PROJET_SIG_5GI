import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <div className="table-title">
        <h2>Liste Nationale Des Bureaux De Vote</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom du Bureau</th>
            <th className="expand">Latitude</th>
            <th className="expand">Longitude</th>
            <th>Centre de Vote</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            
              <tr key={row.id || idx}> {/* Utilisation de l'ID comme clé unique */}
                <td>{row.nom_bureau}</td> {/* Correspond à nom_bureau */}
                <td className="expand">{row.latitude}</td> {/* Correspond à latitude */}
                <td className="expand">{row.longitude}</td> {/* Correspond à longitude */}
                <td>{row.centreVote?.nom_centre || "Non défini"}</td> {/* Correspond à centreVote.nom_centre */}
                <td className="fit">
                  <span className="actions">
                    {/* Bouton de suppression */}
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                      title="Supprimer"
                    />
                    {/* Bouton d'édition */}
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                      title="Modifier"
                    />
                  </span>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
