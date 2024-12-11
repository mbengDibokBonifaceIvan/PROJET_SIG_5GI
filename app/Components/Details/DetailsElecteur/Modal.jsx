import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  // État initial du formulaire
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
  const [bureaux, setBureaux] = useState([]); // État pour stocker les bureaux de vote

  // Récupérer les bureaux de vote depuis l'API
  useEffect(() => {
    fetch("http://localhost:8080/bureaux-de-vote/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Bureaux récupérés :", data);
        setBureaux(data)
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des bureaux :", error)
      );
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setFormState({
        Nom: defaultValue.nom || "",
        Prenom: defaultValue.prénom || "",
        Numero: defaultValue.numéro_électeur || "",
        DateNaissance: defaultValue.date_naissance || "",
        Inscription: defaultValue.date_inscription || "",
        Adresse: defaultValue.adresse || "",
        BureauVote: defaultValue.bureau?.id_bureau_vote || "", // Utiliser l'ID du bureau de vote si disponible
      });
    }
  }, [defaultValue]);

  // Validation du formulaire
  const validateForm = () => {
    if (
      formState.Nom &&
      formState.Prenom &&
      formState.Numero &&
      formState.DateNaissance &&
      formState.Inscription &&
      formState.Adresse &&
      formState.BureauVote
    ) {
      setErrors("");
      return true;
    } else {
      setErrors("Tous les champs sont requis");
      return false;
    }
  };

  // Mettre à jour l'état du formulaire à chaque changement
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    // Trouver l'ID du bureau de vote correspondant au choix de l'utilisateur
    const selectedBureauVote = bureaux.find(
      (bureau) => bureau.id_bureau_vote  === parseInt(formState.BureauVote)
    );
  
    // Formater les données à envoyer au backend
    const formattedData = {
      nom: formState.Nom,
      prénom: formState.Prenom,
      numéro_électeur: formState.Numero,
      date_naissance: formState.DateNaissance,
      date_inscription: formState.Inscription,
      adresse: formState.Adresse,
      bureauVote: {
        id_bureau_vote: selectedBureauVote.id_bureau_vote,
        nom_bureau: selectedBureauVote.nom_bureau,
      },
    };
  
    console.log("Données envoyées :", formattedData);
    onSubmit(formattedData); // Envoi des données formatées
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
            <input name="Nom" onChange={handleChange} value={formState.Nom} />
          </div>

          <div className="form-group">
            <label htmlFor="Prenom">Prénom</label>
            <input
              name="Prenom"
              onChange={handleChange}
              value={formState.Prenom}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Numero">Numéro</label>
            <input
              name="Numero"
              onChange={handleChange}
              value={formState.Numero}
            />
          </div>

          <div className="form-group">
            <label htmlFor="DateNaissance">Date de Naissance</label>
            <input
              type="date"
              name="DateNaissance"
              onChange={handleChange}
              value={formState.DateNaissance}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Inscription">Date d'Inscription</label>
            <input
              type="date"
              name="Inscription"
              onChange={handleChange}
              value={formState.Inscription}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Adresse">Adresse</label>
            <input
              name="Adresse"
              onChange={handleChange}
              value={formState.Adresse}
            />
          </div>

          <div className="form-group">
            <label htmlFor="BureauVote">Bureau de Vote</label>
            <select
              name="BureauVote"
              onChange={handleChange}
              value={formState.BureauVote}
            >
              <option value="">-- Sélectionner un Bureau --</option>
              {bureaux.map((bureau) => (
                <option key={bureau.id_bureau_vote} value={bureau.id_bureau_vote}>
                  {bureau.nom_bureau}
                </option>
              ))}
            </select>
          </div>

          {errors && (
            <div className="error">{`Veuillez remplir les champs : ${errors}`}</div>
          )}
          <button type="submit" className="btn">
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};
