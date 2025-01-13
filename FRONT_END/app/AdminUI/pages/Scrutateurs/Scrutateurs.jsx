"use client";
import { useState, useEffect } from "react";
import "./Scrutateur.css"
import { Table } from "../../../Components/Details/DetailsStrutateur/Table";
import { Modal } from "../../../Components/Details/DetailsStrutateur/Modal";

function Scrutateurs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]); // Initialise vide
  const [rowToEdit, setRowToEdit] = useState(null);



 
  useEffect(() => {
    fetch("http://localhost:8080/utilisateurs/getScrutateurs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Utilisateurs récupérés :", data);
        setRows(data);
      })
      .catch((err) => console.error("Erreur lors du chargement :", err));
  }, []);

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

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };





  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      // POST : Ajouter un candidat
      fetch("http://localhost:8080/utilisateurs/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom_utilisateur: newRow.nomUtilisateur,
          motDePasse: newRow.motDePasse,
          role: newRow.role,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Utilisateur ajouté :", data);
          setRows([...rows, data]);
        })
        .catch((err) => console.error("Erreur lors de l'ajout :", err));
    } else {
      // PUT : Modifier un candidat
      const userToUpdate = rows[rowToEdit];

      fetch(
        `http://localhost:8080/utilisateurs/editUser/${userToUpdate.id_utilisateur}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom_utilisateur: newRow.nomUtilisateur,
            motDePasse: newRow.motDePasse,
            role: newRow.role,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Utilisateur modifié :", data);
          const updatedRows = rows.map((currRow, idx) =>
            idx === rowToEdit ? data : currRow
          );
          setRows(updatedRows);
        })
        .catch((err) => console.error("Erreur lors de la modification :", err));
    }

    setModalOpen(false); // Fermer le modal
    setRowToEdit(null);
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
          defaultValue={rowToEdit !== null ? rows[rowToEdit] : {}}
        />
      )}
    </div>
  );
}

export default Scrutateurs;
