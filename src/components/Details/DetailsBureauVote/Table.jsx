import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (


    <div className="table-wrapper">

<div className="table-title">
        <h2>Liste  Nationale Des Bureaux De Vote</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th className="expand">PositionX</th>
            <th className="expand">PositionY</th>
            <th>CentreVote</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.CentreVote.charAt(0).toUpperCase() + row.CentreVote.slice(1);

            return (
              <tr key={idx}>
                <td>{row.Nom}</td>
                <td className="expand">{row.PositionX}</td>
                <td className="expand">{row.PositionY}</td>
                <td>
                  <span className={`label label-${row.CentreVote}`}>
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
