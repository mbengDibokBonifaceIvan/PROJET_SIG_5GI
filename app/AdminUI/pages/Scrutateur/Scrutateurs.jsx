"use client"
import { useState } from "react";

import "./Scrutateur.css";
import { Table } from "../../../Components/Details/DetailsStrutateur/Table";
import { Modal } from "../../../Components/Details/DetailsStrutateur/Modal";

function Strutateurs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      Nom: "Home",
      MotDePasse: "1234",
      Role: "Strutateur",
    },
    {
      Nom: "Home1",
      MotDePasse: "1234",
      Role: "Strutateur",
    },
    {
      Nom: "Home2",
      MotDePasse: "1234",
      Role: "Strutateur",
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
    <div className="Strutateurs">
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

export default Strutateurs;
