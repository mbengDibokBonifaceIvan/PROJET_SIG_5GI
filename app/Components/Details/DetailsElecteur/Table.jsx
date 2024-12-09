import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (


    <div className="table-wrapper">

<div className="table-title">
        <h2>Liste  Nationale Des Electeurs</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Numero</th>
            <th className="expand">DateNaissance</th>
            <th className="expand">Inscription</th>
            <th className="expand">Adresse</th>
            <th>BureauVote</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.BureauVote.charAt(0).toUpperCase() + row.BureauVote.slice(1);

            return (
              <tr key={idx}>
                <td>{row.Nom}</td>
                <td>{row.Prenom}</td>
                <td>{row.Numero}</td>
                <td className="expand">{row.DateNaissance}</td>
                <td className="expand">{row.Inscription}</td>
                <td className="expand">{row.Adresse}</td>
                <td>
                  <span className={`label label-${row.BureauVote}`}>
                    {statusText}
                  </span>
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
