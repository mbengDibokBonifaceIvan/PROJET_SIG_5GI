"use client";
import "./App.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BiPlusIcon, BiTrashIcon, BiEditIcon } from "../utils/Icons";
import Footer from "../Components/Footer/footer";
import Sidebar from "../Components/Sidebar/SideBar";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";
import CandidatesTable from "../Components/CandidatesTable";

// Composant Alert personnalisé
const CustomAlert = ({ type, message, onClose }) => {
  if (!message) return null;
  
  const bgColor = type === 'error' 
    ? 'bg-red-100 dark:bg-red-900/50' 
    : 'bg-green-100 dark:bg-green-900/50';
  
  const textColor = type === 'error'
    ? 'text-red-800 dark:text-red-200'
    : 'text-green-800 dark:text-green-200';

  return (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded relative mb-4`}>
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <span
          className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
          onClick={onClose}
        >
          <svg
            className="fill-current h-6 w-6"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Fermer</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </span>
      )}
    </div>
  );
};

const API_URL = "http://localhost:8080/resultats/all";
const Scrutateur = () => {
  const [candidats, setCandidats] = useState([]);
  const [candidatsList, setCandidatsList] = useState([]);
  const [bureauxOptions, setBureauxOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
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

  const fetchVotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCandidats(data);
      } else {
        console.error("Erreur de récupération des votes");
        setFeedback({
          type: "error",
          message: "Erreur lors de la récupération des votes",
        });
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
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
        console.log(data);
        setBureauxOptions(data);
      } else {
        setFeedback({
          type: "error",
          message: "Erreur lors de la récupération des bureaux de vote",
        });
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
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
        console.log(data);
        setCandidatsList(data);
      } else {
        setFeedback({
          type: "error",
          message: "Erreur lors de la récupération des candidats",
        });
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setFeedback({
        type: "error",
        message: "Erreur réseau lors de la récupération des candidats",
      });
    }
  };

  const validateWithPV = async (voteData) => {
    try {
      const pvResponse = await fetch("http://localhost:8080/pvs/all");
      if (!pvResponse.ok) {
        throw new Error("Erreur lors de la récupération des PV");
      }

      const pvs = await pvResponse.json();
      console.log(pvs);

      // Recherche du PV correspondant avec des critères stricts
      const matchingPV = pvs.find(
        (pv) => { 
          pv.bureauVote.id_bureau_vote === voteData.bureauVote.id_bureau_vote &&
            pv.candidat.id_candidat === voteData.candidat.id_candidat &&
            new Date(pv.date_saisie).toISOString().split("T")[0] ===
              voteData.date_saisie &&
            pv.annee_election === parseInt(voteData.annee_election);
          console.log(
            "pv :" +
              pv.bureauVote.id_bureau_vote +
              " resultat: " +
            voteData.bureauVote.id_bureau_vote 
            


          );
        }
      );

      if (!matchingPV) {
        throw new Error(
          "Aucun PV correspondant n'a été trouvé pour cette combinaison de bureau de vote, candidat, date et année"
        );
      }

      // Validation stricte du nombre de voix
      const pvVoix = parseInt(matchingPV.nombre_voix);
      const resultatsVoix = parseInt(voteData.nombre_voix);

      if (resultatsVoix !== pvVoix) {
        throw new Error(
          `Le nombre de voix saisi (${resultatsVoix}) ne correspond pas au PV (${pvVoix})`
        );
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      // Validation des champs requis
      if (
        !formData.bureau ||
        !formData.candidat ||
        !formData.date ||
        !formData.voix
      ) {
        setFeedback({
          type: "error",
          message: "Tous les champs sont obligatoires",
        });
        return;
      }

      const bureau = bureauxOptions.find(
        (b) => b.nom_bureau.toLowerCase() === formData.bureau.toLowerCase()
      );

      if (!bureau) {
        setFeedback({
          type: "error",
          message:
            "Bureau de vote introuvable. Veuillez saisir un nom de bureau de vote valide.",
        });
        return;
      }

      const voteData = {
        bureauVote: { id_bureau_vote: bureau.id_bureau_vote },
        candidat: { id_candidat: formData.candidat },
        nombre_voix: formData.voix,
        date_saisie: formData.date,
        annee_election: formData.annee,
      };

      console.log(voteData);
      // Validation avec le PV avant la sauvegarde
      await validateWithPV(voteData);

      const url = editId
        ? `http://localhost:8080/resultats/editResultat/${editId}`
        : "http://localhost:8080/resultats/addResultat";

      const response = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde des résultats");
      }

      setFeedback({
        type: "success",
        message: `Résultat ${editId ? "modifié" : "ajouté"} avec succès`,
      });

      // Rafraîchissement et réinitialisation
      await fetchVotes();
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
      console.error("Erreur :", error);
      setFeedback({
        type: "error",
        message:
          error.message || "Une erreur est survenue lors de la validation",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFeedback({ type: "", message: "" });
  };

 

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/resultats/deleteResultat/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      setFeedback({
        type: "success",
        message: "Suppression effectuée avec succès",
      });

      fetchVotes();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setFeedback({
        type: "error",
        message: "Erreur lors de la suppression",
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
      annee: new Date().getFullYear(),
    });
    setIsModalOpen(true);
    setFeedback({ type: "", message: "" }); // Reset feedback when opening edit modal
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col w-full ml-[15rem] bg-gray-100 dark:bg-dark-grey">
        <ThemeDropdown />
        <main className="flex flex-col flex-1 p-8 text-gray-800 dark:text-white">
          <h1 className="text-2xl font-bold mb-4 text-center">
            ENREGISTREMENT DES VOTES POUR CHAQUE CANDIDAT
          </h1>

          <CustomAlert
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback({ type: "", message: "" })}
          />

          <Button
            className="source-code-btn flex items-center gap-2 mb-4 dark:text-black text-2xl font-bold"
            onClick={() => {
              setEditId(null);
              setFormData({
                bureau: "",
                candidat: "",
                date: "",
                voix: "",
                annee: new Date().getFullYear(),
              });
              setFeedback({ type: "", message: "" });
              setIsModalOpen(true);
            }}
          >
            {BiPlusIcon} Ajouter un resultat
          </Button>
          <CandidatesTable
            candidats={candidats}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            BiEditIcon={BiEditIcon}
            BiTrashIcon={BiTrashIcon}
          />

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-opacity-50">
              <div className="bg-white dark:bg-dark-grey dark:text-white text-center p-6 rounded shadow-md w-1/3">
                <h2 className="text-xl font-bold mb-4">
                  {editId !== null ? "Modifier" : "Ajouter"} un candidat
                </h2>
                <div className="flex flex-col gap-4">
                  <select
                    name="bureau"
                    value={formData.bureau}
                    onChange={handleChange}
                    className="border p-2 rounded"
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
                    className="border p-2 rounded"
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
                    className="border p-2 rounded dark:bg-gray-800 dark:text-white"
                  />

                  <input
                    type="number"
                    name="voix"
                    placeholder="Nombre de voix"
                    value={formData.voix}
                    onChange={handleChange}
                    className="border p-2 rounded dark:bg-gray-800 dark:text-white"
                  />

                  <input
                    type="number"
                    name="annee"
                    placeholder="Année"
                    value={formData.annee}
                    readOnly
                    className="border p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
                  />

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsModalOpen(false);
                        setFeedback({ type: "", message: "" });
                      }}
                      className="dark:bg-gray-800 dark:text-white"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="dark:bg-gray-800 dark:text-white"
                    >
                      {editId !== null ? "Modifier" : "Enregistrer"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Scrutateur;