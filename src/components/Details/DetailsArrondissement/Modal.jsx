import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      // MotDePasse: "",
      Departement: "Dept1",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.Nom && formState.Departement ) {
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
            <label htmlFor="Departement">Departement</label>
            <select
              name="Departement"
              onChange={handleChange}
              value={formState.Departement}
            >
              <option value="Dept1">Dept1</option>
              <option value="Dept2">Dept2</option>
               <option value="Dept3">Dept3</option> 
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
