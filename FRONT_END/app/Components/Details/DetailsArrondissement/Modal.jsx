import React, { useState, useEffect } from "react";
import apiClient from "../../../utils/axiosConfig"; // Importer l'instance d'axios configurée
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
    nom_arrondissement: "",
    département: "",
  });
  const [departements, setDepartements] = useState([]); // État pour stocker les départements
  const [errors, setErrors] = useState("");

  // Mettre à jour `formState` lorsque `defaultValue` change
  useEffect(() => {
    if (defaultValue) {
      setFormState({
        nom_arrondissement: defaultValue.nom_arrondissement || "",
        département: defaultValue.département?.id_département || "",
      });
    }
  }, [defaultValue]);

  // Fetch des départements au chargement du modal
  useEffect(() => {
    const fetchDepartements = async () => {
      try {
        const response = await apiClient.get("/departements/all"); // Utilisation d'apiClient pour récupérer les départements
        setDepartements(response.data); // Mettre à jour l'état avec les départements
      } catch (error) {
        console.error("Erreur lors de la récupération des départements", error);
      }
    };

    fetchDepartements();
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    if (formState.nom_arrondissement && formState.département) {
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

    // Trouver le département sélectionné par son ID
    const selectedDepartement = departements.find(
      (departement) => departement.id_département === parseInt(formState.département)
    );

    // Formater les données avec nom_arrondissement et le département complet
    const formattedData = {
      nom_arrondissement: formState.nom_arrondissement,
      département: {
        id_département: selectedDepartement.id_département,
        nom_département: selectedDepartement.nom_département,
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
              {defaultValue ? "Modifier un Arrondissement" : "Ajouter un Arrondissement"}
            </h3>
            <button type="button" className="close-btn" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="nom_arrondissement">Nom de l'Arrondissement</label>
              <input
                id="nom_arrondissement"
                name="nom_arrondissement"
                onChange={handleChange}
                value={formState.nom_arrondissement}
                placeholder="Entrez le nom de l'arrondissement"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="département">Département</label>
              <select
                id="département"
                name="département"
                onChange={handleChange}
                value={formState.département}
                required
              >
                <option value="" disabled>
                  Sélectionnez un département
                </option>
                {departements.map((departement) => (
                  <option key={departement.id_département} value={departement.id_département}>
                    {departement.nom_département}
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
