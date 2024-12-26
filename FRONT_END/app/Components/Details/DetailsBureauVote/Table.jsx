// import React from "react";
// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import "./Table.css";

// export const Table = ({ rows, deleteRow, editRow }) => {
//   return (
//     <div className="table-wrapper">
//       <div className="table-title">
//         <h2>Liste Nationale Des Bureaux De Vote</h2>
//       </div>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>Nom du Bureau</th>
//             <th className="expand">Latitude</th>
//             <th className="expand">Longitude</th>
//             <th>Centre de Vote</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, idx) => (
            
//               <tr key={row.id || idx}> {/* Utilisation de l'ID comme clé unique */}
//                 <td>{row.nom_bureau}</td> {/* Correspond à nom_bureau */}
//                 <td className="expand">{row.latitude}</td> {/* Correspond à latitude */}
//                 <td className="expand">{row.longitude}</td> {/* Correspond à longitude */}
//                 <td>{row.centreVote?.nom_centre || "Non défini"}</td> {/* Correspond à centreVote.nom_centre */}
//                 <td className="fit">
//                   <span className="actions">
//                     {/* Bouton de suppression */}
//                     <BsFillTrashFill
//                       className="delete-btn"
//                       onClick={() => deleteRow(idx)}
//                       title="Supprimer"
//                     />
//                     {/* Bouton d'édition */}
//                     <BsFillPencilFill
//                       className="edit-btn"
//                       onClick={() => editRow(idx)}
//                       title="Modifier"
//                     />
//                   </span>
//                 </td>
//               </tr>
//           ))}
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
        <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">Liste Nationale Des Bureaux de Vote</h2>
      </div>
      <div className="mb-4"></div> {/* Espacement entre le titre et la table */}
      <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg dark:bg-gray-800">
        <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
          <tr>
            <th>Nom du Bureau</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Centre de Vote</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={row.id || idx} className="hover:bg-gray-200 dark:hover:bg-gray-500">
                <td>{row.nom_bureau}</td>
                <td className="expand">{row.latitude}</td>
                <td className="expand">{row.longitude}</td>
                <td>{row.centreVote?.nom_centre || "Non défini"}</td>
                <td className="flex items-center justify-center">
                  <BsFillPencilFill
                    className="edit-btn cursor-pointer"
                    onClick={() => editRow(idx)}
                  />
                  <span className="mx-2"></span> {/* Espacement entre les icônes */}
                  <BsFillTrashFill
                    className="delete-btn cursor-pointer"
                    onClick={() => deleteRow(idx)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};