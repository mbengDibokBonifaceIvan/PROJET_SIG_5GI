"use client";

import { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig"; // Importer l'instance d'axios configurée
import { Modal } from "../Components/Details/DetailsDepartement/Modal";
import DepartementTable from "../Components/DepartementTable"; 
import SideBar from "../Components/Sidebar1/SideBar";
import Footer from "../Components/Footer/footer";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";
import { Button } from "@/components/ui/button";



function Departement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Liste des départements
  const [regions, setRegions] = useState([]); // Liste des régions pour le modal
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch départements et régions depuis le backend
  useEffect(() => {
    const fetchDepartements = async () => {
      try {
        const response = await apiClient.get("/departements/all"); // Utiliser apiClient
        setRows(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des départements", error);
      }
    };

    const fetchRegions = async () => {
      try {
        const response = await apiClient.get("/regions/all"); // Utiliser apiClient
        setRegions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des régions", error);
      }
    };

    fetchDepartements();
    fetchRegions();
  }, []);

  // Fonction pour supprimer un département
  const handleDeleteRow = async (targetIndex) => {
    const departementToDelete = rows[targetIndex];
    try {
      await apiClient.delete(`/departements/deleteDepartement/${departementToDelete.id_département}`); // Utiliser apiClient
      setRows(rows.filter((_, idx) => idx !== targetIndex)); // Supprimer le département de l'état
    } catch (error) {
      console.error("Erreur lors de la suppression du département", error);
    }
  };

  // Fonction pour ouvrir le modal en mode édition
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Fonction pour soumettre un département (ajout ou édition)
  const handleSubmit = async (newRow) => {
    const isEditing = rowToEdit !== null;
    const url = isEditing
      ? `/departements/editDepartement/${rows[rowToEdit].id_département}`
      : "/departements/addDepartement";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await apiClient({
        method: method,
        url: url,
        data: newRow, // Données du département
      });

      if (isEditing) {
        setRows(rows.map((currRow, idx) => (idx === rowToEdit ? response.data : currRow))); // Mettre à jour un département
      } else {
        setRows([...rows, response.data]); // Ajouter un nouveau département
      }

      // Fermer le modal et réinitialiser l'état
      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission du département", error);
    }
  };

    return (
      <SideBar>
        <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <ThemeDropdown />
              <Button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Ajouter un département
              </Button>
            </div>

            <DepartementTable
              rows={rows}
              editRow={handleEditRow}
              deleteRow={handleDeleteRow}
            />

            {modalOpen && (
              <Modal
                closeModal={() => {
                  setModalOpen(false);
                  setRowToEdit(null);
                }}
                onSubmit={handleSubmit}
                defaultValue={rowToEdit !== null && rows[rowToEdit]}
                regions={regions}
              />
            )}
          </div>
        </div>
        <Footer />
      </SideBar>
    );
}

export default Departement;
