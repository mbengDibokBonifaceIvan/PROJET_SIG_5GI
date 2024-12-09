"use client"
import { useState, useEffect } from "react";

import "./Region.css";
import { Table } from "../../../Components/Details/DetailsRegion/Table";
import { Modal } from "../../../Components/Details/DetailsRegion/Modal";

function Region() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Utilisation de useEffect pour récupérer les régions depuis le backend
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("http://localhost:8080/regions/all");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des régions");
        }
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des régions :", error);
      }
    };

    fetchRegions();
  }, []);

  const handleDeleteRow = (targetIndex) => {
    const regionToDelete = rows[targetIndex];
    fetch(`http://localhost:8080/regions/deleteRegion/${regionToDelete.id_région}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la région");
      }
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de la région :", error);
    });
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      fetch("http://localhost:8080/regions/addRegion", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout de la région");
        }
        return response.json();
      })
      .then((data) => {
        setRows([...rows, data]);
        console.log("Succès", newRow);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la région :", error);
      });
    } else {
      const regionToEdit = rows[rowToEdit];
      fetch(`http://localhost:8080/regions/editRegion/${regionToEdit.id_région}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour de la région");
        }
        return response.json();
      })
      .then((data) => {
        setRows(rows.map((currRow, idx) => (idx !== rowToEdit ? currRow : data)));
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la région :", error);
      });
    }
  };

  return (
    <div className="Region">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
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
  );
}

export default Region;