import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [arrondissements, setArrondissements] = useState([]); // Liste dynamique des arrondissements
  const [formState, setFormState] = useState(
    defaultValue || {
      nom_centre: "",
      nom_arrondissement: "", // Par défaut vide pour éviter des erreurs
    }
  );

  const [errors, setErrors] = useState("");

  // Récupération des arrondissements depuis le backend
  useEffect(() => {
    fetch("http://localhost:8080/arrondissements/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("Arrondissements récupérés :", data);
        setArrondissements(data);
      })
      .catch((error) => console.error("Erreur lors de la récupération :", error));
  }, []);

  // Pré-remplir le formulaire en cas d'édition
  useEffect(() => {
    if (defaultValue) {
      setFormState({
        nom_centre: defaultValue.nom_centre || "",
        nom_arrondissement: defaultValue.arrondissement?.nom_arrondissement || "",
      });
    }
  }, [defaultValue]);

  const validateForm = () => {
    if (formState.nom_centre && formState.nom_arrondissement) {
      setErrors("");
      return true;
    } else {
      setErrors("Tous les champs sont requis");
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Trouver l'ID correspondant au nom d'arrondissement sélectionné
    const selectedArrondissement = arrondissements.find(
      (arr) => arr.id_arrondissement === parseInt(formState.nom_arrondissement)
    );

    // Formater les données à envoyer
    const formattedData = {
      nom_centre: formState.nom_centre,
      arrondissement: { 
        id_arrondissement: selectedArrondissement.id_arrondissement, 
        nom_arrondissement: selectedArrondissement.nom_arrondissement,
      },
    };

    console.log("Données envoyées :", formattedData);
    onSubmit(formattedData); // Envoi des données
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom_centre">Nom du centre</label>
            <input
              name="nom_centre"
              onChange={handleChange}
              value={formState.nom_centre}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nom_arrondissement">Arrondissement</label>
            <select
              name="nom_arrondissement"
              onChange={handleChange}
              value={formState.nom_arrondissement}
            >
              <option value="">Sélectionner...</option>
              {arrondissements.map((arr) => (
                <option key={arr.id_arrondissement} value={arr.id_arrondissement}>
                  {arr.nom_arrondissement}
                </option>
              ))}
            </select>
          </div>
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btn" >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
