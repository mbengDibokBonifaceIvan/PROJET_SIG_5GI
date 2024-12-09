"use client"
import { useState, useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get("http://localhost:8080/regions/all");
        setRows(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des régions :", error);
      }
    };

    fetchRegions();
  }, []);

  const handleDeleteRow = (targetIndex) => {
    const regionToDelete = rows[targetIndex];
    axios.delete(`http://localhost:8080/regions/deleteRegion/${regionToDelete.id_région}`)
      .then(() => {
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
      axios.post("http://localhost:8080/regions/addRegion", newRow)
        .then((response) => {
          setRows([...rows, response.data]);
          console.log("Succes",newRow);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la région :", error);
        });
    } else {
      const regionToEdit = rows[rowToEdit];
      axios.put(`http://localhost:8080/regions/editRegion/${regionToEdit.id_région}`, newRow)
        .then((response) => {
          setRows(rows.map((currRow, idx) => (idx !== rowToEdit ? currRow : response.data)));
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