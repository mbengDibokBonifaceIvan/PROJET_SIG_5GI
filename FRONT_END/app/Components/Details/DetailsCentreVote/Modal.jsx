import React, { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
      nom_centre_vote: "",
      arrondissement: "",
    }
  );

  const [arrondissements, setArrondissements] = useState([]); // État pour stocker les arrondissements
  const [errors, setErrors] = useState("");

  // Mise à jour de l'état avec les valeurs par défaut si elles changent
    useEffect(() => {
      if (defaultValue) {
        setFormState({
          nom_centre_vote: defaultValue.nom_centre || "",
          arrondissement: defaultValue.arrondissement?.id_arrondissement || "",
        });
      }
    }, [defaultValue]);

  // Fetch des arrondissements au chargement du modal
  useEffect(() => {
    const fetchArrondissements = async () => {
      try {
        const response = await apiClient.get("/arrondissements/all"); // Utilisation d'apiClient pour récupérer les arrondissements
        setArrondissements(response.data); // Mettre à jour l'état avec les arrondissements
      } catch (error) {
        console.error("Erreur lors de la récupération des arrondissements", error);
      }
    };

    fetchArrondissements();
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    if (formState.nom_centre_vote && formState.arrondissement) {
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

    // Trouver l'arrondissement sélectionné par son ID
    const selectedArrondissement = arrondissements.find(
      (arrondissement) => arrondissement.id_arrondissement === parseInt(formState.arrondissement)
    );

    // Formater les données avec nom_centre_vote et l'arrondissement complet
    const formattedData = {
      nom_centre: formState.nom_centre_vote,
      arrondissement: {
        id_arrondissement: selectedArrondissement.id_arrondissement,
        nom_arrondissement: selectedArrondissement.nom_arrondissement, // Inclure le nom de l'arrondissement
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
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Centre de Vote</h3>
            <button type="button" className="close-btn" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="nom_centre_vote">Nom du Centre de Vote</label>
              <input
                name="nom_centre_vote"
                onChange={handleChange}
                value={formState.nom_centre_vote}
                placeholder="Entrez le nom du centre de vote"
              />
            </div>
            <div className="form-group">
              <label htmlFor="arrondissement">Arrondissement</label>
              <select
                name="arrondissement"
                onChange={handleChange}
                value={formState.arrondissement}
              >
                <option value="" disabled>
                  Sélectionnez un arrondissement
                </option>
                {arrondissements.map((arrondissement) => (
                  <option key={arrondissement.id_arrondissement} value={arrondissement.id_arrondissement}>
                    {arrondissement.nom_arrondissement}
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
