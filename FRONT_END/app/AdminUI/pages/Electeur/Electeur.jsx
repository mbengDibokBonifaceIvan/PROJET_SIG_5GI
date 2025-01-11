import { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./Electeur.css";
import { Table } from "../../../Components/Details/DetailsElecteur/Table";
import { Modal } from "../../../Components/Details/DetailsElecteur/Modal";

function Electeur() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Liste des électeurs
  const [bureaux, setBureaux] = useState([]); // Liste des bureaux de vote pour le modal
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch électeurs et bureaux de vote depuis le backend
  useEffect(() => {
    const fetchElecteurs = async () => {
      try {
        const response = await apiClient.get("/electeurs/all"); // Utiliser apiClient
        setRows(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des électeurs", error);
      }
    };

    const fetchBureaux = async () => {
      try {
        const response = await apiClient.get("/bureaux-de-vote/all"); // Utiliser apiClient
        setBureaux(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des bureaux de vote", error);
      }
    };

    fetchElecteurs();
    fetchBureaux();
  }, []);

  // Fonction pour supprimer un électeur
  const handleDeleteRow = async (targetIndex) => {
    const electeurToDelete = rows[targetIndex];
    try {
      await apiClient.delete(`/electeurs/deleteElecteur/${electeurToDelete.id_électeur}`); // Utiliser apiClient
      setRows(rows.filter((_, idx) => idx !== targetIndex)); // Supprimer l'électeur de l'état
    } catch (error) {
      console.error("Erreur lors de la suppression de l'électeur", error);
    }
  };

  // Fonction pour ouvrir le modal en mode édition
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Fonction pour soumettre un électeur (ajout ou édition)
  const handleSubmit = async (newRow) => {
    const isEditing = rowToEdit !== null;
    const url = isEditing
      ? `/electeurs/editElecteur/${rows[rowToEdit].id_électeur}`
      : "/electeurs/addElecteur";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await apiClient({
        method: method,
        url: url,
        data: newRow, // Données de l'électeur
      });

      if (isEditing) {
        setRows(rows.map((currRow, idx) => (idx === rowToEdit ? response.data : currRow))); // Mettre à jour un électeur
      } else {
        setRows([...rows, response.data]); // Ajouter un nouvel électeur
      }

      // Fermer le modal et réinitialiser l'état
      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission de l'électeur", error);
    }
  };

  // Fonction de formatage de date
  const formatReadableDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Table
        rows={rows.map((row) => ({
          ...row,
          date_naissance: formatReadableDate(row.date_naissance),
          date_inscription: formatReadableDate(row.date_inscription),
        }))}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
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
          defaultValue={rowToEdit !== null ? rows[rowToEdit] : {}}
          bureaux={bureaux} // Passer les bureaux pour le modal
        />
      )}
    </div>
  );
}

export default Electeur;
