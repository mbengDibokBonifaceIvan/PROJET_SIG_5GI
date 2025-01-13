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
import autoTable from "jspdf-autotable";
import { lusitana } from "./lib/fonts";



function Navbar() {
  const [resultats, setResultats] = useState([]);
  const [annee, setAnnee] = useState(2024);
  const { votesResults } = useGlobalContext();

  useEffect(() => {
    const fetchAnnee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/resultats/annee/${votesResults.annee}`
        );
        setAnnee(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annee:", error);
      }
    };
    fetchAnnee();
  }, []);
  useEffect(() => {
    const fetchDataResultats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/resultats/all");
        setResultats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des résultats des élections :",
          error
        );
      }
    };

    fetchDataResultats();
  }, []);
const generatePDF = async () => {
  const pdf = new jsPDF();

  const title = "REPUBLIQUE DU CAMEROUN";
  const motto = "PAIX-TRAVAIL-PATRIE";
  const resumeInfo = "RESUME DES INFORMATIONS ELECTORALES";
  const signatures = "Signature : ______By WEBGENIUS_5GI\n";

  // Text styles
  pdf.setFont("times");
  pdf.setFontSize(18);

  // Insertion d'images
  const imgData1 = "/Armoiries_CMR.png";
  pdf.addImage(imgData1, "PNG", 10, 10, 30, 30);

  const imgData2 = "/LOGO-POLYTECHNIQUE-01-scaled.jpg";
  pdf.addImage(imgData2, "JPG", pdf.internal.pageSize.width - 40, 10, 30, 30);

  // Title
  pdf.text(title, pdf.internal.pageSize.width / 2, 20, { align: "center" });

  // Motto
  pdf.setFontSize(15);
  pdf.text(motto, pdf.internal.pageSize.width / 2, 30, { align: "center" });

  // Résumé des informations électorales
  pdf.setFontSize(16);
  pdf.text(resumeInfo, pdf.internal.pageSize.width / 2, 55, {
    align: "center",
  });

  // Table header and data for the first table
  const tableHeaders = [
    "Nom du candidat",
    "Nombre de voix",
    "Bureau de vote",
    "Parti politique",
  ];
  const tableData = resultats.map((resultat) => [
    resultat.candidat.nom_candidat,
    resultat.nombre_voix,
    resultat.bureauVote.nom_bureau,
    resultat.candidat.parti_politique,
  ]);

  // Styles for the first table
  const tableOptions = {
    startY: 68,
    tableColumnWidth: pdf.internal.pageSize.width / tableHeaders.length,
    head: [tableHeaders],
    body: tableData,
    theme: "grid",
    styles: { cellPadding: 5, fontSize: 12 },
    headStyles: { fillColor: [51, 68, 170], textColor: [255, 255, 255] },
    bodyStyles: { textColor: [51, 68, 170] },
    alternateRowStyles: { fillColor: [225, 231, 242] },
  };

  // Generate the first table
  autoTable(pdf, tableOptions);

  // Fetch and format data for the second table
  const classementData = await fetchClassementData();
  classementData.sort((a, b) => b[2] - a[2]); // Sort candidates by total votes in descending order

  const titleClassement = "Classement National";
  const tableHeadersClassement = ["Nom du candidat", "Total de voix", "Rang"];
  const tableDataClassement = classementData.map((data, index) => [
    data[1],
    data[2],
    index + 1,
  ]);

  const startYClassement = 510;

  const tableOptionsClassement = {
    startY: startYClassement,
    tableColumnWidth:
      pdf.internal.pageSize.width / tableHeadersClassement.length,
    head: [tableHeadersClassement],
    body: tableDataClassement,
    theme: "grid",
    styles: { cellPadding: 5, fontSize: 10 },
    headStyles: { fillColor: [51, 68, 170], textColor: [255, 255, 255] },
    bodyStyles: { textColor: [51, 68, 170] },
    alternateRowStyles: { fillColor: [225, 231, 242] },
  };

  // Generate the second table
  autoTable(pdf, tableOptionsClassement);

  pdf.setFontSize(16);
  pdf.text(
    titleClassement,
    pdf.internal.pageSize.width / 2,
    startYClassement - 500,
    { align: "center" }
  );

  // Signatures
  pdf.setFontSize(12);
  pdf.text(signatures, 15, pdf.internal.pageSize.height - 30);

  // Save the PDF with both tables
  pdf.save(`Bordereau_Des_Resultats_Electoraux_Au_Cameroun_${annee}.pdf`);
};

// Function to fetch data for the second table
const fetchClassementData = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/resultats/totalVoixByCandidatWithNames"
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div>
        {" "}
        <p className={`${lusitana.className} text-2xl`}>
          ELECAM-RESULTS.COM
        </p>{" "}
      </div>
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className={`${lusitana.className} source-code-btn flex items-center gap-2`}
            onClick={generatePDF}
          >
            {downloadIcon} Télécharger PDF
          </Button>
          <Button
            className={`${lusitana.className} source-code-btn flex items-center gap-2`}
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
