"use client";
import { useEffect, useState } from "react";
import "./Electeur.css";
import { Table } from "../../../Components/Details/DetailsElecteur/Table";
import { Modal } from "../../../Components/Details/DetailsElecteur/Modal";

function Electeur() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [bureaux, setBureaux] = useState([]);

  // Récupérer la liste des électeurs depuis le backend
  // useEffect(() => {
  //   fetch("http://localhost:8080/electeurs/all")
  //     .then((res) => res.json())
  //     .then((data) => setRows(data))
  //     .catch((error) => console.error("Erreur lors de la récupération :", error));
  // }, []);
  useEffect(() => {
    const fetchElecteurs = async () => {
      try {
        console.log("Fetch des électeurs en cours...");
        const response = await fetch("http://localhost:8080/electeurs/all");
        console.log("Réponse du fetch :", response);

        if (!response.ok) throw new Error("Erreur de récupération des electeurs");

        const data = await response.json();
        console.log("Données reçues :", data);
        setRows(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    const fetchBureaux = async () => {
      try {
        const response = await fetch("http://localhost:8080/bureaux-de-vote/all");
        if (!response.ok) throw new Error("Erreur lors de la récupération des bureaux");
        const data = await response.json();
        setBureaux(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchElecteurs();
    fetchBureaux();
  }, []);

  const handleDeleteRow = async (id) => {
    try {
      console.log(`Suppression de l'électeur avec ID : ${id}`);
      const response = await fetch(
        `http://localhost:8080/electeurs/deleteElecteur/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log("Réponse du DELETE :", response);

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setRows(rows.filter((row) => row.id_électeur !== id));
      console.log(`electeur avec ID ${id} supprimé.`);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Modifier un électeur
  const handleEditRow = (idx) => {
    console.log("Édition de l'electeur :", idx);
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Ajouter ou mettre à jour un électeur
  // const handleSubmit = (newRow) => {
  //   const method = rowToEdit === null ? "POST" : "PUT";
  //   const url =
  //     rowToEdit === null
  //       ? "http://localhost:8080/electeurs/addElecteur"
  //       : `http://localhost:8080/electeurs/editElecteur/${rows[rowToEdit].id_électeur}`;

  //   fetch(url, {
  //     method: method,
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newRow),
  //   })
  //     .then((res) => res.json())
  //     .then((updatedElecteur) => {
  //       if (rowToEdit === null) {
  //         setRows([...rows, updatedElecteur]); // Ajouter un nouveau
  //       } else {
  //         setRows(
  //           rows.map((currRow, idx) =>
  //             idx === rowToEdit ? updatedElecteur : currRow
  //           )
  //         );
  //       }
  //     })
  //     .catch((error) =>
  //       console.error("Erreur lors de l'ajout/mise à jour :", error)
  //     );

  //   setModalOpen(false);
  //   setRowToEdit(null);
  // };

  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {
      // POST : Ajouter un nouvel electeur
      fetch("http://localhost:8080/electeurs/addElecteur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Nouvel electeur ajouté :", data);
          setRows([...rows, data]);
        })
        .catch((err) => console.error("Erreur lors de l'ajout :", err));
    } else {
      const rowToUpdate = rows[rowToEdit];
    
      try {
        
        // Envoi de la requête PUT pour mettre à jour l'electeur
        const response = await fetch(
          `http://localhost:8080/electeurs/editElecteur/${rowToUpdate.id_électeur}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          }
        );
    
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour de l'electeur.");
        }
    
        const updatedElecteur = await response.json();
        console.log("electeur mis à jour :", updatedElecteur);
    
        // Mettre à jour l'état avec les nouvelles données
        setRows(
          rows.map((currRow, idx) =>
            idx === rowToEdit ? updatedElecteur : currRow
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

  return (
    <div className="Electeur">
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
          defaultValue={
            rowToEdit !== null && rows[rowToEdit]
            // {
            //   Nom: rows[rowToEdit]?.nom || "",
            //   Prenom: rows[rowToEdit]?.prénom || "",
            //   Numero: rows[rowToEdit]?.numéro_électeur || "",
            //   DateNaissance: rows[rowToEdit]?.date_naissance || "",
            //   Inscription: rows[rowToEdit]?.date_inscription || "",
            //   Adresse: rows[rowToEdit]?.adresse || "",
            //   BureauVote: rows[rowToEdit]?.bureauVote?.id || "",
            // }
          }
          bureauVote= {bureaux}
        />
      )}
    </div>
  );
}

export default Electeur;
