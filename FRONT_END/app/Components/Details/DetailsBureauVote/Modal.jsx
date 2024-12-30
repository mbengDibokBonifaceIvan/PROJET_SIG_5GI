import React, { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nom_bureau: "",
      latitude: "",
      longitude: "",
      centreVote: "",
    }
  );

  const [centresDeVote, setCentresDeVote] = useState([]); // État pour stocker les centres de vote
  const [errors, setErrors] = useState("");

  // Fetch des centres de vote au chargement du modal
  useEffect(() => {
    const fetchCentresDeVote = async () => {
      try {
        const response = await apiClient.get("/centres-de-vote/all"); // Utilisation d'apiClient pour récupérer les centres de vote
        setCentresDeVote(response.data); // Mettre à jour l'état avec les centres de vote
      } catch (error) {
        console.error("Erreur lors de la récupération des centres de vote", error);
      }
    };

    fetchCentresDeVote();
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    if (formState.nom_bureau && formState.latitude && formState.longitude && formState.centreVote) {
      setErrors("");
      return true;
    } else {
      const errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) errorFields.push(key);
      }
      setErrors(errorFields.join(", "));
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

    const selectedCentre = centresDeVote.find(
      (centre) => centre.id_centre_vote === parseInt(formState.centreVote)
    );
  
    // Formater les données pour inclure les coordonnées comme un tuple d'objet
    const formattedData = {
      nom_bureau: formState.nom_bureau,
      coordonnees: {
        latitude: parseFloat(formState.latitude),
        longitude: parseFloat(formState.longitude),
      },
      centreVote: {
        id_centre_vote: selectedCentre.id_centre_vote,
        nom_centre: selectedCentre.nom_centre,
      },
    };
  
    // Appeler la fonction onSubmit avec les données formatées
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
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Bureau de Vote</h3>
            <button type="button" className="close-btn" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="nom_bureau" className="text-sm font-semibold">Nom du Bureau</label>
              <input
                name="nom_bureau"
                onChange={handleChange}
                value={formState.nom_bureau}
                className="border rounded p-2 w-full"
                placeholder="Entrez le nom du bureau"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="latitude" className="text-sm font-semibold">Latitude</label>
              <input
                name="latitude"
                onChange={handleChange}
                value={formState.latitude}
                className="border rounded p-2 w-full"
                placeholder="Entrez la latitude"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="longitude" className="text-sm font-semibold">Longitude</label>
              <input
                name="longitude"
                onChange={handleChange}
                value={formState.longitude}
                className="border rounded p-2 w-full"
                placeholder="Entrez la longitude"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="centreVote" className="text-sm font-semibold">Centre de Vote</label>
              <select
                name="centreVote"
                onChange={handleChange}
                value={formState.centreVote}
                className="border rounded p-2 w-full"
              >
                <option value="" disabled>
                  Sélectionnez un centre de vote
                </option>
                {centresDeVote.map((centre) => (
                  <option key={centre.id_centre_vote} value={centre.id_centre_vote}>
                    {centre.nom_centre}
                  </option>
                ))}
              </select>
            </div>
            {errors && (
              <div className="error bg-red-200 text-red-600 p-2 rounded mb-4">
                {`Veuillez remplir : ${errors}`}
              </div>
            )}
            <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded-lg block w-full">
              Valider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
