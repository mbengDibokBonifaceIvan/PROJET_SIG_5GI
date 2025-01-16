"use client";

import { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig";
import { Modal } from "../Components/Details/DetailsElecteur/Modal";
import ElecteurTable from "@/app/Components/ElecteurTable";
import SideBar from "../Components/Sidebar1/SideBar";
import Footer from "../Components/Footer/footer";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";
import { Plus } from "lucide-react";

function Electeur() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [bureaux, setBureaux] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [electeursResponse, bureauxResponse] = await Promise.all([
          apiClient.get("/electeurs/all"),
          apiClient.get("/bureaux-de-vote/all"),
        ]);
        setRows(electeursResponse.data);
        setBureaux(bureauxResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRow = async (targetIndex) => {
    const electeurToDelete = rows[targetIndex];
    try {
      await apiClient.delete(
        `/electeurs/deleteElecteur/${electeurToDelete.id_électeur}`
      );
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'électeur", error);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    const isEditing = rowToEdit !== null;
    const url = isEditing
      ? `/electeurs/editElecteur/${rows[rowToEdit].id_électeur}`
      : "/electeurs/addElecteur";

    try {
      const response = await apiClient({
        method: isEditing ? "PUT" : "POST",
        url: url,
        data: newRow,
      });

      if (isEditing) {
        setRows(
          rows.map((currRow, idx) =>
            idx === rowToEdit ? response.data : currRow
          )
        );
      } else {
        setRows([...rows, response.data]);
      }

      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission de l'électeur", error);
    }
  };

  const formatReadableDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  return (
    <SideBar>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="flex justify-start items-center p-4 bg-white dark:bg-gray-800 shadow-sm">
          <ThemeDropdown className="z-50" />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Actions Bar */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
              >
                <Plus className="w-5 h-5" />
                Ajouter un électeur
              </button>
            </div>

            {/* Table */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              </div>
            ) : (
              <ElecteurTable
                rows={rows.map((row) => ({
                  ...row,
                  date_naissance: formatReadableDate(row.date_naissance),
                  date_inscription: formatReadableDate(row.date_inscription),
                }))}
                deleteRow={handleDeleteRow}
                editRow={handleEditRow}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer className="shadow-lg" />

        {/* Modal */}
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null ? rows[rowToEdit] : {}}
            bureaux={bureaux}
          />
        )}
      </div>
    </SideBar>
  );
}

export default Electeur;
