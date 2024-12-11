import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <div className="table-title">
        <h2>Liste Nationale Des Électeurs</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Numéro</th>
            <th className="expand">Date de Naissance</th>
            <th className="expand">Date d'Inscription</th>
            <th className="expand">Adresse</th>
            <th>Bureau de Vote</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            
              <tr key={idx}>
                <td>{row.nom}</td>
                <td>{row.prénom}</td>
                <td>{row.numéro_électeur}</td>
                <td className="expand">{row.date_naissance}</td>
                <td className="expand">{row.date_inscription}</td>
                <td className="expand">{row.adresse}</td>
                <td>
                  {row.bureauVote?.nom_bureau || "Non défini"}
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row.id_électeur)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(row)}
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
