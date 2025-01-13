"use client";
import { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./CentreVote.css";
import { Table } from "../../../Components/Details/DetailsCentreVote/Table";
import { Modal } from "../../../Components/Details/DetailsCentreVote/Modal";
import CentreDeVoteTable from "@/app/Components/CentreDeVoteTable";
function CentreVote() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Liste des centres de vote
  const [arrondissements, setArrondissements] = useState([]); // Liste des arrondissements pour le modal
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch centres de vote et arrondissements depuis le backend
  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await apiClient.get("/centres-de-vote/all"); // Utiliser apiClient
        setRows(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des centres de vote", error);
      }
    };

    const fetchArrondissements = async () => {
      try {
        const response = await apiClient.get("/arrondissements/all"); // Utiliser apiClient
        setArrondissements(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des arrondissements", error);
      }
    };

    fetchCentres();
    fetchArrondissements();
  }, []);

  // Fonction pour supprimer un centre de vote
  const handleDeleteRow = async (targetIndex) => {
    const centreToDelete = rows[targetIndex];
    try {
      await apiClient.delete(`/centres-de-vote/deleteCentreDeVote/${centreToDelete.id_centre_vote}`); // Utiliser apiClient
      setRows(rows.filter((_, idx) => idx !== targetIndex)); // Supprimer le centre de vote de l'état
    } catch (error) {
      console.error("Erreur lors de la suppression du centre de vote", error);
    }
  };

  // Fonction pour ouvrir le modal en mode édition
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Fonction pour soumettre un centre de vote (ajout ou édition)
  const handleSubmit = async (newRow) => {
    const isEditing = rowToEdit !== null;
    const url = isEditing
      ? `/centres-de-vote/editCentreDeVote/${rows[rowToEdit].id_centre_vote}`
      : "/centres-de-vote/addCentreDeVote";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await apiClient({
        method: method,
        url: url,
        data: newRow, // Données du centre de vote
      });

      if (isEditing) {
        setRows(rows.map((currRow, idx) => (idx === rowToEdit ? response.data : currRow))); // Mettre à jour un centre de vote
      } else {
        setRows([...rows, response.data]); // Ajouter un nouveau centre de vote
      }

      // Fermer le modal et réinitialiser l'état
      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission du centre de vote", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <CentreDeVoteTable
        rows={rows}
        editRow={handleEditRow}
        deleteRow={handleDeleteRow}
      />
      <button
        onClick={() => setModalOpen(true)}
        className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
      >
        Ajouter
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]} // Passer la ligne à éditer
          arrondissements={arrondissements} // Passer les arrondissements pour le menu déroulant
        />
      )}
    </div>
  );
}

export default CentreVote;
