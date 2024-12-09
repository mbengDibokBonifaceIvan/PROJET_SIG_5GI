import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      MotDePasse: "",
      Role: "Strutateur",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.Nom && formState.MotDePasse && formState.Role) {
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
            <label htmlFor="MotDePasse">MotDePasse</label>
            <textarea
              name="MotDePasse"
              onChange={handleChange}
              value={formState.MotDePasse}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Role">Role</label>
            <select
              name="Role"
              onChange={handleChange}
              value={formState.Role}
            >
              <option value="Strutateur">Strutateur</option>
              <option value="Administrateur">Administrateur</option>
              {/* <option value="error">Error</option> */}
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
