import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      // MotDePasse: "",
      Region: "MFoundi",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.Nom && formState.Region ) {
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
            <label htmlFor="Region">Region</label>
            <select
              name="Region"
              onChange={handleChange}
              value={formState.Region}
            >
              <option value="MFoundi">MFoundi</option>
              <option value="MFoundi1">MFoundi1</option>
               <option value="MFoundi2">MFoundi2</option> 
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
