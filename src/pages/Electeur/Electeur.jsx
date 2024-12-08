import { useState } from "react";

import "./Electeur.css";
import { Table } from "../../components/Details/DetailsElecteur/Table";
import { Modal } from "../../components/Details/DetailsElecteur/Modal";

function Electeur() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      Nom: "Home",
      Prenom: "Pre",
      Numero: "Pre",
      DateNaissance: "1234",
      Inscription: "1234",
      Adresse: "1234",
      BureauVote: "B1",
    },
    {
      Nom: "Home1",
      Prenom: "Pre",
      Numero: "Pre",
      DateNaissance: "1234",
      Inscription: "1234",
      Adresse: "1234",
      BureauVote: "B2",
    },
    {
      Nom: "Home2",
      Prenom: "Pre",
      Numero: "Pre",
      DateNaissance: "1234",
      Inscription: "1234",
      Adresse: "1234",
      BureauVote: "B3",
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
    <div className="Electeur">
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

export default Electeur;
