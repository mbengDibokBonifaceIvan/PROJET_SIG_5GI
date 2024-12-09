import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <div className="table-title">
        <h2>Liste Nationale Des Centres De Votes</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Arrondissement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return ( // Ajout du "return"
              <tr key={idx}>
                {/* Affichage du nom du centre de vote */}
                <td>{row.nom_centre}</td>

                {/* Affichage du nom de l'arrondissement associé */}
                <td>{row.arrondissement?.nom_arrondissement || "Arrondissement inconnu"}</td>

                {/* Actions : Modifier et Supprimer */}
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row.id_centre_vote)} // Suppression par ID
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(row)} // Édition avec l'objet complet
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
