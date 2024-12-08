import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      // MotDePasse: "",
      Arrondissement: "A1",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.Nom && formState.Arrondissement ) {
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
          {/* <div className="form-group">
            <label htmlFor="MotDePasse">MotDePasse</label>
            <textarea
              name="MotDePasse"
              onChange={handleChange}
              value={formState.MotDePasse}
            /> */}
          <div className="form-group">
            <label htmlFor="Arrondissement">Arrondissement</label>
            <select
              name="Arrondissement"
              onChange={handleChange}
              value={formState.Arrondissement}
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
               <option value="A3">A3</option> 
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
