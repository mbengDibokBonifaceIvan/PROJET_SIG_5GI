// "use client";
// import { useState, useEffect } from "react";
// import "./Region.css";
// import { Table } from "../../../Components/Details/DetailsRegion/Table";
// import { Modal } from "../../../Components/Details/DetailsRegion/Modal";

// function Region() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [regions, setRegions] = useState([]); // Liste des régions
//   const [regionToEdit, setRegionToEdit] = useState(null); // Pour l'édition d'une région

//   // **Récupération des régions au chargement de la page**
//   useEffect(() => {
//     fetchRegions();
//   }, []);

//   const fetchRegions = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/regions/all");
//       if (!response.ok) throw new Error("Erreur lors de la récupération des régions");
//       const data = await response.json();
//       console.log("Données récupérées :", data);
//       setRegions(data);
//     } catch (error) {
//       console.error("Erreur :", error);
//     }
//   };

//   // **Supprimer une région**
//   const handleDeleteRegion = async (targetIndex) => {
//     const regionToDelete = regions[targetIndex];
//     try {
//       const response = await fetch(
//         `http://localhost:8080/regions/deleteRegion/${regionToDelete.id_région}`,
//         { method: "DELETE" }
//       );
//       if (!response.ok) throw new Error("Erreur lors de la suppression de la région");

//       // Mettre à jour la liste des régions
//       setRegions(regions.filter((_, idx) => idx !== targetIndex));
//     } catch (error) {
//       console.error("Erreur lors de la suppression :", error);
//     }
//   };

//   // **Ouvrir le modal pour l'édition**
//   const handleEditRegion = (idx) => {
//     setRegionToEdit(idx);
//     setModalOpen(true);
//   };

//   // **Ajouter ou Modifier une région**
//   const handleSubmit = async (newRegion) => {
//     try {
//       if (regionToEdit === null) {
//         // **Ajout d'une nouvelle région**
//         const response = await fetch("http://localhost:8080/regions/addRegion", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newRegion),
//         });

//         if (!response.ok) throw new Error("Erreur lors de l'ajout de la région");

//         const addedRegion = await response.json();
//         setRegions([...regions, addedRegion]); // Ajouter la région dans l'état
//       } else {
//         // **Mise à jour d'une région existante**
//         const regionToUpdate = regions[regionToEdit];
//         const response = await fetch(
//           `http://localhost:8080/regions/editRegion/${regionToUpdate.id_région}`,
//           {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newRegion),
//           }
//         );

//         if (!response.ok) throw new Error("Erreur lors de la modification de la région");

//         const updatedRegion = await response.json();
//         setRegions(
//           regions.map((region, idx) => (idx === regionToEdit ? updatedRegion : region))
//         );
//       }

//       setModalOpen(false);
//       setRegionToEdit(null);
//     } catch (error) {
//       console.error("Erreur lors de la soumission :", error);
//     }
//   };

//   return (
//     <div className="Region">
//       <h1 className="title">Gestion des Régions</h1>

//       {/* Tableau des régions */}
//       <Table rows={regions} deleteRow={handleDeleteRegion} editRow={handleEditRegion} />

//       {/* Bouton Ajouter */}
//       <button onClick={() => setModalOpen(true)} className="btn">
//         Ajouter Région
//       </button>

//       {/* Modal pour ajouter/modifier une région */}
//       {modalOpen && (
//         <Modal
//           closeModal={() => {
//             setModalOpen(false);
//             setRegionToEdit(null);
//           }}
//           onSubmit={handleSubmit}
//           defaultValue={regionToEdit !== null ? regions[regionToEdit] : { nom_région: "" }}
//         />
//       )}
//     </div>
//   );
// }

// export default Region;





"use client";
import { useState, useEffect } from "react";
import "./Region.css";
import { Table } from "../../../Components/Details/DetailsRegion/Table";
import { Modal } from "../../../Components/Details/DetailsRegion/Modal";

function Region() {
  const [modalOpen, setModalOpen] = useState(false);
  const [regions, setRegions] = useState([]); // Liste des régions
  const [regionToEdit, setRegionToEdit] = useState(null); // Pour l'édition d'une région

  // Récupération des régions au chargement de la page
  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await fetch("http://localhost:8080/regions/all");
      if (!response.ok) throw new Error("Erreur lors de la récupération des régions");
      const data = await response.json();
      console.log("Données récupérées :", data);
      setRegions(data);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Supprimer une région
  const handleDeleteRegion = async (targetIndex) => {
    const regionToDelete = regions[targetIndex];
    try {
      const response = await fetch(
        `http://localhost:8080/regions/deleteRegion/${regionToDelete.id_région}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Erreur lors de la suppression de la région");

      // Mettre à jour la liste des régions
      setRegions(regions.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Ouvrir le modal pour l'édition
  const handleEditRegion = (idx) => {
    setRegionToEdit(idx);
    setModalOpen(true);
  };

  // Ajouter ou Modifier une région
  const handleSubmit = async (newRegion) => {
    try {
      if (regionToEdit === null) {
        // Ajout d'une nouvelle région
        const response = await fetch("http://localhost:8080/regions/addRegion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRegion),
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout de la région");

        const addedRegion = await response.json();
        setRegions([...regions, addedRegion]); // Ajouter la région dans l'état
      } else {
        // Mise à jour d'une région existante
        const regionToUpdate = regions[regionToEdit];
        const response = await fetch(
          `http://localhost:8080/regions/editRegion/${regionToUpdate.id_région}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRegion),
          }
        );

        if (!response.ok) throw new Error("Erreur lors de la modification de la région");

        const updatedRegion = await response.json();
        setRegions(
          regions.map((region, idx) => (idx === regionToEdit ? updatedRegion : region))
        );
      }

      setModalOpen(false);
      setRegionToEdit(null);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
     

      {/* Tableau des régions */}
      <Table rows={regions} deleteRow={handleDeleteRegion} editRow={handleEditRegion} />

      {/* Bouton Ajouter */}
      <button
        onClick={() => setModalOpen(true)}
        className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
      >
        Ajouter Région
      </button>

      {/* Modal pour ajouter/modifier une région */}
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRegionToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={regionToEdit !== null ? regions[regionToEdit] : { nom_région: "" }}
        />
      )}
    </div>
  );
}

export default Region;