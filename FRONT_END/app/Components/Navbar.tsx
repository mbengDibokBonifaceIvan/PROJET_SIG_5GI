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
  const resumeInfo = "RESUME DES INFORMTIONS ELECTORALES";
  const signatures = "Signature : ______By WEBGENIUS_5GI\n";

  // Text styles
  pdf.setFont("times");
  pdf.setFontSize(18);

  // Insertion de l'image Armoiries_CMR.png
  const imgData1 = "/Armoiries_CMR.png";
  pdf.addImage(imgData1, "PNG", 10, 10, 50, 50);

  // Insertion de l'image LOGO-POLYTECHNIQUE-01-scaled.jpg
  const imgData2 = "/LOGO-POLYTECHNIQUE-01-scaled.jpg";
  pdf.addImage(imgData2, "JPG", pdf.internal.pageSize.width - 60, 10, 50, 50);

  // Title
  pdf.text(title, 105, 20, { align: "center" });

  // Motto
  pdf.setFontSize(15);
  pdf.text(motto, 105, 30, { align: "center" });

  // Résumé des informations électorales
  pdf.setFontSize(16);
  pdf.text(resumeInfo, 105, 70, { align: "center" });

  // Table header
  const tableHeaders = [
    "Nom du candidat",
    "Nombre de voix",
    "Bureau de vote",
    "Parti politique",
  ];

  // Table data
  const tableData = resultats.map((resultat) => [
    resultat.candidat.nom_candidat,
    resultat.nombre_voix,
    resultat.bureauVote.nom_bureau,
    resultat.candidat.parti_politique,
  ]);

  // Set position for the first table
  const startY = 80;
  const margin = 10;
  const tableColumnWidth =
    (pdf.internal.pageSize.width - margin * 2) / tableHeaders.length;

  // Styles for the first table
  const tableOptions = {
    startY,
    tableColumnWidth,
    head: [tableHeaders],
    body: tableData,
    theme: "striped",
    styles: { cellPadding: 5, fontSize: 12 },
    headStyles: { fillColor: [51, 68, 170], textColor: [255, 255, 255] },
    bodyStyles: { textColor: [51, 68, 170] },
    alternateRowStyles: { fillColor: [225, 231, 242] },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 30 },
      2: { cellWidth: 50 },
      3: { cellWidth: 60 },
    },
  };

  // Generate the first table
  autoTable(pdf, tableOptions);

  // Signatures
  pdf.setFontSize(12);
  pdf.text(signatures, 15, pdf.internal.pageSize.height - 30);

  // Fonction pour récupérer les données du classement depuis l'endpoint
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

  // Générer le deuxième tableau
  const classementData = await fetchClassementData();
  classementData.sort((a, b) => b[2] - a[2]); // Tri des candidats par total de voix décroissant

  const titleClassement = "Classement National";
  const tableHeadersClassement = ["Nom du candidat", "Total de voix", "Rang"];

  // Mise en forme des données du classement pour correspondre à la structure attendue
  const tableDataClassement = classementData.map((data, index) => [
    data[1], // Nom du candidat
    data[2], // Total de voix
    index + 1, // Rang (à partir de 1)
  ]);

  const startYClassement = 160; // Ajustez la position de départ en fonction de vos besoins

  const tableOptionsClassement = {
    startY: startYClassement,
    tableColumnWidth: 60,
    head: [tableHeadersClassement],
    body: tableDataClassement,
    theme: "striped",
    styles: { cellPadding: 5, fontSize: 10 },
    headStyles: { fillColor: [51, 68, 170], textColor: [255, 255, 255] },
    bodyStyles: { textColor: [51, 68, 170] },
    alternateRowStyles: { fillColor: [225, 231, 242] },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
    },
  };

  autoTable(pdf, tableOptionsClassement);

  pdf.setFontSize(14);
  pdf.text(titleClassement, 105, startYClassement - 20, { align: "center" });

  // Save the PDF with both tables
  pdf.save("bordereau_resultats_electorals_cameroun.pdf");
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
