"use client";
import { useState, useEffect } from "react";
import "./Arrondissement.css";
import { Table } from "../../../Components/Details/DetailsArrondissement/Table";
import { Modal } from "../../../Components/Details/DetailsArrondissement/Modal";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer/footer";

function Arrondissement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fonction pour récupérer les arrondissements depuis le backend
  const fetchArrondissements = async () => {
    try {
      const response = await fetch("http://localhost:8080/arrondissements/all");
      if (!response.ok) throw new Error("Erreur lors de la récupération des arrondissements");
      const data = await response.json();
      setRows(data); // Met à jour les arrondissements dans l'état
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Charger les arrondissements au montage du composant
  useEffect(() => {
    fetchArrondissements();
  }, []);

  // Fonction pour supprimer un arrondissement
  const handleDeleteRow = async (targetIndex) => {
    const rowToDelete = rows[targetIndex];
    try {
      const response = await fetch(
        `http://localhost:8080/arrondissements/deleteArrondissement/${rowToDelete.id_arrondissement}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setRows(rows.filter((_, idx) => idx !== targetIndex)); // Supprime de l'état local
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Fonction pour modifier un arrondissement
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Fonction pour soumettre un nouvel arrondissement ou une mise à jour
  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {
      // Si on ajoute un nouvel arrondissement, on envoie une requête POST
      try {
        const response = await fetch("http://localhost:8080/arrondissements/addArrondissement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRow),
        });
        if (!response.ok) throw new Error("Erreur lors de l'ajout de l'arrondissement");

        const addedArrondissement = await response.json();
        setRows([...rows, addedArrondissement]); // Met à jour l'état avec le nouvel arrondissement
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
      }
    } else {
      // Si on modifie un arrondissement existant, on envoie une requête PUT
      const rowToUpdate = rows[rowToEdit];
      try {
        const response = await fetch(
          `http://localhost:8080/arrondissements/editArrondissement/${rowToUpdate.id_arrondissement}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRow),
          }
        );
        if (!response.ok) throw new Error("Erreur lors de la mise à jour de l'arrondissement");

        const updatedArrondissement = await response.json();
        setRows(
          rows.map((currRow, idx) => (idx === rowToEdit ? updatedArrondissement : currRow))
        ); // Met à jour l'état avec l'arrondissement modifié
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
    }
    setModalOpen(false); // Ferme le modal après la soumission
    setRowToEdit(null); // Réinitialise l'index d'édition
  };

  return (
    <div>
        <Navbar/>
         <div className="Arrondissement">
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
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
    <Footer/>
    </div>
   
  );
}

export default Arrondissement;
