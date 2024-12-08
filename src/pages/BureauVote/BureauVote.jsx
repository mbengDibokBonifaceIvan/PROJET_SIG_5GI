import { useState } from "react";

import "./BureauVote.css";
import { Table } from "../../components/Details/DetailsBureauVote/Table";
import { Modal } from "../../components/Details/DetailsBureauVote/Modal";

function BureauVote() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      Nom: "Home",
      PositionX: "1234",
      PositionY: "1234",
      CentreVote: "C1",
    },
    {
      Nom: "Home1",

      PositionX: "1234",
      PositionY: "1234",
      CentreVote: "C2",
    },
    {
      Nom: "Home2",
      PositionX: "1234",
      PositionY: "1234",
      CentreVote: "C3",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="BureauVote">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default BureauVote;
