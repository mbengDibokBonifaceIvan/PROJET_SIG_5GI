"use client";
import { useState, useEffect } from "react";
import "./BureauVote.css";
import { Table } from "../../../Components/Details/DetailsBureauVote/Table";
import { Modal } from "../../../Components/Details/DetailsBureauVote/Modal";

function BureauVote() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Initialement vide car on va fetch les données du backend
  const [rowToEdit, setRowToEdit] = useState(null);

  // Charger les bureaux de vote au montage du composant
  useEffect(() => {
    const fetchBureaux = async () => {
      try {
        const response = await fetch("http://localhost:8080/bureaux-de-vote/all");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des bureaux de vote");
        }
        const data = await response.json();
        setRows(data); // Mise à jour des rows avec les données de la BD
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchBureaux();
  }, []);

  // Supprimer un bureau de vote
  const handleDeleteRow = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bureaux-de-vote/deleteBureauDeVote/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setRows(rows.filter((row) => row.id_bureau_vote !== id));
      console.log("Bureau de vote supprimé :", id);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Ajouter ou éditer un bureau de vote
  const handleSubmit = async (newRow) => {
    try {
      let response;

      if (rowToEdit === null) {
        // Ajout d'un nouveau bureau
        response = await fetch("http://localhost:8080/bureaux-de-vote/addBureauDeVote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        });
      } else {
        // Modification d'un bureau existant
        const id = rows[rowToEdit].id_bureau_vote;
        response = await fetch(
          `http://localhost:8080/bureaux-de-vote/editBureauDeVote/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRow),
          }
        );
      }

      if (!response.ok) throw new Error("Erreur lors de l'envoi des données");

      const updatedData = await response.json();

      // Mettre à jour l'état après ajout/édition
      setRows((prevRows) => {
        if (rowToEdit === null) {
          return [...prevRows, updatedData];
        } else {
          return prevRows.map((row, idx) => (idx === rowToEdit ? updatedData : row));
        }
      });

      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  return (
    <div className="BureauVote">
      <Table rows={rows} deleteRow={(idx) => handleDeleteRow(rows[idx].id_bureau_vote)} editRow={handleEditRow} />
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

export default BureauVote;
