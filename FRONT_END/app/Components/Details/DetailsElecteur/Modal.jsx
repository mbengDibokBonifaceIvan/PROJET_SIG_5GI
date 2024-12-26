// import React, { useState, useEffect } from "react";
// import "./Modal.css";

// export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
//   // État initial du formulaire
//   const [formState, setFormState] = useState(
//     defaultValue || {
//       Nom: "",
//       Prenom: "",
//       Numero: "",
//       DateNaissance: "",
//       Inscription: "",
//       Adresse: "",
//       BureauVote: "",
//     }
//   );

//   const [errors, setErrors] = useState("");
//   const [bureaux, setBureaux] = useState([]); // État pour stocker les bureaux de vote

//   // Récupérer les bureaux de vote depuis l'API
//   useEffect(() => {
//     fetch("http://localhost:8080/bureaux-de-vote/all")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Bureaux récupérés :", data);
//         setBureaux(data)
//       })
//       .catch((error) =>
//         console.error("Erreur lors de la récupération des bureaux :", error)
//       );
//   }, []);

//   useEffect(() => {
//     if (defaultValue) {
//       setFormState({
//         Nom: defaultValue.nom || "",
//         Prenom: defaultValue.prénom || "",
//         Numero: defaultValue.numéro_électeur || "",
//         DateNaissance: defaultValue.date_naissance || "",
//         Inscription: defaultValue.date_inscription || "",
//         Adresse: defaultValue.adresse || "",
//         BureauVote: defaultValue.bureau?.id_bureau_vote || "", // Utiliser l'ID du bureau de vote si disponible
//       });
//     }
//   }, [defaultValue]);

//   // Validation du formulaire
//   const validateForm = () => {
//     if (
//       formState.Nom &&
//       formState.Prenom &&
//       formState.Numero &&
//       formState.DateNaissance &&
//       formState.Inscription &&
//       formState.Adresse &&
//       formState.BureauVote
//     ) {
//       setErrors("");
//       return true;
//     } else {
//       setErrors("Tous les champs sont requis");
//       return false;
//     }
//   };

//   // Mettre à jour l'état du formulaire à chaque changement
//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   // Soumettre le formulaire
//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     if (!validateForm()) return;
  
//     // Trouver l'ID du bureau de vote correspondant au choix de l'utilisateur
//     const selectedBureauVote = bureaux.find(
//       (bureau) => bureau.id_bureau_vote  === parseInt(formState.BureauVote)
//     );
  
//     // Formater les données à envoyer au backend
//     const formattedData = {
//       nom: formState.Nom,
//       prénom: formState.Prenom,
//       numéro_électeur: formState.Numero,
//       date_naissance: formState.DateNaissance,
//       date_inscription: formState.Inscription,
//       adresse: formState.Adresse,
//       bureauVote: {
//         id_bureau_vote: selectedBureauVote.id_bureau_vote,
//         nom_bureau: selectedBureauVote.nom_bureau,
//       },
//     };
  
//     console.log("Données envoyées :", formattedData);
//     onSubmit(formattedData); // Envoi des données formatées
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
//             <input name="Nom" onChange={handleChange} value={formState.Nom} />
//           </div>

//           <div className="form-group">
//             <label htmlFor="Prenom">Prénom</label>
//             <input
//               name="Prenom"
//               onChange={handleChange}
//               value={formState.Prenom}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="Numero">Numéro</label>
//             <input
//               name="Numero"
//               onChange={handleChange}
//               value={formState.Numero}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="DateNaissance">Date de Naissance</label>
//             <input
//               type="date"
//               name="DateNaissance"
//               onChange={handleChange}
//               value={formState.DateNaissance}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="Inscription">Date d'Inscription</label>
//             <input
//               type="date"
//               name="Inscription"
//               onChange={handleChange}
//               value={formState.Inscription}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="Adresse">Adresse</label>
//             <input
//               name="Adresse"
//               onChange={handleChange}
//               value={formState.Adresse}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="BureauVote">Bureau de Vote</label>
//             <select
//               name="BureauVote"
//               onChange={handleChange}
//               value={formState.BureauVote}
//             >
//               <option value="">-- Sélectionner un Bureau --</option>
//               {bureaux.map((bureau) => (
//                 <option key={bureau.id_bureau_vote} value={bureau.id_bureau_vote}>
//                   {bureau.nom_bureau}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {errors && (
//             <div className="error">{`Veuillez remplir les champs : ${errors}`}</div>
//           )}
//           <button type="submit" className="btn">
//             Soumettre
//           </button>
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
      nom: "",
      prénom: "",
      numéro_électeur: "",
      date_naissance: "",
      date_inscription: "",
      adresse: "",
      bureauVote: "",
    }
  );
  const [errors, setErrors] = useState("");
  const [bureaux, setBureaux] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/bureaux-de-vote/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Bureaux récupérés :", data);
        setBureaux(data);
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
        BureauVote: defaultValue.bureau?.id_bureau_vote || "",
      });
    }
  }, [defaultValue]);

  const validateForm = () => {
    if (
      formState.nom &&
      formState.prénom &&
      formState.numéro_électeur &&
      formState.date_naissance &&
      formState.date_inscription &&
      formState.adresse &&
      formState.bureauVote
    ) {
      setErrors("");
      return true;
    } else {
      setErrors("Tous les champs sont requis");
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const selectedBureauVote = bureaux.find(
      (bureau) => bureau.id_bureau_vote === parseInt(formState.bureauVote)
    );

    const formattedData = {
      nom: formState.nom,
      prénom: formState.prénom,
      numéro_électeur: formState.numéro_électeur,
      date_naissance: formState.date_naissance,
      date_inscription: formState.date_inscription,
      adresse: formState.adresse,
      bureauVote: {
        id_bureau_vote: selectedBureauVote.id_bureau_vote,
        nom_bureau: selectedBureauVote.nom_bureau,
      },
    };

    console.log("Données envoyées :", formattedData);
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
            <label htmlFor="nom" className="text-sm font-semibold">Nom</label>
            <input name="nom" onChange={handleChange} value={formState.nom} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="prénom" className="text-sm font-semibold">Prénom</label>
            <input name="prénom" onChange={handleChange} value={formState.prénom} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="numéro_électeur" className="text-sm font-semibold">Numéro</label>
            <input name="numéro_électeur" onChange={handleChange} value={formState.numéro_électeur} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="date_naissance" className="text-sm font-semibold">Date de Naissance</label>
            <input type="date" name="date_naissance" onChange={handleChange} value={formState.date_naissance} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="date_inscription" className="text-sm font-semibold">Date d'Inscription</label>
            <input type="date" name="date_inscription" onChange={handleChange} value={formState.date_inscription} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="adresse" className="text-sm font-semibold">Adresse</label>
            <input name="adresse" onChange={handleChange} value={formState.adresse} className="border rounded p-2" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="bureauVote" className="text-sm font-semibold">Bureau de Vote</label>
            <select name="bureauVote" onChange={handleChange} value={formState.bureauVote} className="border rounded p-2">
              <option value="">-- Sélectionner un Bureau --</option>
              {bureaux.map((bureau) => (
                <option key={bureau.id_bureau_vote} value={bureau.id_bureau_vote}>
                  {bureau.nom_bureau}
                </option>
              ))}
            </select>
          </div>
          {errors && <div className="error bg-red-200 text-red-600 p-2 rounded mb-4">{`Veuillez remplir les champs : ${errors}`}</div>}
          <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded-lg block w-full">Soumettre</button>
        </form>
      </div>
    </div>
  );
};