"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  BiPlusIcon,
  BiTrashIcon,
  BiEditIcon,
  BiUploadIcon,
  eye,
} from "../utils/Icons";
import Footer from "../Components/Footer/footer";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";
import CandidatesTablePv from "../Components/CandidatesTablePv";
import PvDetailsModal from "../Components/PvDetailsModal";
import SideBar from "../Components/Sidebar1/SideBar";


const API_URL = "http://localhost:8080/pvs/all";

// Composant d'alerte personnalisé
const Alert = ({ children, onClose }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-100 dark:border-red-700"
      role="alert"
    >
      <span className="block sm:inline">{children}</span>
      {onClose && (
        <span
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={onClose}
        >
          <svg
            className="fill-current h-6 w-6"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Fermer</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      )}
    </div>
  );
};

const ProcesVerbaux = () => {
  const [candidats, setCandidats] = useState([]);
  const [candidatsList, setCandidatsList] = useState([]);
  const [bureauxOptions, setBureauxOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPv, setSelectedPv] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    bureau: "",
    candidat: "",
    date: "",
    voix: "",
    annee: new Date().getFullYear(),
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchVotes();
    fetchCandidats();
    fetchBureaux();
  }, []);

  // Fonctions de fetch existantes...
  const fetchVotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setCandidats(data);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const fetchBureaux = async () => {
    try {
      const response = await fetch("http://localhost:8080/bureaux-de-vote/all");
      if (response.ok) {
        const data = await response.json();
        setBureauxOptions(data);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const fetchCandidats = async () => {
    try {
      const response = await fetch("http://localhost:8080/candidats/all");
      if (response.ok) {
        const data = await response.json();
        setCandidatsList(data);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const handleCSVUpload = async (event) => {
    const file = event.target.files[0];
    setIsUploading(true);
    setUploadError("");

    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target.result;
          const rows = text.split("\n");
          const pvs = [];

          for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(",");
            if (row.length >= 5) {
              const pv = {
                bureauVote: { id_bureau_vote: row[0].trim() },
                candidat: { id_candidat: row[1].trim() },
                nombre_voix: parseInt(row[2].trim()),
                date_saisie: row[3].trim(),
                annee_election: parseInt(row[4].trim()),
              };
              pvs.push(pv);
            }
          }

          // Envoi des PVs au serveur
          for (const pv of pvs) {
            try {
              await fetch("http://localhost:8080/pvs/addPv", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pv),
              });
            } catch (error) {
              console.error("Erreur lors de l'ajout d'un PV:", error);
              setUploadError("Erreur lors de l'importation des données");
            }
          }

          await fetchVotes();
          setIsUploading(false);
        };
        reader.readAsText(file);
      } catch (error) {
        console.error("Erreur lors du traitement du fichier:", error);
        setUploadError("Erreur lors du traitement du fichier");
        setIsUploading(false);
      }
    }
  };

  // Autres fonctions de gestion existantes...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const bureau = bureauxOptions.find(
      (b) => b.nom_bureau.toLowerCase() === formData.bureau.toLowerCase()
    );

    if (!bureau) {
      alert("Bureau de vote introuvable");
      return;
    }

    const voteData = {
      bureauVote: { id_bureau_vote: bureau.id_bureau_vote },
      candidat: { id_candidat: formData.candidat },
      nombre_voix: formData.voix,
      date_saisie: formData.date,
      annee_election: formData.annee,
    };

    const url = editId
      ? `http://localhost:8080/pvs/editPv/${editId}`
      : "http://localhost:8080/pvs/addPv";

    try {
      await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData),
      });

      fetchVotes();
      setIsModalOpen(false);
      setEditId(null);
      setFormData({
        bureau: "",
        candidat: "",
        date: "",
        voix: "",
        annee: new Date().getFullYear(),
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/pvs/deletePv/${id}`, {
        method: "DELETE",
      });
      fetchVotes();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id_Pv);
    setFormData({
      bureau: item.bureauVote ? item.bureauVote.nom_bureau : "",
      candidat: item.candidat?.id_candidat || "",
      date: item.date_saisie ? item.date_saisie.split("T")[0] : "",
      voix: item.nombre_voix || "",
      annee: item.annee_election || new Date().getFullYear(),
    });
    setIsModalOpen(true);
  };

  const handleViewPv = (pv) => {
    setSelectedPv(pv);
  };

    return (
      <SideBar>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col w-full ml-[15rem]">
            <ThemeDropdown />

            <main className="flex-1 p-8">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  PROCES VERBAL DES ELECTIONS
                </h1>

                <div className="flex justify-between items-center mb-6 gap-4">
                  <Button
                    onClick={() => {
                      setEditId(null);
                      setFormData({
                        bureau: "",
                        candidat: "",
                        date: "",
                        voix: "",
                        annee: new Date().getFullYear(),
                      });
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    {BiPlusIcon}
                    <span>Ajouter</span>
                  </Button>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-black dark:text-white rounded-md hover:bg-green-700 cursor-pointer dark:bg-green-500 dark:hover:bg-green-600">
                      {BiUploadIcon}
                      <span>Importer CSV</span>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        className="hidden"
                      />
                    </label>
                    {isUploading && (
                      <span className="text-gray-600 dark:text-gray-300">
                        Importation en cours...
                      </span>
                    )}
                  </div>
                </div>

                {uploadError && (
                  <div className="mb-4">
                    <Alert onClose={() => setUploadError("")}>
                      {uploadError}
                    </Alert>
                  </div>
                )}

                {/* Table des PVs */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <CandidatesTablePv
                    candidats={candidats}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    BiEditIcon={BiEditIcon}
                    BiTrashIcon={BiTrashIcon}
                    handleViewCandidate={handleViewPv}
                    Eye={eye}
                  />
                </div>
              </div>

              {/* Modal d'ajout/modification */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                      {editId !== null
                        ? "Modifier le PV"
                        : "Ajouter un nouveau PV"}
                    </h2>

                    <div className="space-y-4">
                      <select
                        name="bureau"
                        value={formData.bureau}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="" disabled>
                          Sélectionnez un bureau de vote
                        </option>
                        {bureauxOptions.map((bureau) => (
                          <option
                            key={bureau.id_bureau_vote}
                            value={bureau.nom_bureau}
                          >
                            {bureau.nom_bureau}
                          </option>
                        ))}
                      </select>

                      <select
                        name="candidat"
                        value={formData.candidat}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="" disabled>
                          Sélectionner un candidat
                        </option>
                        {candidatsList.map((candidat) => (
                          <option
                            key={candidat.id_candidat}
                            value={candidat.id_candidat}
                          >
                            {candidat.nom_candidat}
                          </option>
                        ))}
                      </select>

                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />

                      <input
                        type="number"
                        name="voix"
                        placeholder="Nombre de voix"
                        value={formData.voix}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />

                      <input
                        type="number"
                        name="annee"
                        value={formData.annee}
                        readOnly
                        className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />

                      <div className="flex justify-end gap-3 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setIsModalOpen(false)}
                          className="dark:bg-gray-700 dark:text-white"
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                          {editId !== null ? "Modifier" : "Enregistrer"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal de détails */}
              {selectedPv && (
                <PvDetailsModal
                  pv={selectedPv}
                  onClose={() => setSelectedPv(null)}
                />
              )}
            </main>

            <Footer />
          </div>
        </div>
      </SideBar>
    );
};

export default ProcesVerbaux;
