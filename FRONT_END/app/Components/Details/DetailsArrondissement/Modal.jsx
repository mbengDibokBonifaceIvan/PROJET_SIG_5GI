// import React, { useState, useEffect } from "react";
// import "./Modal.css";

// export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
//   const [formState, setFormState] = useState({
//     Nom: "",
//     Departement: "",
//   });

//   const [departements, setDepartements] = useState([]);
//   const [errors, setErrors] = useState("");

//   // Fetch des départements au chargement du modal
//   useEffect(() => {
//     const fetchDepartements = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/departements/all");
//         if (!response.ok) throw new Error("Erreur lors de la récupération des départements");
//         const data = await response.json();
//         setDepartements(data);
//       } catch (error) {
//         console.error("Erreur :", error);
//       }
//     };

//     fetchDepartements();
//   }, []);

//   // Met à jour le formulaire lorsque defaultValue change
//   useEffect(() => {
//     if (defaultValue) {
//       setFormState({
//         Nom: defaultValue.nom_arrondissement || "",
//         Departement: defaultValue.département?.id_département || "",
//       });
//     } else {
//       setFormState({
//         Nom: "",
//         Departement: "",
//       });
//     }
//   }, [defaultValue]);

//   // Validation du formulaire
//   const validateForm = () => {
//     if (formState.Nom && formState.Departement) {
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

//   // Gestion des changements des inputs
//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   // Soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const formattedData = {
//       nom_arrondissement: formState.Nom,
//       département: { id_département: formState.Departement },
//     };

//     try {
//       if (defaultValue) {
//         const response = await fetch(
//           `http://localhost:8080/arrondissements/editArrondissement/${defaultValue.id_arrondissement}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(formattedData),
//           }
//         );
//         if (!response.ok) throw new Error("Erreur lors de la mise à jour de l'arrondissement");
//         const updatedArrondissement = await response.json();
//         onSubmit(updatedArrondissement);
//       } else {
//         const response = await fetch("http://localhost:8080/arrondissements/addArrondissement", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formattedData),
//         });
//         if (!response.ok) throw new Error("Erreur lors de l'ajout de l'arrondissement");
//         const newArrondissement = await response.json();
//         onSubmit(newArrondissement);
//       }
//       closeModal();
//     } catch (error) {
//       console.error("Erreur lors de la soumission :", error);
//     }
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
//             <label htmlFor="Nom">Nom de l'Arrondissement</label>
//             <input
//               name="Nom"
//               onChange={handleChange}
//               value={formState.Nom}
//               placeholder="Entrez le nom de l'arrondissement"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="Departement">Département</label>
//             <select
//               name="Departement"
//               onChange={handleChange}
//               value={formState.Departement}
//             >
//               <option value="" disabled>
//                 Sélectionnez un département
//               </option>
//               {departements.map((departement) => (
//                 <option key={departement.id_département} value={departement.id_département}>
//                   {departement.nom_département}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {errors && <div className="error">{`Veuillez remplir : ${errors}`}</div>}
//           <button type="submit" className="btn" onClick={handleSubmit}>
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
  const [formState, setFormState] = useState({
    nom_arrondissement: "",
    département: "",
  });

  const [departements, setDepartements] = useState([]);
  const [errors, setErrors] = useState("");

  // Fetch des départements au chargement du modal
  useEffect(() => {
    const fetchDepartements = async () => {
      try {
        const response = await fetch("http://localhost:8080/departements/all");
        if (!response.ok) throw new Error("Erreur lors de la récupération des départements");
        const data = await response.json();
        setDepartements(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchDepartements();
  }, []);

  // Met à jour le formulaire lorsque defaultValue change
  useEffect(() => {
    if (defaultValue) {
      setFormState({
        nom_arrondissement: defaultValue.nom_arrondissement || "",
        département: defaultValue.département?.id_département || "",
      });
    } 
    // else {
    //   setFormState({
    //     Nom: "",
    //     Departement: "",
    //   });
    // }
  }, [defaultValue]);

  // Validation du formulaire
  const validateForm = () => {
    if (formState.nom_arrondissement && formState.département) {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);
    closeModal();
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   const formattedData = {
  //     nom_arrondissement: formState.nom_arrondissement,
  //     département: { id_département: formState.département },
  //   };

  //   try {
  //     if (defaultValue) {
  //       const response = await fetch(
  //         `http://localhost:8080/arrondissements/editArrondissement/${defaultValue.id_arrondissement}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(formattedData),
  //         }
  //       );
  //       if (!response.ok) throw new Error("Erreur lors de la mise à jour de l'arrondissement");
  //       const updatedArrondissement = await response.json();
  //       onSubmit(updatedArrondissement);
  //     } else {
  //       const response = await fetch("http://localhost:8080/arrondissements/addArrondissement", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formattedData),
  //       });
  //       if (!response.ok) throw new Error("Erreur lors de l'ajout de l'arrondissement");
  //       const newArrondissement = await response.json();
  //       onSubmit(newArrondissement);
  //     }
  //     closeModal();
  //   } catch (error) {
  //     console.error("Erreur lors de la soumission :", error);
  //   }
  // };

  // Handle click outside modal to close
  const handleClickOutside = (event) => {
    if (event.target.className === "modal-container") {
      closeModal();
    }
  };

  return (
    <div className="modal-container" onClick={handleClickOutside}>
      <div className="fixed z-10 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal bg-white dark:bg-gray-800 rounded-lg p-8 w-96 mx-auto">
          <div className="modal-header flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Arrondissement</h3>
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
              <label htmlFor="nom_arrondissement" className="text-sm font-semibold">Nom de l'Arrondissement</label>
              <input
                name="nom_arrondissement"
                onChange={handleChange}
                value={formState.nom_arrondissement}
                placeholder="Entrez le nom de l'arrondissement"
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="département" className="text-sm font-semibold">Département</label>
              <select
                name="département"
                onChange={handleChange}
                value={formState.département}
                className="border rounded p-2 w-full"
              >
                <option value="" disabled>Sélectionnez un département</option>
                {departements.map((departement) => (
                  <option key={departement.id_département} value={departement.id_département}>
                    {departement.nom_département}
                  </option>
                ))}
              </select>
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
              Soumettre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};