import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      Departement: "",
    }
  );

  const [departements, setDepartements] = useState([]); // État pour stocker les départements
  const [errors, setErrors] = useState("");

  // Fetch des départements au chargement du modal
  useEffect(() => {
    const fetchDepartements = async () => {
      try {
        const response = await fetch("http://localhost:8080/departements/all");
        if (!response.ok) throw new Error("Erreur lors de la récupération des départements");
        const data = await response.json();
        setDepartements(data); // Mettre à jour l'état avec les départements
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchDepartements();
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    if (formState.Nom && formState.Departement) {
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

  // Gestion des changements des inputs
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formattedData = {
      nom_arrondissement: formState.Nom,
      département: { id_département: formState.Departement },
    };

    try {
      if (defaultValue) {
        // Si on édite un arrondissement, on fait une requête PUT
        const response = await fetch(
          `http://localhost:8080/arrondissements/editArrondissement/${defaultValue.id_arrondissement}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          }
        );
        if (!response.ok) throw new Error("Erreur lors de la mise à jour de l'arrondissement");

        const updatedArrondissement = await response.json();
        onSubmit(updatedArrondissement);
      } else {
        // Si on ajoute un nouvel arrondissement, on fait une requête POST
        const response = await fetch("http://localhost:8080/arrondissements/addArrondissement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });
        if (!response.ok) throw new Error("Erreur lors de l'ajout de l'arrondissement");

        const newArrondissement = await response.json();
        onSubmit(newArrondissement);
      }
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
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
            <label htmlFor="Nom">Nom de l'Arrondissement</label>
            <input
              name="Nom"
              onChange={handleChange}
              value={formState.Nom}
              placeholder="Entrez le nom de l'arrondissement"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Departement">Département</label>
            <select
              name="Departement"
              onChange={handleChange}
              value={formState.Departement}
            >
              <option value="" disabled>
                Sélectionnez un département
              </option>
              {departements.map((departement) => (
                <option key={departement.id_département} value={departement.id_département}>
                  {departement.nom_département}
                </option>
              ))}
            </select>
          </div>
          {errors && <div className="error">{`Veuillez remplir : ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};
