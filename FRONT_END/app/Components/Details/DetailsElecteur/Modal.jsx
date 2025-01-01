import React, { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
    nom: "",
    prénom: "",
    numéro_électeur: "",
    date_naissance: "",
    date_inscription: "",
    adresse: "",
    bureauVote: "",
  });
  const [bureaux, setBureaux] = useState([]);
  const [errors, setErrors] = useState("");

  // Fonction pour reformater une date au format yyyy-MM-dd
  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  // Mise à jour de l'état avec les valeurs par défaut si elles changent
  useEffect(() => {
    if (defaultValue) {
      setFormState({
        nom: defaultValue.nom || "",
        prénom: defaultValue.prénom || "",
        numéro_électeur: defaultValue.numéro_électeur || "",
        date_naissance: defaultValue.date_naissance ? formatDate(defaultValue.date_naissance) : "",
        date_inscription: defaultValue.date_inscription ? formatDate(defaultValue.date_inscription) : "",
        adresse: defaultValue.adresse || "",
        bureauVote: defaultValue.bureauVote?.id_bureau_vote || "",
      });
    }
  }, [defaultValue]);

  // Fetch des bureaux de vote au chargement du modal
  useEffect(() => {
    const fetchBureaux = async () => {
      try {
        const response = await apiClient.get("/bureaux-de-vote/all"); // Utilisation d'apiClient pour récupérer les bureaux de vote
        setBureaux(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des bureaux de vote", error);
      }
    };

    fetchBureaux();
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    if (
      formState.nom &&
      formState.prénom &&
      formState.numéro_électeur &&
      formState.date_naissance &&
      formState.date_inscription &&
      formState.adresse &&
      formState.bureauVote
    ) {
      setErrors("");
      return true;
    } else {
      const missingFields = Object.keys(formState).filter((key) => !formState[key]);
      setErrors(missingFields.join(", "));
      return false;
    }
  };

  // Gestion des changements des inputs
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const selectedBureauVote = bureaux.find(
      (bureau) => bureau.id_bureau_vote === parseInt(formState.bureauVote)
    );

    const formattedData = {
      nom: formState.nom,
      prénom: formState.prénom,
      numéro_électeur: formState.numéro_électeur,
      date_naissance: formatDate(formState.date_naissance), // Reformater avant l'envoi
      date_inscription: formatDate(formState.date_inscription), // Reformater avant l'envoi
      adresse: formState.adresse,
      bureauVote: {
        id_bureau_vote: selectedBureauVote.id_bureau_vote,
        nom_bureau: selectedBureauVote.nom_bureau,
      },
    };

    // Appeler la fonction onSubmit en passant les données formatées
    onSubmit(formattedData);
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="fixed z-10 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal bg-white dark:bg-gray-800 rounded-lg p-8 w-96">
          <div className="modal-header flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {defaultValue ? "Modifier un Électeur" : "Ajouter un Électeur"}
            </h3>
            <button type="button" className="close-btn" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                id="nom"
                name="nom"
                onChange={handleChange}
                value={formState.nom}
                placeholder="Entrez le nom"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="prénom">Prénom</label>
              <input
                id="prénom"
                name="prénom"
                onChange={handleChange}
                value={formState.prénom}
                placeholder="Entrez le prénom"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numéro_électeur">Numéro d'Électeur</label>
              <input
                id="numéro_électeur"
                name="numéro_électeur"
                onChange={handleChange}
                value={formState.numéro_électeur}
                placeholder="Entrez le numéro d'électeur"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_naissance">Date de Naissance</label>
              <input
                id="date_naissance"
                type="date"
                name="date_naissance"
                onChange={handleChange}
                value={formState.date_naissance}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_inscription">Date d'Inscription</label>
              <input
                id="date_inscription"
                type="date"
                name="date_inscription"
                onChange={handleChange}
                value={formState.date_inscription}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                id="adresse"
                name="adresse"
                onChange={handleChange}
                value={formState.adresse}
                placeholder="Entrez l'adresse"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bureauVote">Bureau de Vote</label>
              <select
                id="bureauVote"
                name="bureauVote"
                onChange={handleChange}
                value={formState.bureauVote}
                required
              >
                <option value="" disabled>
                  Sélectionnez un Bureau de Vote
                </option>
                {bureaux.map((bureau) => (
                  <option key={bureau.id_bureau_vote} value={bureau.id_bureau_vote}>
                    {bureau.nom_bureau}
                  </option>
                ))}
              </select>
            </div>
            {errors && <div className="error">{`Veuillez remplir : ${errors}`}</div>}
            <div className="modal-actions flex">
              <button type="submit" className="btn mr-4" onClick={handleSubmit}>
                Valider
              </button>
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
