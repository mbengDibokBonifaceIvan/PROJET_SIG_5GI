import { useState } from "react";
import "./Candidat.css";
import { Table } from "../../components/Details/DetailsCandidat/Table";
import { Modal } from "../../components/Details/DetailsCandidat/Modal";


function Candidats () {

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      Nom: "Home1",
      PartiPolitique: "PartiPolitique 1",
      // status: "live",
    },
    {
      Nom: "Home2",
      PartiPolitique: "PartiPolitique 2",
    },
    {
      Nom: "Home3",
      PartiPolitique: "PartiPolitique 3",
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

<div className="Candidats">
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



};

export default Candidats;
