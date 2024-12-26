// import React, { useState, useEffect } from "react";
// import "./Modal.css";

// export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
//   const [arrondissements, setArrondissements] = useState([]); // Liste dynamique des arrondissements
//   const [formState, setFormState] = useState(
//     defaultValue || {
//       nom_centre: "",
//       nom_arrondissement: "", // Par défaut vide pour éviter des erreurs
//     }
//   );

//   const [errors, setErrors] = useState("");

//   // Récupération des arrondissements depuis le backend
//   useEffect(() => {
//     fetch("http://localhost:8080/arrondissements/all")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Arrondissements récupérés :", data);
//         setArrondissements(data);
//       })
//       .catch((error) => console.error("Erreur lors de la récupération :", error));
//   }, []);

//   // Pré-remplir le formulaire en cas d'édition
//   useEffect(() => {
//     if (defaultValue) {
//       setFormState({
//         nom_centre: defaultValue.nom_centre || "",
//         nom_arrondissement: defaultValue.arrondissement?.nom_arrondissement || "",
//       });
//     }
//   }, [defaultValue]);

//   const validateForm = () => {
//     if (formState.nom_centre && formState.nom_arrondissement) {
//       setErrors("");
//       return true;
//     } else {
//       setErrors("Tous les champs sont requis");
//       return false;
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormState({ ...formState, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     // Trouver l'ID correspondant au nom d'arrondissement sélectionné
//     const selectedArrondissement = arrondissements.find(
//       (arr) => arr.id_arrondissement === parseInt(formState.nom_arrondissement)
//     );

//     // Formater les données à envoyer
//     const formattedData = {
//       nom_centre: formState.nom_centre,
//       arrondissement: { 
//         id_arrondissement: selectedArrondissement.id_arrondissement, 
//         nom_arrondissement: selectedArrondissement.nom_arrondissement,
//       },
//     };

//     console.log("Données envoyées :", formattedData);
//     onSubmit(formattedData); // Envoi des données
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
//             <label htmlFor="nom_centre">Nom du centre</label>
//             <input
//               name="nom_centre"
//               onChange={handleChange}
//               value={formState.nom_centre}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="nom_arrondissement">Arrondissement</label>
//             <select
//               name="nom_arrondissement"
//               onChange={handleChange}
//               value={formState.nom_arrondissement}
//             >
//               <option value="">Sélectionner...</option>
//               {arrondissements.map((arr) => (
//                 <option key={arr.id_arrondissement} value={arr.id_arrondissement}>
//                   {arr.nom_arrondissement}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {errors && <div className="error">{errors}</div>}
//           <button type="submit" className="btn" >
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
  const [arrondissements, setArrondissements] = useState([]);
  const [formState, setFormState] = useState(
    defaultValue || {
      nom_centre: "",
      nom_arrondissement: "",
    }
  );

  const [errors, setErrors] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/arrondissements/all")
      .then((response) => response.json())
      .then((data) => {
        setArrondissements(data);
      })
      .catch((error) => console.error("Erreur lors de la récupération :", error));
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setFormState({
        nom_centre: defaultValue.nom_centre || "",
        nom_arrondissement: defaultValue.arrondissement?.nom_arrondissement || "",
      });
    }
  }, [defaultValue]);

  const validateForm = () => {
    if (formState.nom_centre && formState.nom_arrondissement) {
      setErrors("");
      return true;
    } else {
      setErrors("Tous les champs sont requis");
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const selectedArrondissement = arrondissements.find(
      (arr) => arr.id_arrondissement === parseInt(formState.nom_arrondissement)
    );

    const formattedData = {
      nom_centre: formState.nom_centre,
      arrondissement: {
        id_arrondissement: selectedArrondissement.id_arrondissement,
        nom_arrondissement: selectedArrondissement.nom_arrondissement,
      },
    };

    onSubmit(formattedData);
    closeModal();
  };

  return (
    <div className="modal-container" onClick={(e) => { if (e.target.className === "modal-container") closeModal(); }}>
      <div className="modal bg-white dark:bg-gray-800 rounded-lg p-8 w-96 mx-auto">
        <div className="modal-header flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Candidat</h3>
          <button type="button" className="close-btn" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="nom_centre" className="text-sm font-semibold">Nom du centre</label>
            <input name="nom_centre" onChange={handleChange} value={formState.nom_centre} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="nom_arrondissement" className="text-sm font-semibold">Arrondissement</label>
            <select name="nom_arrondissement" onChange={handleChange} value={formState.nom_arrondissement} className="border rounded p-2">
              <option value="">Sélectionner...</option>
              {arrondissements.map((arr) => (
                <option key={arr.id_arrondissement} value={arr.id_arrondissement}>{arr.nom_arrondissement}</option>
              ))}
            </select>
          </div>
          {errors && <div className="error bg-red-200 text-red-600 p-2 rounded mb-4">{errors}</div>}
          <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded-lg block w-full">Valider</button>
        </form>
      </div>
    </div>
  );
};