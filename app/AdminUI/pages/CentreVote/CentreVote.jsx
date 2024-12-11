import React, { useState, useEffect } from "react";
import "./CentreVote.css";
import { Table } from "../../../Components/Details/DetailsCentreVote/Table";
import { Modal } from "../../../Components/Details/DetailsCentreVote/Modal";

function CentreVote() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [arrondissements, setArrondissements] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch des centres de vote
  useEffect(() => {
    const fetchCentres = async () => {
      try {
        console.log("Fetch des centres de vote en cours...");
        const response = await fetch("http://localhost:8080/centres-de-vote/all");
        console.log("Réponse du fetch :", response);

        if (!response.ok) throw new Error("Erreur de récupération des centres");

        const data = await response.json();
        console.log("Données reçues :", data);
        setRows(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    const fetchArrondissements = async () => {
      try {
        const response = await fetch("http://localhost:8080/arrondissements/all");
        if (!response.ok) throw new Error("Erreur lors de la récupération des régions");
        const data = await response.json();
        setArrondissements(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchArrondissements();
    fetchCentres();
  }, []);

  const handleDeleteRow = async (id) => {
    try {
      console.log(`Suppression du centre avec ID : ${id}`);
      const response = await fetch(
        `http://localhost:8080/centres-de-vote/deleteCentreDeVote/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log("Réponse du DELETE :", response);

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setRows(rows.filter((row) => row.id_centre_vote !== id));
      console.log(`Centre avec ID ${id} supprimé.`);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {
      // POST : Ajouter un nouveau centre
      fetch("http://localhost:8080/centres-de-vote/addCentreDeVote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Nouveau centre ajouté :", data);
          setRows([...rows, data]);
        })
        .catch((err) => console.error("Erreur lors de l'ajout :", err));
    } else {
      const rowToUpdate = rows[rowToEdit];
    
      try { 
        
        // Envoi de la requête PUT pour mettre à jour le centre de vote
        const response = await fetch(
          `http://localhost:8080/centres-de-vote/editCentreDeVote/${rowToUpdate.id_centre_vote}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          }
        );
    
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du centre de vote.");
        }
    
        const updatedCentre = await response.json();
        console.log("Centre mis à jour :", updatedCentre);
    
        // Mettre à jour l'état avec les nouvelles données
        setRows(
          rows.map((currRow, idx) =>
            idx === rowToEdit ? updatedCentre : currRow
          )
        );
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
    }
      // Réinitialisation et fermeture du modal
      setModalOpen(false);
      setRowToEdit(null);
  
  }
  

  const handleEditRow = (row) => {
    console.log("Édition du centre :", row);
    setRowToEdit(row);
    setModalOpen(true);
  };

  return (
    <div className="CentreVote">
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
          arrondissements={arrondissements}
        />
      )}
    </div>
  );
}

export default CentreVote;
