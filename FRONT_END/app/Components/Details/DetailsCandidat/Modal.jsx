

import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      nom_candidat: "", // Correspond au backend
      parti_politique: "", // Correspond au backend
    }
  );
  const [errors, setErrors] = useState("");

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeModal]);



    useEffect(() => {
      if (defaultValue) {
        setFormState({
          nom_candidat: defaultValue.nom_candidat || "", // Assure la compatibilité
          parti_politique:defaultValue.parti_politique || "",
        });
      }
    }, [defaultValue]);

  // Validation function
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

  // Handle form changes
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);
    closeModal();
  };

  // Handle click outside modal to close
  const handleClickOutside = (event) => {
    if (event.target.className === "modal-container") {
      closeModal();
    }
  };

  return (
    <div className="modal-container" onClick={handleClickOutside}>
      <div className="fixed z-10 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal bg-white dark:bg-gray-800 rounded-lg p-8 w-96 mx-auto"> {/* Centered with mx-auto */}
          <div className="modal-header flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Candidat</h3>
            <button type="button" className="close-btn" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="nom_candidat" className="text-sm font-semibold">
                Nom
              </label>
              <input
                name="nom_candidat"
                onChange={handleChange}
                value={formState.nom_candidat}
                className="border rounded p-2"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="parti_politique" className="text-sm font-semibold">
                Parti Politique
              </label>
              <textarea
                name="parti_politique"
                onChange={handleChange}
                value={formState.parti_politique}
                className="border rounded p-2"
              />
            </div>
            {errors && (
              <div className="error bg-red-200 text-red-600 p-2 rounded mb-4">
                {`Veuillez remplir : ${errors}`}
              </div>
            )}
            <button
              type="submit"
              className="btn bg-blue-600 text-white px-4 py-2 rounded-lg block w-full"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
