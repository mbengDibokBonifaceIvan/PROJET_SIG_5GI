import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  // Initialiser l'état avec les bonnes clés (nom_région)
  const [formState, setFormState] = useState({
    nom_région: "",
  });

  const [errors, setErrors] = useState("");

  // Mettre à jour formState si une valeur par défaut est fournie (pour l'édition)
  useEffect(() => {
    if (defaultValue) {
      setFormState({
        nom_région: defaultValue.nom_région || "", // Assure la compatibilité
      });
    }
  }, [defaultValue]);

  // Validation du formulaire
  const validateForm = () => {
    if (formState.nom_région) {
      setErrors("");
      return true;
    } else {
      setErrors("Le champ nom_région est obligatoire.");
      return false;
    }
  };

  // Mettre à jour les champs lors de la saisie
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Appeler la fonction onSubmit avec les données du formulaire
    onSubmit(formState);

    // Fermer le modal
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
            <label htmlFor="nom_région">Nom de la Région</label>
            <input
              name="nom_région"
              onChange={handleChange}
              value={formState.nom_région}
              placeholder="Entrez le nom de la région"
            />
          </div>
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
