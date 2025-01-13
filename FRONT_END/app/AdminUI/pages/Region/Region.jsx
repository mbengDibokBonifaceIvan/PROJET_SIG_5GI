"use client";
import { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Import du client configuré
import "./Region.css";
import { Table } from "../../../Components/Details/DetailsRegion/Table";
import { Modal } from "../../../Components/Details/DetailsRegion/Modal";

function Region() {
  const [modalOpen, setModalOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const [regionToEdit, setRegionToEdit] = useState(null);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await apiClient.get("/regions/all");
      setRegions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des régions :", error);
    }
  };

  const handleDeleteRegion = async (targetIndex) => {
    const regionToDelete = regions[targetIndex];
    try {
      await apiClient.delete(`/regions/deleteRegion/${regionToDelete.id_région}`);
      setRegions(regions.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEditRegion = (idx) => {
    setRegionToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRegion) => {
    try {
      if (regionToEdit === null) {
        const response = await apiClient.post("/regions/addRegion", newRegion);
        setRegions([...regions, response.data]);
      } else {
        const regionToUpdate = regions[regionToEdit];
        const response = await apiClient.put(
          `/regions/editRegion/${regionToUpdate.id_région}`,
          newRegion
        );
        setRegions(
          regions.map((region, idx) =>
            idx === regionToEdit ? response.data : region
          )
        );
      }

      setModalOpen(false);
      setRegionToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Table rows={regions} deleteRow={handleDeleteRegion} editRow={handleEditRegion} />

      <button
        onClick={() => setModalOpen(true)}
        className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
      >
        Ajouter Région
      </button>

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRegionToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={regionToEdit !== null ? regions[regionToEdit] : { nom_région: "" }}
        />
      )}
    </div>
  );
}

export default Region;
