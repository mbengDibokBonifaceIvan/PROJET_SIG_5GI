import React, { useState } from "react";
import styles from "./DataViewer.css";

export default function DataViewer({
  csvData,
  onDeleteCSVRowHandler,
  onEditCSVRowHandler,
  editingRowIndex,
  editingRowData,
  onEditRowDataInputHandler,
  onCancleEditingRowHandler,
  onSaveEditingRowDataHandler,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const onsub = (e) => {
    alert(" hello regardons si ca donne");
    console.log("message");
  };
  const onSubmit = async (event) => {
    console.log("avant");
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const promises = csvData.map(async (row) => {
        console.log("dans le try");
        // Destructure data for clarity
        const {
          Annee,
          Arrondissement,
          NomCandidat,
          PersonnesEligibles,
          Votants,
          VotesParCandidat,
        } = row;

        // Prepare separate API calls for each table
        const sessionResponse = await axios.post("/api/sessions", {
          annee: Annee,
        });
        const arrondissementResponse = await axios.post(
          "/api/arrondissements",
          {
            nom: Arrondissement,
          }
        );
        const candidatResponse = await axios.post("/api/addCandidat", {
          nom: NomCandidat,
        });
        const resultatsResponse = await axios.post("/api/resultats", {
          id_session: sessionResponse.data.id,
          id_arrondissement: arrondissementResponse.data.id,
          nombre_d_inscrits: PersonnesEligibles,
          nombre_de_votants: Votants,
        });

        // Handle potential errors within each request
        if (
          sessionResponse.status !== 201 ||
          candidatResponse.status !== 201 ||
          arrondissementResponse.status !== 201 ||
          resultatsResponse.status !== 201
        ) {
          throw new Error("Failed to insert data into one or more tables.");
        }

        const votesPromises = VotesParCandidat.split(",").map(async (vote) => {
          const candidatResponse = await axios.post("/api/addCandidat", {
            nom: vote.trim(),
          });

          const resultatsResponse = await axios.post("/api/resultats", {
            id_session: sessionResponse.data.id,
            id_arrondissement: arrondissementResponse.data.id,
            nombre_d_inscrits: PersonnesEligibles,
            nombre_de_votants: Votants,
          });

          // Enregistrer le vote associé à ce candidat
          return await axios.post("/api/votes", {
            id_resultat: resultatsResponse.data.id,
            id_candidat: candidatResponse.data.id,
          });
        });

        await Promise.all(votesPromises); // Attendre l'insertion de tous les votes// Wait for all votes to be inserted
      });
      console.log("HORS du try");
      await Promise.all(promises);
      console.log("apres le promise");
      // Wait for all data insertion to complete
      setIsLoading(false);
      alert("Données insérées avec succès!"); // Display success message
      console.log("apres le alert");
    } catch (err) {
      setIsLoading(false);
      setError(err.message); // Set error message for display
    }
  };

  let tableBody = null;

  if (csvData) {
    tableBody = csvData.map((row, rowIndex) => {
      if (editingRowIndex === rowIndex) {
        return (
          <tr key={rowIndex}>
            <td>{rowIndex + 1}.</td>
            <td>
              <input
                type="text"
                value={editingRowData.Annee}
                onChange={onEditRowDataInputHandler}
              />
            </td>
            <td>
              <span>{row.Arrondissement}</span>
            </td>
            <td>
              <span>{row.NomCandidat}</span>
            </td>
            <td>
              <span>{row.PersonnesEligibles}</span>
            </td>
            <td>
              <span>{row.Votants}</span>
            </td>
            <td>
              <span>{row.VotesParCandidat}</span>
            </td>
            <td>
              <button onClick={onCancleEditingRowHandler}>Cancel</button>
              <button onClick={onSaveEditingRowDataHandler}>Save</button>
            </td>
          </tr>
        );
      }

      return (
        <tr key={rowIndex}>
          <td>{rowIndex + 1}.</td>
          <td>
            <span>{row.Annee}</span>
          </td>
          <td>
            <span>{row.Arrondissement}</span>
          </td>
          <td>
            <span>{row.NomCandidat}</span>
          </td>
          <td>
            <span>{row.PersonnesEligibles}</span>
          </td>
          <td>
            <span>{row.Votants}</span>
          </td>
          <td>
            <span>{row.VotesParCandidat}</span>
          </td>
          <td>
            <button onClick={() => onDeleteCSVRowHandler(rowIndex)}>
              Delete
            </button>
            <button onClick={() => onEditCSVRowHandler(rowIndex)}>Edit</button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className={styles.Container}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Année</th>
            <th>Arrondissement</th>
            <th>NomCandidat</th>
            <th>PersonnesEligibles</th>
            <th>Votants</th>
            <th>VotesParCandidat</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <button onClick={onSubmit}>Valider</button>
    </div>
  );
}
