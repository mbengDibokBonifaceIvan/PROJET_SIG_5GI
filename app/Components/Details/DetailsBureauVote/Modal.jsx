import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      PositionX: "",
      PositionY: "",
      CentreVote: "C1",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.Nom && formState.PositionX && formState.PositionY && formState.CentreVote) {
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
            <label htmlFor="PositionX">PositionX</label>
            <textarea
              name="PositionX"
              onChange={handleChange}
              value={formState.PositionX}
            />
          </div>

          <div className="form-group">
            <label htmlFor="PositionY">PositionY</label>
            <textarea
              name="PositionY"
              onChange={handleChange}
              value={formState.PositionY}
            />
          </div>

          <div className="form-group">
            <label htmlFor="CentreVote">CentreVote</label>
            <select
              name="CentreVote"
              onChange={handleChange}
              value={formState.CentreVote}
            >
              <option value="C1">C1</option>
              <option value="C2">C2</option>
               <option value="C3">C3</option> 
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
