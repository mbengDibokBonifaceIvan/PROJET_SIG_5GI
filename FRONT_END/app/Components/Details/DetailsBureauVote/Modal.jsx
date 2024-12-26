// import React, { useState, useEffect } from "react";
// import "./Modal.css";

// export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
//   // État initial du formulaire avec des valeurs par défaut
//   const [formState, setFormState] = useState(
//     defaultValue || {
//       Nom: "",
//       PositionX: "",
//       PositionY: "",
//       CentreVote: "", // ID du centre de vote
//     }
//   );

//   const [centresDeVote, setCentresDeVote] = useState([]); // Stocker les centres de vote
//   const [errors, setErrors] = useState("");

//   // Récupérer tous les centres de vote depuis le backend
//   useEffect(() => {
//     const fetchCentresDeVote = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/centres-de-vote/all"); // Remplacez par la bonne URL
//         if (!response.ok) throw new Error("Erreur lors du chargement des centres de vote");
//         const data = await response.json();
//         setCentresDeVote(data); // Mettre à jour l'état avec les centres récupérés
//       } catch (error) {
//         console.error("Erreur :", error);
//       }
//     };

//     fetchCentresDeVote();
//   }, []);

//   // Validation du formulaire
//   const validateForm = () => {
//     if (formState.Nom && formState.PositionX && formState.PositionY && formState.CentreVote) {
//       setErrors("");
//       return true;
//     } else {
//       let errorFields = [];
//       for (const [key, value] of Object.entries(formState)) {
//         if (!value) {
//           errorFields.push(key);
//         }
//       }
//       setErrors(errorFields.join(", "));
//       return false;
//     }
//   };

//   // Gestion des changements dans le formulaire
//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   // Gestion de la soumission du formulaire
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     // Préparer les données pour le backend
//     const formattedData = {
//       nom_bureau: formState.Nom,
//       latitude: parseFloat(formState.PositionX),
//       longitude: parseFloat(formState.PositionY),
//       centreVote: { id_centre_vote: formState.CentreVote },
//     };

//     onSubmit(formattedData);
//     closeModal();
//   };

//   return (
//     <div
//       className="modal-container"
//       onClick={(e) => {
//         if (e.target.className === "modal-container") closeModal();
//       }}
//     >
//       <div className="modal">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="Nom">Nom</label>
//             <input
//               name="Nom"
//               onChange={handleChange}
//               value={formState.Nom}
//               placeholder="Nom du bureau"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="PositionX">Latitude</label>
//             <input
//               name="PositionX"
//               onChange={handleChange}
//               value={formState.PositionX}
//               placeholder="Latitude"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="PositionY">Longitude</label>
//             <input
//               name="PositionY"
//               onChange={handleChange}
//               value={formState.PositionY}
//               placeholder="Longitude"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="CentreVote">Centre de Vote</label>
//             <select
//               name="CentreVote"
//               onChange={handleChange}
//               value={formState.CentreVote}
//             >
//               <option value="">-- Sélectionnez un centre --</option>
//               {centresDeVote.map((centre) => (
//                 <option key={centre.id_centre_vote} value={centre.id_centre_vote}>
//                   {centre.nom_centre}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {errors && <div className="error">{`Veuillez remplir : ${errors}`}</div>}
//           <div className="modal-actions">
//             <button type="submit" className="btn">
//               Soumettre
//             </button>
//             <button type="button" className="btn btn-cancel" onClick={closeModal}>
//               Annuler
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

























import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Nom: "",
      PositionX: "",
      PositionY: "",
      CentreVote: "",
    }
  );

  const [centresDeVote, setCentresDeVote] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchCentresDeVote = async () => {
      try {
        const response = await fetch("http://localhost:8080/centres-de-vote/all");
        if (!response.ok) throw new Error("Erreur lors du chargement des centres de vote");
        const data = await response.json();
        setCentresDeVote(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchCentresDeVote();
  }, []);

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
    <div className="modal-container" onClick={(e) => { if (e.target.className === "modal-container") closeModal(); }}>
      <div className="modal bg-white dark:bg-gray-800 rounded-lg p-8 w-96 mx-auto">
        <div className="modal-header flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Bureau de Vote</h3>
          <button type="button" className="close-btn" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="Nom" className="text-sm font-semibold">Nom</label>
            <input name="Nom" onChange={handleChange} value={formState.Nom} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="PositionX" className="text-sm font-semibold">Position X</label>
            <input name="PositionX" onChange={handleChange} value={formState.PositionX} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="PositionY" className="text-sm font-semibold">Position Y</label>
            <input name="PositionY" onChange={handleChange} value={formState.PositionY} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="CentreVote" className="text-sm font-semibold">Centre de Vote</label>
            <select name="CentreVote" onChange={handleChange} value={formState.CentreVote} className="border rounded p-2">
              <option value="">-- Sélectionnez un centre --</option>
              {centresDeVote.map((centre) => (
                <option key={centre.id_centre_vote} value={centre.id_centre_vote}>
                  {centre.nom_centre}
                </option>
              ))}
            </select>
          </div>
          {errors && <div className="error bg-red-200 text-red-600 p-2 rounded mb-4">{`Veuillez remplir : ${errors}`}</div>}
          <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded-lg block w-full">Valider</button>
        </form>
      </div>
    </div>
  );
};