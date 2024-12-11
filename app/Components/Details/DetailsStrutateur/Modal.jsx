import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nom_utilisateur: "", // Aligné avec le backend
      mot_de_passe: "",
      role: "Strutateur",
    }
  );

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.nom_utilisateur && formState.mot_de_passe && formState.role) {
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

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

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
          {/* Champ Nom */}
          <div className="form-group">
            <label htmlFor="nom_utilisateur">Nom</label>
            <input
              name="nom_utilisateur"
              onChange={handleChange}
              value={formState.nom_utilisateur}
            />
          </div>

          {/* Champ Mot de Passe */}
          <div className="form-group">
            <label htmlFor="mot_de_passe">Mot de Passe</label>
            <input
              type="password"
              name="mot_de_passe"
              onChange={handleChange}
              value={formState.mot_de_passe}
            />
          </div>

          {/* Champ Role */}
          <div className="form-group">
            <label htmlFor="role">Rôle</label>
            <select
              name="role"
              onChange={handleChange}
              value={formState.role}
            >
              <option value="Strutateur">Strutateur</option>
              <option value="Administrateur">Administrateur</option>
            </select>
          </div>

          {/* Affichage des erreurs */}
          {errors && <div className="error">{`Veuillez remplir : ${errors}`}</div>}

          {/* Bouton de soumission */}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};
