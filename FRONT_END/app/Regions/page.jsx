"use client";

import { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig";
import { Table } from "../Components/Details/DetailsRegion/Table";
import { Modal } from "../Components/Details/DetailsRegion/Modal";
import SideBar from "../Components/Sidebar1/SideBar";
import Footer from "../Components/Footer/footer";
import { FiPlus, FiLoader } from "react-icons/fi";

function Region() {
  const [modalOpen, setModalOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const [regionToEdit, setRegionToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get("/regions/all");
      setRegions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des régions :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRegion = async (targetIndex) => {
    const regionToDelete = regions[targetIndex];
    try {
      await apiClient.delete(
        `/regions/deleteRegion/${regionToDelete.id_région}`
      );
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex">
        <SideBar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Gestion des Régions
                </h1>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                >
                  <FiPlus className="mr-2 -ml-1 h-5 w-5 text-black dark:text-white" />
                  <span className="text-black dark:text-white">
                    Ajouter Région
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <FiLoader className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <Table
                    rows={regions}
                    deleteRow={handleDeleteRegion}
                    editRow={handleEditRegion}
                  />
                </div>
              )}

              {modalOpen && (
                <Modal
                  closeModal={() => {
                    setModalOpen(false);
                    setRegionToEdit(null);
                  }}
                  onSubmit={handleSubmit}
                  defaultValue={
                    regionToEdit !== null
                      ? regions[regionToEdit]
                      : { nom_région: "" }
                  }
                />
              )}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Region;
