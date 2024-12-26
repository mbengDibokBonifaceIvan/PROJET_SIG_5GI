
// import React, { useState } from "react";

// import "./Modal.css";

// export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
//   const [formState, setFormState] = useState(
//     defaultValue || {
//       Nom: "",
//       MotDePasse: "",
//       Role: "Strutateur",
//     }
//   );
//   const [errors, setErrors] = useState("");

//   const validateForm = () => {
//     if (formState.Nom && formState.MotDePasse && formState.Role) {
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

//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     onSubmit(formState);

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
//             <label htmlFor="Nom">Nom</label>
//             <input name="Nom" onChange={handleChange} value={formState.Nom} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="MotDePasse">MotDePasse</label>
//             <textarea
//               name="MotDePasse"
//               onChange={handleChange}
//               value={formState.MotDePasse}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="Role">Role</label>
//             <select
//               name="Role"
//               onChange={handleChange}
//               value={formState.Role}
//             >
//               <option value="Strutateur">Strutateur</option>
//               <option value="Administrateur">Administrateur</option>
//               {/* <option value="error">Error</option> */}
//             </select>
//           </div>
//           {errors && <div className="error">{`Please include: ${errors}`}</div>}
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
  const [formState, setFormState] = useState(
    defaultValue || {
    nomUtilisateur: "",
    motDePasse: "",
    role: "Scrutateur",
  
  });
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

  // Update formState when defaultValue changes
  useEffect(() => {
    if (defaultValue) {
      setFormState({
        nomUtilisateur: defaultValue.nomUtilisateur || "",
        motDePasse: defaultValue.motDePasse || "",
        role: defaultValue.role || "Scrutateur",
      });
    }
  }, [defaultValue]);

  const validateForm = () => {
    if (formState.nomUtilisateur && formState.motDePasse && formState.role) {
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

    if (validateForm()) {
      onSubmit(formState);
      closeModal();
    }
  };



  return (
    <div className="modal-container" onClick={(e) => {
      if (e.target.className === "modal-container") closeModal();
    }}>
      <div className="fixed z-10 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal bg-white dark:bg-gray-800 rounded-lg p-8 w-96 mx-auto"> {/* Centered with mx-auto */}
          <div className="modal-header flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Utilisateur</h3>
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
              <label htmlFor="nomUtilisateur" className="text-sm font-semibold">
                Nom
              </label>
              <input
                name="nomUtilisateur"
                onChange={handleChange}
                value={formState.nomUtilisateur}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="motDePasse" className="text-sm font-semibold">Mot de Passe
              </label>
              <input
                name="motDePasse"
                onChange={handleChange}
                value={formState.motDePasse}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="role" className="text-sm font-semibold">
                Rôle
              </label>
              <select
                name="role"
                onChange={handleChange}
                value={formState.role}
                className="border rounded p-2 w-full"
              >
                <option value="Scrutateur">Scrutateur</option>
                <option value="Administrateur">Administrateur</option>
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
              Valider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};