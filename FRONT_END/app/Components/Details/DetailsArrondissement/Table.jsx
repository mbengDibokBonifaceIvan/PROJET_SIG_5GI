import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <div className="table-title">
        <h2>Liste Nationale Des Arrondissements</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Département</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.département?.nom_département.charAt(0).toUpperCase() +
              row.département?.nom_département.slice(1);

            return (
              <tr key={idx}>
                <td>{row.nom_arrondissement}</td>
                <td>
                    {row.département?.nom_département || "Non spécifié"}
                 
                </td>
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
