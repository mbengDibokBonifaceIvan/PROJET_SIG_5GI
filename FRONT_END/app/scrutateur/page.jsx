"use client";
import "./App.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BiPlusIcon, BiTrashIcon, BiEditIcon } from "../utils/Icons";
import Footer from "../Components/Footer/footer";
import Sidebar from "../Components/Sidebar/SideBar";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";

const API_URL = "http://localhost:8080/resultats/all";

const Scrutateur = () => {
  const [candidats, setCandidats] = useState([]);
  const [candidatsList, setCandidatsList] = useState([]);
  const [bureauxOptions, setBureauxOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        setCandidats(data);
      } else {
        console.error("Erreur de récupération des votes");
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
      } else {
        console.error("Erreur lors de la récupération des bureaux de vote.");
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
      } else {
        console.error("Erreur lors de la récupération des candidats");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const bureau = bureauxOptions.find(
      (b) => b.nom_bureau.toLowerCase() === formData.bureau.toLowerCase()
    );

    if (!bureau) {
      alert(
        "Bureau de vote introuvable. Veuillez saisir un nom de bureau de vote valide."
      );
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
      ? `http://localhost:8080/resultats/editResultat/${editId}`
      : "http://localhost:8080/resultats/addResultat";

    const method = editId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
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
      await fetch(`http://localhost:8080/resultats/deleteResultat/${id}`, {
        method: "DELETE",
      });
      fetchVotes();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
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

          {/* Add button */}
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
            {BiPlusIcon} Ajouter un candidat
          </Button>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full mx-auto w-full bg-white dark:bg-dark-grey text-center border rounded-lg cursor-pointer shadow-sm dark:shadow-none">
              <thead className="dark:bg-gray-800">
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border-b">Nom du Candidat</th>
                  <th className="py-2 px-4 border-b">Nombre de voix</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidats.map((item) => (
                  <tr
                    key={item.id_résultat}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {" "}
                    <td className="py-2 px-4 border-b">
                      {item.candidat?.nom_candidat || "Unknown"}
                    </td>
                    <td className="py-2 px-4 border-b">{item.nombre_voix}</td>
                    <td className="py-2 px-4 border-b flex gap-5 text-center justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        {BiEditIcon}
                      </Button>
                      {/* Bouton Delete */}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id_résultat)}
                      >
                        {BiTrashIcon}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
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
                      onClick={() => setIsModalOpen(false)}
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
