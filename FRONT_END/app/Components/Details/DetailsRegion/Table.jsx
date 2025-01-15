// import React from "react";
// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import "./Table.css";

// export const Table = ({ rows, deleteRow, editRow }) => {
//   return (
//     <div className="table-wrapper">
//       {/* Titre du tableau */}
//       <div className="table-title">
//         <h2>Liste Nationale des Régions</h2>
//       </div>

//       {/* Tableau des régions */}
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Nom de la Région</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, idx) => {
//             return (
//               <tr key={row.id_région || idx}>
//                 <td>{row.nom_région}</td> {/* Utilisation de "nom_région" */}
//                 <td className="fit">
//                   <span className="actions">
//                     {/* Bouton Supprimer */}
//                     <BsFillTrashFill
//                       className="delete-btn"
//                       title="Supprimer"
//                       onClick={() => deleteRow(idx)}
//                     />
//                     {/* Bouton Modifier */}
//                     <BsFillPencilFill
//                       className="edit-btn"
//                       title="Modifier"
//                       onClick={() => editRow(idx)}
//                     />
//                   </span>
//                 </td>
//               </tr>
//             );
//           })}
//           {/* Message si aucune donnée */}
//           {rows.length === 0 && (
//             <tr>
//               <td colSpan="2" style={{ textAlign: "center" }}>
//                 Aucune région disponible.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };










import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">
          Liste Nationale des Régions
        </h2>
      </div>

      <div className="mb-4"></div> {/* Espacement entre le titre et la table */}

      <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg  dark:bg-gray-800">
        <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
          <tr>
            <th>Nom de la Région</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={row.id_région || idx} className="hover:bg-gray-500 dark:hover:bg-gray-500">
                <td className="text-center" >{row.nom_région}</td> {/* Utilisation de "nom_région" */}
                <td className="flex  justify-center ">
                  <BsFillPencilFill
                    className="edit-btn cursor-pointer"
                    title="Modifier"
                    onClick={() => editRow(idx)}
                  />
                  <span className="mx-2"></span> {/* Espacement entre les icônes */}
                  <BsFillTrashFill
                    className="delete-btn cursor-pointer"
                    title="Supprimer"
                    onClick={() => deleteRow(idx)}
                  />
                </td>
              </tr>
            );
          })}
          {/* Message si aucune donnée */}
          {rows.length === 0 && (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Aucune région disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};