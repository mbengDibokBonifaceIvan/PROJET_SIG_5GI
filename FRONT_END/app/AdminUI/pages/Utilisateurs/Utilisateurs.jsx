// "use client"
// import { useState } from "react";

// import "./Scrutateur.css";
// import { Table } from "../../../Components/Details/DetailsStrutateur/Table";
// import { Modal } from "../../../Components/Details/DetailsStrutateur/Modal";

// function Utilisateurs() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rows, setRows] = useState([
//     {
//       Nom: "Home",
//       MotDePasse: "1234",
//       Role: "Strutateur",
//     },
//     {
//       Nom: "Home1",
//       MotDePasse: "1234",
//       Role: "Strutateur",
//     },
//     {
//       Nom: "Home2",
//       MotDePasse: "1234",
//       Role: "Strutateur",
//     },
//   ]);
//   const [rowToEdit, setRowToEdit] = useState(null);

//   const handleDeleteRow = (targetIndex) => {
//     setRows(rows.filter((_, idx) => idx !== targetIndex));
//   };

//   const handleEditRow = (idx) => {
//     setRowToEdit(idx);

//     setModalOpen(true);
//   };

//   const handleSubmit = (newRow) => {
//     rowToEdit === null
//       ? setRows([...rows, newRow])
//       : setRows(
//           rows.map((currRow, idx) => {
//             if (idx !== rowToEdit) return currRow;

//             return newRow;
//           })
//         );
//   };

//   return (
//     <div className="Utilisateurs">
//       <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
//       <button onClick={() => setModalOpen(true)} className="btn">
//         Ajouter
//       </button>
//       {modalOpen && (
//         <Modal
//           closeModal={() => {
//             setModalOpen(false);
//             setRowToEdit(null);
//           }}
//           onSubmit={handleSubmit}
//           defaultValue={rowToEdit !== null && rows[rowToEdit]}
//         />
//       )}
//     </div>
//   );
// }

// export default Utilisateurs;



"use client";
import { useState, useEffect } from "react";
import "./Scrutateur.css";
import { Table } from "../../../Components/Details/DetailsStrutateur/Table";
import { Modal } from "../../../Components/Details/DetailsStrutateur/Modal";
import axios from "axios";

function Utilisateurs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);



  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/utilisateurs/all");
      setRows(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };
  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/utilisateurs/deleteUser/${id}`);
      fetchUtilisateurs(); // Rafraîchir les utilisateurs
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        await axios.post("http://localhost:8080/utilisateurs/addUser", newRow);
      } else {
        await axios.put(`http://localhost:8080/utilisateurs/editUser/${rows[rowToEdit].id_utilisateur}`, newRow);
      }
      fetchUtilisateurs(); // Rafraîchir les utilisateurs
      setModalOpen(false);
      setRowToEdit(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification de l'utilisateur:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
        Ajouter
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null ? rows[rowToEdit] : {}}
        />
      )}
    </div>
  );
}

export default Utilisateurs;