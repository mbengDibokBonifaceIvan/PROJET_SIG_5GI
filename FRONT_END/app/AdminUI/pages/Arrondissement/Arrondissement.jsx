"use client";
import { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./Arrondissement.css";
import { Table } from "../../../Components/Details/DetailsArrondissement/Table";
import { Modal } from "../../../Components/Details/DetailsArrondissement/Modal";

function Arrondissement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Liste des arrondissements
  const [departements, setDepartements] = useState([]); // Liste des départements pour le modal
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch arrondissements et départements depuis le backend
  useEffect(() => {
    const fetchArrondissements = async () => {
      try {
        const response = await apiClient.get("/arrondissements/all"); // Utiliser apiClient
        setRows(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des arrondissements", error);
      }
    };

    const fetchDepartements = async () => {
      try {
        const response = await apiClient.get("/departements/all"); // Utiliser apiClient
        setDepartements(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des départements", error);
      }
    };

    fetchArrondissements();
    fetchDepartements();
  }, []);

  // Fonction pour supprimer un arrondissement
  const handleDeleteRow = async (targetIndex) => {
    const arrondissementToDelete = rows[targetIndex];
    try {
      await apiClient.delete(`/arrondissements/deleteArrondissement/${arrondissementToDelete.id_arrondissement}`); // Utiliser apiClient
      setRows(rows.filter((_, idx) => idx !== targetIndex)); // Supprimer l'arrondissement de l'état
    } catch (error) {
      console.error("Erreur lors de la suppression de l'arrondissement", error);
    }
  };

  // Fonction pour ouvrir le modal en mode édition
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Fonction pour soumettre un arrondissement (ajout ou édition)
  const handleSubmit = async (newRow) => {
    const isEditing = rowToEdit !== null;
    const url = isEditing
      ? `/arrondissements/editArrondissement/${rows[rowToEdit].id_arrondissement}`
      : "/arrondissements/addArrondissement";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await apiClient({
        method: method,
        url: url,
        data: newRow, // Données de l'arrondissement
      });

      if (isEditing) {
        setRows(rows.map((currRow, idx) => (idx === rowToEdit ? response.data : currRow))); // Mettre à jour un arrondissement
      } else {
        setRows([...rows, response.data]); // Ajouter un nouvel arrondissement
      }

      // Fermer le modal et réinitialiser l'état
      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission de l'arrondissement", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">Ajouter</button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
          departements={departements} // Passer les départements pour le menu déroulant
        />
      )}
    </div>
  );
}

export default Arrondissement;
