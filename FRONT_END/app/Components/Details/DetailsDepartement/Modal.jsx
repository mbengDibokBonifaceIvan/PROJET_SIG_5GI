import React, { useState, useEffect } from "react";
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
        const response = await fetch("http://localhost:8080/regions/all");
        if (!response.ok) throw new Error("Erreur lors de la récupération des régions");
        const data = await response.json();
        setRegions(data); // Mettre à jour l'état avec les régions
      } catch (error) {
        console.error("Erreur :", error);
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
      <div className="modal">
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
  );
};
