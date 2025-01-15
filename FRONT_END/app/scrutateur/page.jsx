"use client";

import { useState, useEffect } from "react";
import { BiPlusIcon, eye } from "../utils/Icons";
import Footer from "../Components/Footer/footer";
import Sidebar from "../Components/Sidebar/SideBar";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";
import CandidatesTable from "../Components/CandidatesTable";
import PvDetailsModal from "../Components/PvDetailsModal";
import { Button } from "@/components/ui/button";


const API_URL = "http://localhost:8080/resultats/all";

const Scrutateur = () => {
  const [candidats, setCandidats] = useState([]);
  const [candidatsList, setCandidatsList] = useState([]);
  const [bureauxOptions, setBureauxOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bureau: "",
    candidat: "",
    date: "",
    voix: "",
    annee: new Date().getFullYear(),
  });
  const [editId, setEditId] = useState(null);
  const [selectedPv, setSelectedPv] = useState(null);

  useEffect(() => {
    fetchVotes();
    fetchCandidats();
    fetchBureaux();
  }, []);

  const fetchVotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setCandidats(data);
      } else {
        setFeedback({
          type: "error",
          message: "Erreur lors de la récupération des votes",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erreur réseau lors de la récupération des votes",
      });
    }
  };

  const fetchBureaux = async () => {
    try {
      const response = await fetch("http://localhost:8080/bureaux-de-vote/all");
      if (response.ok) {
        const data = await response.json();
        setBureauxOptions(data);
      } else {
        setFeedback({
          type: "error",
          message: "Erreur lors de la récupération des bureaux de vote",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erreur réseau lors de la récupération des bureaux de vote",
      });
    }
  };

  const fetchCandidats = async () => {
    try {
      const response = await fetch("http://localhost:8080/candidats/all");
      if (response.ok) {
        const data = await response.json();
        setCandidatsList(data);
      } else {
        setFeedback({
          type: "error",
          message: "Erreur lors de la récupération des candidats",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erreur réseau lors de la récupération des candidats",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFeedback({ type: "", message: "" });
  };

  const validateForm = () => {
    if (
      !formData.bureau ||
      !formData.candidat ||
      !formData.date ||
      !formData.voix
    ) {
      setFeedback({
        type: "error",
        message: "Veuillez remplir tous les champs obligatoires",
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const bureau = bureauxOptions.find(
      (b) => b.nom_bureau.toLowerCase() === formData.bureau.toLowerCase()
    );

    if (!bureau) {
      setFeedback({
        type: "error",
        message:
          "Bureau de vote introuvable. Veuillez saisir un nom de bureau de vote valide.",
      });
      setIsLoading(false);
      return;
    }

    const voteData = {
      bureauVote: { id_bureau_vote: bureau.id_bureau_vote },
      candidat: { id_candidat: formData.candidat },
      nombre_voix: parseInt(formData.voix),
      date_saisie: formData.date,
      annee_election: formData.annee,
    };

    const url = editId
      ? `http://localhost:8080/resultats/editResultat/${editId}`
      : "http://localhost:8080/resultats/validateAndSave";

    const method = editId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          type: "success",
          message: editId
            ? "Résultat modifié avec succès"
            : "Résultat validé et enregistré avec succès",
        });
        fetchVotes();
        setTimeout(() => {
          setIsModalOpen(false);
          setEditId(null);
          setFormData({
            bureau: "",
            candidat: "",
            date: "",
            voix: "",
            annee: new Date().getFullYear(),
          });
        }, 1500);
      } else {
        setFeedback({
          type: "error",
          message: data.message || "Erreur lors de la sauvegarde",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erreur réseau lors de la sauvegarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

 {
   /**
   const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce résultat ?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/resultats/deleteResultat/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Résultat supprimé avec succès",
        });
        fetchVotes();
      } else {
        setFeedback({
          type: "error",
          message: "Erreur lors de la suppression",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erreur réseau lors de la suppression",
      });
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id_résultat);
    setFormData({
      bureau: item.bureauVote ? item.bureauVote.nom_bureau : "",
      candidat: item.candidat?.id_candidat || "",
      date: item.date_saisie ? item.date_saisie.split("T")[0] : "",
      voix: item.nombre_voix || "",
      annee: item.annee_election || new Date().getFullYear(),
    });
    setIsModalOpen(true);
    setFeedback({ type: "", message: "" });
  }; */
 }

  const handleViewPv = (pv) => {
    setSelectedPv(pv);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col w-full ml-[15rem] bg-gray-100 dark:bg-dark-grey">
        <ThemeDropdown />
        <main className="flex flex-col flex-1 p-8 text-gray-800 dark:text-white">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {" "}
            ENREGISTREMENT DES VOTES POUR CHAQUE CANDIDAT
          </h1>

          {feedback.message && (
            <div
              className={`mb-4 p-4 rounded-md ${
                feedback.type === "success"
                  ? "bg-green-900 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <Button
            className="source-code-btn flex items-center gap-2 mb-4 dark:text-black text-2xl font-bold "
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
          >
            {BiPlusIcon} Ajouter un resultat
          </Button>

          <CandidatesTable
            candidats={candidats}
            handleViewCandidate={handleViewPv}
            Eye={eye}
          />

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-opacity-50">
              <div className="bg-white dark:bg-dark-grey dark:text-white text-center p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">
                  {editId !== null ? "Modifier" : "Ajouter"} un resultat
                </h2>

                <div className="flex flex-col gap-4">
                  <select
                    name="bureau"
                    value={formData.bureau}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                    required
                  >
                    <option value="" disabled>
                      Selectionnez un bureau de vote
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
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                    required
                  >
                    <option value="" disabled>
                      Selectionner un candidat
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
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                    required
                  />

                  <input
                    type="number"
                    name="voix"
                    placeholder="Nombre de voix"
                    value={formData.voix}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                    required
                    min="0"
                  />

                  <input
                    type="number"
                    name="annee"
                    placeholder="Année"
                    value={formData.annee}
                    readOnly
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-600"
                  />

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      onClick={() => {
                        setIsModalOpen(false);
                        setFeedback({ type: "", message: "" });
                      }}
                      className="px-4 py-2 border rounded-md dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                      disabled={isLoading}
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Chargement..."
                        : editId !== null
                        ? "Modifier"
                        : "Enregistrer"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
  );
};

export default Scrutateur;
