"use client";
import { useState, useEffect } from "react";
import "./Departement.css";
import { Table } from "../../../Components/Details/DetailsDepartement/Table";
import { Modal } from "../../../Components/Details/DetailsDepartement/Modal";

function Departement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Liste des départements
  const [regions, setRegions] = useState([]); // Liste des régions pour le modal
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch départements depuis le backend
  useEffect(() => {
    const fetchDepartements = async () => {
      try {
        const response = await fetch("http://localhost:8080/departements/all");
        if (!response.ok) throw new Error("Erreur lors de la récupération des départements");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    const fetchRegions = async () => {
      try {
        const response = await fetch("http://localhost:8080/regions/all");
        if (!response.ok) throw new Error("Erreur lors de la récupération des régions");
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchDepartements();
    fetchRegions();
  }, []);

  // Fonction pour supprimer un département
  const handleDeleteRow = (targetIndex) => {
    const departementToDelete = rows[targetIndex];
    fetch(`http://localhost:8080/departements/deleteDepartement/${departementToDelete.id_département}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la suppression du département");
        setRows(rows.filter((_, idx) => idx !== targetIndex));
      })
      .catch((error) => console.error("Erreur :", error));
  };

  // Fonction pour ouvrir le modal en mode édition
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Fonction pour soumettre un département (ajout ou édition)
  const handleSubmit = (newRow) => {
    const url = rowToEdit === null
      ? "http://localhost:8080/departements/addDepartement"
      : `http://localhost:8080/departements/editDepartement/${rows[rowToEdit].id_département}`;

    const method = rowToEdit === null ? "POST" : "PUT";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRow),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la soumission du département");
        return response.json();
      })
      .then((data) => {
        if (rowToEdit === null) {
          setRows([...rows, data]); // Ajouter un département
        } else {
          setRows(rows.map((currRow, idx) => (idx !== rowToEdit ? currRow : data))); // Mettre à jour un département
        }
      })
      .catch((error) => console.error("Erreur :", error));
  };

  return (
    <div className="Departement">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">Add</button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
          regions={regions} // Passer les régions pour le menu déroulant
        />
      )}
    </div>
  );
}

export default Departement;
