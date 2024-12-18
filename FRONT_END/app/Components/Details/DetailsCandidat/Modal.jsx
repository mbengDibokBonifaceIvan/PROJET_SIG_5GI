import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nom_candidat: "", // Correspond au backend
      parti_politique: "", // Correspond au backend
    }
  );
  const [errors, setErrors] = useState("");

  // Validation du formulaire
  const validateForm = () => {
    if (formState.nom_candidat && formState.parti_politique) {
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

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

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
            <label htmlFor="nom_candidat">Nom</label>
            <input
              name="nom_candidat"
              onChange={handleChange}
              value={formState.nom_candidat}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parti_politique">Parti Politique</label>
            <textarea
              name="parti_politique"
              onChange={handleChange}
              value={formState.parti_politique}
            />
          </div>
          {errors && <div className="error">{`Veuillez remplir : ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};
