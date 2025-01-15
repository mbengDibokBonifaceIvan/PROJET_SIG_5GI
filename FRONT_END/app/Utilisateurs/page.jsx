"use client";

import { useState, useEffect } from "react";
import SideBar from "../Components/Sidebar1/SideBar";
import { Table } from "../Components/Details/DetailsStrutateur/Table";
import { Modal } from "../Components/Details/DetailsStrutateur/Modal";
import Footer from "../Components/Footer/footer";
import { UserPlus, Users } from "lucide-react";

function Utilisateurs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/utilisateurs/all");
      const data = await response.json();
      setRows(data);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRow = async (targetIndex) => {
    try {
      const userId = rows[targetIndex].id_utilisateur;
      await fetch(`http://localhost:8080/utilisateurs/deleteUser/${userId}`, {
        method: "DELETE",
      });
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        const response = await fetch(
          "http://localhost:8080/utilisateurs/addUser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nom_utilisateur: newRow.nomUtilisateur,
              motDePasse: newRow.motDePasse,
              role: newRow.role,
            }),
          }
        );
        const data = await response.json();
        setRows([...rows, data]);
      } else {
        const userToUpdate = rows[rowToEdit];
        const response = await fetch(
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
        );
        const data = await response.json();
        const updatedRows = rows.map((currRow, idx) =>
          idx === rowToEdit ? data : currRow
        );
        setRows(updatedRows);
      }
    } catch (error) {
      console.error("Erreur lors de l'opération :", error);
    }

    setModalOpen(false);
    setRowToEdit(null);
  };

  return (
    <SideBar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex-auto">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Gestion des Utilisateurs
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Liste complète des utilisateurs du système
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                    text-white font-medium rounded-lg transition duration-150 ease-in-out
                    shadow-md hover:shadow-lg active:scale-95 gap-2"
                >
                  <UserPlus className="h-5 w-5" />
                  Ajouter un utilisateur
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table
                  rows={rows}
                  deleteRow={handleDeleteRow}
                  editRow={handleEditRow}
                />
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 transform transition-all">
              <Modal
                closeModal={() => {
                  setModalOpen(false);
                  setRowToEdit(null);
                }}
                onSubmit={handleSubmit}
                defaultValue={rowToEdit !== null ? rows[rowToEdit] : {}}
              />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </SideBar>
  );
}

export default Utilisateurs;
