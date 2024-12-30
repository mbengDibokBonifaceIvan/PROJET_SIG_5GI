import React, { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      Region: "",
    }
  );

  const [regions, setRegions] = useState([]); // État pour stocker les régions
  const [errors, setErrors] = useState("");

  // Fetch des régions au chargement du modal
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await apiClient.get("/regions/all"); // Utilisation d'apiClient pour récupérer les régions
        setRegions(response.data); // Mettre à jour l'état avec les régions
      } catch (error) {
        console.error("Erreur lors de la récupération des régions", error);
      }
    };

    fetchRegions();
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    if (formState.Nom && formState.Region) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
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

    // Trouver la région sélectionnée par son ID
    const selectedRegion = regions.find(
      (region) => region.id_région === parseInt(formState.Region)
    );

    // Formater les données avec nom_département et la région complète
    const formattedData = {
      nom_département: formState.Nom,
      région: {
        id_région: selectedRegion.id_région,
        nom_région: selectedRegion.nom_région, // Inclure le nom de la région
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
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Département</h3>
            <button type="button" className="close-btn" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        <form>
          <div className="form-group">
            <label htmlFor="Nom">Nom du Département</label>
            <input
              name="Nom"
              onChange={handleChange}
              value={formState.Nom}
              placeholder="Entrez le nom du département"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Region">Région</label>
            <select
              name="Region"
              onChange={handleChange}
              value={formState.Region}
            >
              <option value="" disabled>
                Sélectionnez une région
              </option>
              {regions.map((region) => (
                <option key={region.id_région} value={region.id_région}>
                  {region.nom_région}
                </option>
              ))}
            </select>
          </div>
          {errors && <div className="error">{`Veuillez remplir : ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Soumettre
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};
