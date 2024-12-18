import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  // État initial du formulaire avec des valeurs par défaut
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      PositionX: "",
      PositionY: "",
      CentreVote: "", // ID du centre de vote
    }
  );

  const [centresDeVote, setCentresDeVote] = useState([]); // Stocker les centres de vote
  const [errors, setErrors] = useState("");

  // Récupérer tous les centres de vote depuis le backend
  useEffect(() => {
    const fetchCentresDeVote = async () => {
      try {
        const response = await fetch("http://localhost:8080/centres-de-vote/all"); // Remplacez par la bonne URL
        if (!response.ok) throw new Error("Erreur lors du chargement des centres de vote");
        const data = await response.json();
        setCentresDeVote(data); // Mettre à jour l'état avec les centres récupérés
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchCentresDeVote();
  }, []);

  // Validation du formulaire
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

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Préparer les données pour le backend
    const formattedData = {
      nom_bureau: formState.Nom,
      latitude: parseFloat(formState.PositionX),
      longitude: parseFloat(formState.PositionY),
      centreVote: { id_centre_vote: formState.CentreVote },
    };

    onSubmit(formattedData);
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Nom">Nom</label>
            <input
              name="Nom"
              onChange={handleChange}
              value={formState.Nom}
              placeholder="Nom du bureau"
            />
          </div>
          <div className="form-group">
            <label htmlFor="PositionX">Latitude</label>
            <input
              name="PositionX"
              onChange={handleChange}
              value={formState.PositionX}
              placeholder="Latitude"
            />
          </div>

          <div className="form-group">
            <label htmlFor="PositionY">Longitude</label>
            <input
              name="PositionY"
              onChange={handleChange}
              value={formState.PositionY}
              placeholder="Longitude"
            />
          </div>

          <div className="form-group">
            <label htmlFor="CentreVote">Centre de Vote</label>
            <select
              name="CentreVote"
              onChange={handleChange}
              value={formState.CentreVote}
            >
              <option value="">-- Sélectionnez un centre --</option>
              {centresDeVote.map((centre) => (
                <option key={centre.id_centre_vote} value={centre.id_centre_vote}>
                  {centre.nom_centre}
                </option>
              ))}
            </select>
          </div>

          {errors && <div className="error">{`Veuillez remplir : ${errors}`}</div>}
          <div className="modal-actions">
            <button type="submit" className="btn">
              Soumettre
            </button>
            <button type="button" className="btn btn-cancel" onClick={closeModal}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
