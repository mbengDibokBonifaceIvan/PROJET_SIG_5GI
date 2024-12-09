import React, { useState, useEffect } from "react";
import "./CentreVote.css";
import { Table } from "../../../Components/Details/DetailsCentreVote/Table";
import { Modal } from "../../../Components/Details/DetailsCentreVote/Modal";

function CentreVote() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
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

  const handleSubmit = (newRow) => {
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
      // PUT : Modifier un centre existant
      fetch(
        `http://localhost:8080/centres-de-vote/editCentreDeVote/${newRow.id_centre_vote}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Centre modifié :", data);
          const updatedRows = rows.map((row, idx) =>
            idx === rowToEdit ? data : row
          );
          setRows(updatedRows);
        })
        .catch((err) => console.error("Erreur lors de la modification :", err));
    }
  };
  
  

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
          defaultValue={rowToEdit}
        />
      )}
    </div>
  );
}

export default CentreVote;
