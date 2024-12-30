"use client";
import { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./BureauVote.css";
import { Table } from "../../../Components/Details/DetailsBureauVote/Table";
import { Modal } from "../../../Components/Details/DetailsBureauVote/Modal";

function BureauVote() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Liste des bureaux de vote
  const [centres, setCentres] = useState([]); // Liste des centres de vote pour le modal
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch bureaux de vote et centres de vote depuis le backend
  useEffect(() => {
    const fetchBureaux = async () => {
      try {
        const response = await apiClient.get("/bureaux-de-vote/all"); // Utiliser apiClient
        setRows(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des bureaux de vote", error);
      }
    };

    const fetchCentres = async () => {
      try {
        const response = await apiClient.get("/centres-de-vote/all"); // Utiliser apiClient
        setCentres(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des centres de vote", error);
      }
    };

    fetchBureaux();
    fetchCentres();
  }, []);

  // Fonction pour supprimer un bureau de vote
  const handleDeleteRow = async (targetIndex) => {
    const bureauToDelete = rows[targetIndex];
    try {
      await apiClient.delete(`/bureaux-de-vote/deleteBureauDeVote/${bureauToDelete.id_bureau_vote}`); // Utiliser apiClient
      setRows(rows.filter((_, idx) => idx !== targetIndex)); // Supprimer le bureau de vote de l'état
    } catch (error) {
      console.error("Erreur lors de la suppression du bureau de vote", error);
    }
  };

  // Fonction pour ouvrir le modal en mode édition
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Fonction pour soumettre un bureau de vote (ajout ou édition)
  const handleSubmit = async (newRow) => {
    const isEditing = rowToEdit !== null;
    const url = isEditing
      ? `/bureaux-de-vote/editBureauDeVote/${rows[rowToEdit].id_bureau_vote}`
      : "/bureaux-de-vote/addBureauDeVote";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await apiClient({
        method: method,
        url: url,
        data: newRow, // Données du bureau de vote
      });

      if (isEditing) {
        setRows(rows.map((currRow, idx) => (idx === rowToEdit ? response.data : currRow))); // Mettre à jour un bureau de vote
      } else {
        setRows([...rows, response.data]); // Ajouter un nouveau bureau de vote
      }

      // Fermer le modal et réinitialiser l'état
      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission du bureau de vote", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
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
          centres={centres} // Passer les centres de vote pour le menu déroulant
        />
      )}
    </div>
  );
}

export default BureauVote;
