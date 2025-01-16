"use client";

import { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig";
import { Modal } from "../Components/Details/DetailsBureauVote/Modal";
import SideBar from "../Components/Sidebar1/SideBar";
import Footer from "../Components/Footer/footer";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PollingStationsTable from "../Components/PollingStationsTable ";
function BureauVote() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [centres, setCentres] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bureauxResponse, centresResponse] = await Promise.all([
          apiClient.get("/bureaux-de-vote/all"),
          apiClient.get("/centres-de-vote/all"),
        ]);
        setRows(bureauxResponse.data);
        setCentres(centresResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRow = async (targetIndex) => {
    const bureauToDelete = rows[targetIndex];
    try {
      await apiClient.delete(
        `/bureaux-de-vote/deleteBureauDeVote/${bureauToDelete.id_bureau_vote}`
      );
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error("Erreur lors de la suppression du bureau de vote", error);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    const isEditing = rowToEdit !== null;
    const url = isEditing
      ? `/bureaux-de-vote/editBureauDeVote/${rows[rowToEdit].id_bureau_vote}`
      : "/bureaux-de-vote/addBureauDeVote";

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
      console.error("Erreur lors de la soumission du bureau de vote", error);
    }
  };

  return (
    <SideBar>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm">
          <ThemeDropdown className="z-50" />
          <div className="flex-1" />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            {/* Actions Bar */}
            <div className="flex justify-end mb-6">
              <Button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
              >
                <Plus className="w-5 h-5" />
                Ajouter un bureau
              </Button>
            </div>

            {/* Table avec loader */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              </div>
            ) : (
              <PollingStationsTable
                rows={rows}
                editRow={handleEditRow}
                deleteRow={handleDeleteRow}
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
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
            centres={centres}
          />
        )}
      </div>
    </SideBar>
  );
}

export default BureauVote;
