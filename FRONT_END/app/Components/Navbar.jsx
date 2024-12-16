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
 

  const generatePDF = () => {
    const pdf = new jsPDF();

    const title = "REPUBLIQUE DU CAMEROUN";
    const motto = "PAIX-TRAVAIL-PATRIE";
    const resumeInfo = "RESUME DES INFORMTIONS ELECTORALES";
    const signatures = "Signatures : ______WEB_GENIUS_5GI________\n";

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
    pdf.setFontSize(14);
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

    // Set position for the table
    const startY = 80;
    const margin = 10;
    const tableColumnWidth =
      (pdf.internal.pageSize.width - margin * 2) / tableHeaders.length;

    // Styles améliorés pour le tableau
    // Couleurs RVB pour le bleu foncé et ses variantes
    const tableOptions = {
      startY,
      tableColumnWidth,
      head: [tableHeaders],
      body: tableData,
      theme: "striped",
      styles: { cellPadding: 5, fontSize: 12 },
      headStyles: { fillColor: [51, 68, 170], textColor: [255, 255, 255] }, // Bleu foncé pour la couleur de fond de l'en-tête
      bodyStyles: { textColor: [51, 68, 170] }, // Bleu foncé pour la couleur du texte du corps du tableau
      alternateRowStyles: { fillColor: [225, 231, 242] }, // Bleu clair pour la couleur de fond des lignes alternatives
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 30 },
        2: { cellWidth: 50 },
        3: { cellWidth: 60 },
      },
    };
    // Generate the table
    autoTable(pdf, tableOptions);

    // Signatures
    pdf.setFontSize(12);
    pdf.text(signatures, 15, pdf.internal.pageSize.height - 30);

    // Save the PDF
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
