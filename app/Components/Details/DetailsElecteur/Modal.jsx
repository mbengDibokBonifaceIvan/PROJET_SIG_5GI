import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      Prenom: "",
      Numero: "",
      DateNaissance: "",
      Inscription: "",
      Adresse: "",
      BureauVote: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.Nom &&formState.Prenom && formState.Numero &&formState.DateNaissance && formState.Inscription && formState.Adresse && formState.BureauVote) {
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
          <div className="form-group">
            <label htmlFor="Nom">Nom</label>
            <input name="Nom" onChange={handleChange} value={formState.Nom} />
          </div>

          <div className="form-group">
            <label htmlFor="Prenom">Prenom</label>
            <input name="Prenom" onChange={handleChange} value={formState.Prenom} />
          </div>

          <div className="form-group">
            <label htmlFor="Numero">Numero</label>
            <input name="Numero" onChange={handleChange} value={formState.Numero} />
          </div>


          <div className="form-group">
            <label htmlFor="DateNaissance">DateNaissance</label>
            <textarea
              name="DateNaissance"
              onChange={handleChange}
              value={formState.DateNaissance}
            />
          </div>


          <div className="form-group">
            <label htmlFor="Inscription">Inscription</label>
            <textarea
              name="Inscription"
              onChange={handleChange}
              value={formState.Inscription}
            />
          </div>


          <div className="form-group">
            <label htmlFor="Adresse">Adresse</label>
            <textarea
              name="Adresse"
              onChange={handleChange}
              value={formState.Adresse}
            />
          </div>

          <div className="form-group">
            <label htmlFor="BureauVote">BureauVote</label>
            <select
              name="BureauVote"
              onChange={handleChange}
              value={formState.BureauVote}
            >
              <option value="B1">B1</option>
              <option value="B2">B2</option>
               <option value="B3">B3</option> 
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
