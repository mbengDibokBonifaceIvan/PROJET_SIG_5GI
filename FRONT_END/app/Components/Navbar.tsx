"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { downloadIcon, lockIcon, github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "../context/globalContext";
import axios from "axios";
import jsPDF from "jspdf";
import  autoTable from "jspdf-autotable";


function Navbar() {
  const [resultatElection, setResultatElection] = useState({
    id_résultat: "",
    bureauVote: {
      id_bureau_vote: "",
      nom_bureau: "",
      coordonnees: {
        latitude: 0,
        longitude: 0,
      },
    },
      centreVote: {
        id_centre_vote: "",
        nom_centre: "",
        arrondissement: {
          id_arrondissement: "",
          nom_arrondissement: "",
          département: {
            id_département: "",
            nom_département: "",
            région: {
              id_région: 0,
              nom_région: "",
            },
          },
        },
      },
      candidat: {
        id_candidat: "",
        nom_candidat: "",
        parti_politique: "",
      },
      nombre_voix: 0,
      date_saisie: "",
      annee_election: 0,
    
  });
  const [candidatData, setCandidatData] = useState({
    id_candidat:"",
  nom_candidat: "",
  parti_politique: "",
  })
  const [resultats, setResultats] = useState({
    id_bureau_vote: "",
    nom_bureau: "",
    coordonnees: { latitude: "N/A", longitude: "N/A" },
  });
  
 useEffect(() => {
   const fetchDataCandidat = async () => {
     try {
       const response = await axios.get("http://localhost:8080/candidats/all");
       setCandidatData(response.data);
     } catch (error) {
       console.error("Erreur lors de la récupération des candidats :", error);
     }
   };

   const fetchDataResultats = async () => {
     try {
       const response = await axios.get("http://localhost:8080/resultats/all");
       setResultatElection(response.data);
     } catch (error) {
       console.error(
         "Erreur lors de la récupération des résultats des élections :",
         error
       );
     }
   };

   const fetchDataBureauxDeVote = async () => {
     try {
       const response = await axios.get(
         "http://localhost:8080/bureaux-de-vote/by-coordinates?latitude=40.7128&longitude=-74.006"
       );
       setResultats(response.data);
     } catch (error) {
       console.error(
         "Erreur lors de la récupération des bureaux de vote :",
         error
       );
     }
   };

   fetchDataCandidat();
   fetchDataResultats();
   fetchDataBureauxDeVote();
 }, []);
 
 

  const generatePDF = () => {
    const pdf = new jsPDF();

   const title = "REPUBLIQUE DU CAMEROUN";
   const motto = "PAIX-TRAVAIL-PATRIE";

   const bureauId = resultats.id_bureau_vote || "N/A";
   const bureauNom = resultats.nom_bureau || "N/A";
   const bureauCoordonnees = resultats.coordonnees || "N/A";
   const candidatNom = candidatData.nom_candidat || "N/A";
   const candidatParti = candidatData.parti_politique || "N/A";
   const nombreVoix = resultatElection.nombre_voix || 0; 

    const resumeInfo = "Résumé des informations électorales";
    
    const tableauDonnees = [
      {
        Nom: candidatData.nom_candidat,
        valeur: resultatElection.nombre_voix,
        bureauDeVote_id: resultats.nom_bureau,
        partiPolitique: candidatData.parti_politique,
      },
    ];
    const signatures = "Signatures : ____________________________________\n";

    pdf.setFontSize(18);
    pdf.text(title, 15, 20);
    pdf.setFontSize(14);
    pdf.text(motto, 15, 30);

    pdf.setFontSize(12);
    pdf.text(`ID du bureau de vote: ${bureauId}`, 15, 50);
    pdf.text(`Nom du bureau de vote: ${bureauNom}`, 15, 60);
    pdf.text(
      `Coordonnées: Latitude - ${bureauCoordonnees.latitude}, Longitude - ${bureauCoordonnees.longitude}`,
      15,
      70
    );

    pdf.setFontSize(14);
    pdf.text(resumeInfo, 15, 90);

    const tableRows = [["NOMS DU CANDIDAT", "NOMBRE DE VOIX", "NOM DU BUREAU DE VOTE", "PARTI POLITIQUE"]]; // Header row
    tableauDonnees.forEach((data) => {
      tableRows.push([
        data.Nom,
        "" + data.valeur,
        data.bureauDeVote_id,
        data.partiPolitique,
      ]);
    });

    autoTable(pdf, {
      startY: 100,
      head: [tableRows[0]],
      body: tableRows.slice(1),
    });

    pdf.setFontSize(12);
    pdf.text(`Candidat: ${candidatNom}`, 15, pdf.internal.pageSize.height - 70);
    pdf.text(
      `Parti politique: ${candidatParti}`,
      15,
      pdf.internal.pageSize.height - 60
    );
    pdf.text(
      `Nombre de voix: ${nombreVoix}`,
      15,
      pdf.internal.pageSize.height - 50
    );

    pdf.text(signatures, 15, pdf.internal.pageSize.height - 30);

    pdf.save("bordereau_resultats_electorals_cameroun.pdf");
  };
  const router = useRouter();
  const { state } = useGlobalContext();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div>
        {" "}
        <p className="text-2xl">ELECAM-RESULTS.COM</p>{" "}
      </div>
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={generatePDF}
          >
            {downloadIcon} Télécharger PDF
          </Button>
          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={goToLogin}
          >
            {lockIcon} Connexion
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
