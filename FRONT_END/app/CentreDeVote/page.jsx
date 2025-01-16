

// CentreVote.jsx
"use client";
import { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig";
import { Modal } from "../Components/Details/DetailsCentreVote/Modal";
import CentreDeVoteTable from "@/app/Components/CentreDeVoteTable";
import SideBar from "../Components/Sidebar1/SideBar";
import Footer from "../Components/Footer/footer";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";

function CentreVote() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [arrondissements, setArrondissements] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [centresResponse, arrondissementsResponse] = await Promise.all([
          apiClient.get("/centres-de-vote/all"),
          apiClient.get("/arrondissements/all")
        ]);
        setRows(centresResponse.data);
        setArrondissements(arrondissementsResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteRow = async (targetIndex) => {
    const centreToDelete = rows[targetIndex];
    try {
      await apiClient.delete(`/centres-de-vote/deleteCentreDeVote/${centreToDelete.id_centre_vote}`);
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error("Erreur lors de la suppression du centre de vote", error);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    const isEditing = rowToEdit !== null;
    const url = isEditing
      ? `/centres-de-vote/editCentreDeVote/${rows[rowToEdit].id_centre_vote}`
      : "/centres-de-vote/addCentreDeVote";

    try {
      const response = await apiClient({
        method: isEditing ? "PUT" : "POST",
        url,
        data: newRow,
      });

      setRows(isEditing
        ? rows.map((currRow, idx) => idx === rowToEdit ? response.data : currRow)
        : [...rows, response.data]
      );
      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission du centre de vote", error);
    }
  };

  return (
    <SideBar>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-start mt-3 mb-6">
            <ThemeDropdown />
          </div>
          
          <div className="space-y-6">
            <CentreDeVoteTable
              rows={rows}
              editRow={handleEditRow}
              deleteRow={handleDeleteRow}
            />
            
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setModalOpen(true)}
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-colors duration-200"
              >
                Ajouter un centre
              </button>
            </div>
          </div>

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
        <Footer />
      </div>
    </SideBar>
  );
}

export default CentreVote;