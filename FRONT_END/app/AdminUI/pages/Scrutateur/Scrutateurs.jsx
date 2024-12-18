"use client";
import { useState, useEffect } from "react";
import "./Scrutateur.css";
import { Table } from "../../../Components/Details/DetailsStrutateur/Table";
import { Modal } from "../../../Components/Details/DetailsStrutateur/Modal";

function Strutateurs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Initialise vide
  const [rowToEdit, setRowToEdit] = useState(null);

  // Récupérer les utilisateurs depuis le backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/utilisateurs/all");
      const data = await response.json();
      setRows(data); // Mettre à jour les lignes avec les données backend
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Charger les utilisateurs au montage du composant
  }, []);

  // Supprimer un utilisateur
  const handleDeleteRow = async (targetIndex) => {
    const userId = rows[targetIndex].id_utilisateur; // Récupérer l'ID utilisateur
    try {
      await fetch(`http://localhost:8080/utilisateurs/deleteUser/${userId}`, {
        method: "DELETE",
      });
      setRows(rows.filter((_, idx) => idx !== targetIndex)); // Mettre à jour localement
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  // Ouvrir le modal pour édition
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Ajouter ou éditer un utilisateur
  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {
      // Ajouter un nouvel utilisateur
      try {
        const response = await fetch("http://localhost:8080/utilisateurs/addUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom_utilisateur: newRow.nom_utilisateur,
            mot_de_passe: newRow.mot_de_passe,
            role: newRow.role,
          }),
        });
        const addedUser = await response.json();
        setRows([...rows, addedUser]); // Mettre à jour localement
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      }
    } else {
      // Modifier un utilisateur existant
      const userId = rows[rowToEdit].id_utilisateur;
      try {
        const response = await fetch(
          `http://localhost:8080/utilisateurs/editUser/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nom_utilisateur: newRow.nom_utilisateur,
              mot_de_passe: newRow.mot_de_passe,
              role: newRow.role,
            }),
          }
        );
        const updatedUser = await response.json();
        setRows(
          rows.map((currRow, idx) => (idx === rowToEdit ? updatedUser : currRow))
        );
      } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur :", error);
      }
    }

    setModalOpen(false);
    setRowToEdit(null);
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
          defaultValue={
            rowToEdit !== null
              ? {
                  nom_utilisateur: rows[rowToEdit].nom_utilisateur,
                  mot_de_passe: rows[rowToEdit].mot_de_passe,
                  role: rows[rowToEdit].role,
                }
              : null
          }
        />
      )}
    </div>
  );
}

export default Strutateurs;
