// import React from "react";
// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import "./Table.css";

// export const Table = ({ rows, deleteRow, editRow }) => {
//   return (
//     <div className="table-wrapper">
//       <div className="table-title">
//         <h2>Liste Nationale Des Électeurs</h2>
//       </div>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Prénom</th>
//             <th>Numéro</th>
//             <th className="expand">Date de Naissance</th>
//             <th className="expand">Date d'Inscription</th>
//             <th className="expand">Adresse</th>
//             <th>Bureau de Vote</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, idx) => (
            
//               <tr key={idx}>
//                 <td>{row.nom}</td>
//                 <td>{row.prénom}</td>
//                 <td>{row.numéro_électeur}</td>
//                 <td className="expand">{row.date_naissance}</td>
//                 <td className="expand">{row.date_inscription}</td>
//                 <td className="expand">{row.adresse}</td>
//                 <td>
//                   {row.bureauVote?.nom_bureau || "Non défini"}
//                 </td>
//                 <td className="fit">
//                   <span className="actions">
//                     <BsFillTrashFill
//                       className="delete-btn"
//                       onClick={() => deleteRow(row.id_électeur)}
//                     />
//                     <BsFillPencilFill
//                       className="edit-btn"
//                       onClick={() => editRow(row)}
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
        <h2 className="text-3xl font-bold text-white bg-blue-500 rounded-md p-2">
          Liste Nationale Des Électeurs
        </h2>
      </div>
      <div className="mb-4"></div>
      <table className="mx-auto w-full md:w-3/4 lg:w-1/2 table-auto shadow-lg rounded-lg dark:bg-gray-800">
        <thead className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
          <tr>
            <th className="column">Nom</th>
            <th className="column">Prénom</th>
            <th className="column">Numéro</th>
            <th>Date de Naissance</th>
            <th>Date d'Inscription</th>
            <th>Adresse</th>
            <th>Bureau de Vote</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-200 dark:hover:bg-gray-500">
              <td className="column">{row.nom}</td>
              <td className="column text-center">{row.prénom}</td>
              <td className="column">{row.numéro_électeur}</td>
              <td>{row.date_naissance}</td>
              <td>{row.date_inscription}</td>
              <td>{row.adresse}</td>
              <td>{row.bureauVote?.nom_bureau || "Non défini"}</td>
              <td className="flex items-center justify-center">
                <BsFillPencilFill
                  className="edit-btn cursor-pointer"
                  onClick={() => editRow(row)}
                />
                <span className="mx-2"></span>
                <BsFillTrashFill
                  className="delete-btn cursor-pointer"
                  onClick={() => deleteRow(row.id_électeur)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};