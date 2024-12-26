// import React from "react";
// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import "./Table.css";

// export const Table = ({ rows, deleteRow, editRow }) => {
//   return (
//     <div className="table-wrapper">
//       <div className="table-title">
//         <h2>Liste Nationale Des Centres De Votes</h2>
//       </div>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Arrondissement</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, idx) => (
           
//               <tr key={idx}>
//                 <td>{row.nom_centre}</td>
//                 <td>{row.arrondissement?.nom_arrondissement || "Arrondissement inconnu"}</td>
//                 <td className="fit">
//                   <span className="actions">
//                     <BsFillTrashFill
//                       className="delete-btn"
//                       onClick={() => deleteRow(row.id_centre_vote)} // Suppression par ID
//                     />
//                     <BsFillPencilFill
//                       className="edit-btn"
//                       onClick={() => editRow(row)} // Édition avec l'objet complet
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
        <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">Liste Nationale Des Centres De Votes</h2>
      </div>

      <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg dark:bg-gray-800">
        <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
          <tr>
            <th>Nom</th>
            <th>Arrondissement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-200 dark:hover:bg-gray-500">
              <td>{row.nom_centre}</td>
              <td>{row.arrondissement?.nom_arrondissement || "Arrondissement inconnu"}</td>
              <td className="flex items-center justify-center">
                <BsFillTrashFill
                  className="delete-btn cursor-pointer"
                  onClick={() => deleteRow(row.id_centre_vote)}
                />
                <span className="mx-2"></span> {/* Espacement entre les icônes */}
                <BsFillPencilFill
                  className="edit-btn cursor-pointer"
                  onClick={() => editRow(row)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};