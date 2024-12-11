"use client";
import { useState, useEffect } from "react";
import "./Candidat.css";
import { Table } from "../../../Components/Details/DetailsCandidat/Table";
import { Modal } from "../../../Components/Details/DetailsCandidat/Modal";

function Candidats() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Charger les candidats depuis le backend
  useEffect(() => {
    fetch("http://localhost:8080/candidats/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Candidats récupérés :", data);
        setRows(data);
      })
      .catch((err) => console.error("Erreur lors du chargement :", err));
  }, []);

  const handleDeleteRow = (targetIndex) => {
    const candidatToDelete = rows[targetIndex];

    fetch(`http://localhost:8080/candidats/deleteCandidat/${candidatToDelete.id_candidat}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Candidat supprimé :", candidatToDelete);
        setRows(rows.filter((_, idx) => idx !== targetIndex));
      })
      .catch((err) => console.error("Erreur lors de la suppression :", err));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      // POST : Ajouter un candidat
      fetch("http://localhost:8080/candidats/addCandidat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom_candidat: newRow.nom_candidat,
          parti_politique: newRow.parti_politique,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Candidat ajouté :", data);
          setRows([...rows, data]);
        })
        .catch((err) => console.error("Erreur lors de l'ajout :", err));
    } else {
      // PUT : Modifier un candidat
      const candidatToUpdate = rows[rowToEdit];

      fetch(`http://localhost:8080/candidats/editCandidat/${candidatToUpdate.id_candidat}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom_candidat: newRow.nom_candidat,
          parti_politique: newRow.parti_politique,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Candidat modifié :", data);
          const updatedRows = rows.map((currRow, idx) =>
            idx === rowToEdit ? data : currRow
          );
          setRows(updatedRows);
        })
        .catch((err) => console.error("Erreur lors de la modification :", err));
    }

    setModalOpen(false); // Fermer le modal
    setRowToEdit(null);
  };

  return (
    <div className="Candidats">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Ajouter
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null ? rows[rowToEdit] : {}}
        />
      )}
    </div>
  );
}

export default Candidats;
