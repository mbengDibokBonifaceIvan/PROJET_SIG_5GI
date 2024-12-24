// import React, { useState, useEffect } from "react";
// import "./Modal.css";

// export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
//   // Initialiser l'état avec les bonnes clés (nom_région)
//   const [formState, setFormState] = useState({
//     nom_région: "",
//   });

//   const [errors, setErrors] = useState("");

//   // Mettre à jour formState si une valeur par défaut est fournie (pour l'édition)
//   useEffect(() => {
//     if (defaultValue) {
//       setFormState({
//         nom_région: defaultValue.nom_région || "", // Assure la compatibilité
//       });
//     }
//   }, [defaultValue]);

//   // Validation du formulaire
//   const validateForm = () => {
//     if (formState.nom_région) {
//       setErrors("");
//       return true;
//     } else {
//       setErrors("Le champ nom_région est obligatoire.");
//       return false;
//     }
//   };

//   // Mettre à jour les champs lors de la saisie
//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   // Soumission du formulaire
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     // Appeler la fonction onSubmit avec les données du formulaire
//     onSubmit(formState);

//     // Fermer le modal
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
//         <form>
//           <div className="form-group">
//             <label htmlFor="nom_région">Nom de la Région</label>
//             <input
//               name="nom_région"
//               onChange={handleChange}
//               value={formState.nom_région}
//               placeholder="Entrez le nom de la région"
//             />
//           </div>
//           {errors && <div className="error">{errors}</div>}
//           <button type="submit" className="btn" onClick={handleSubmit}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };














import React, { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
    nom_région: "",
  });

  const [errors, setErrors] = useState("");

  // Mettre à jour formState si une valeur par défaut est fournie (pour l'édition)
  useEffect(() => {
    if (defaultValue) {
      setFormState({
        nom_région: defaultValue.nom_région || "", // Assure la compatibilité
      });
    }
  }, [defaultValue]);

  // Validation du formulaire
  const validateForm = () => {
    if (formState.nom_région) {
      setErrors("");
      return true;
    } else {
      setErrors("Le champ nom_région est obligatoire.");
      return false;
    }
  };

  // Mettre à jour les champs lors de la saisie
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Appeler la fonction onSubmit avec les données du formulaire
    onSubmit(formState);

    // Fermer le modal
    closeModal();
  };

  return (
    <div className="modal-container" onClick={(e) => {
      if (e.target.className === "modal-container") closeModal();
    }}>
      <div className="fixed z-10 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal bg-white dark:bg-gray-800 rounded-lg p-8 w-96 mx-auto"> {/* Centered with mx-auto */}
          <div className="modal-header flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Région</h3>
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
              <label htmlFor="nom_région" className="text-sm font-semibold">
                Nom de la Région
              </label>
              <input
                name="nom_région"
                onChange={handleChange}
                value={formState.nom_région}
                placeholder="Entrez le nom de la région"
                className="border rounded p-2 w-full"
              />
            </div>
            {errors && (
              <div className="error bg-red-200 text-red-600 p-2 rounded mb-4">
                {errors}
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