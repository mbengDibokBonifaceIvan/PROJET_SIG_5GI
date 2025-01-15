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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



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

  const generateCSV = async () => {
    try {
      // Récupérer les données de classement
      const classementData = await fetchClassementData();

      // Préparer les en-têtes
      const headers = [
        ["RÉPUBLIQUE DU CAMEROUN"],
        ["PAIX - TRAVAIL - PATRIE"],
        [`RÉSULTATS DES ÉLECTIONS PRÉSIDENTIELLES ${annee}`],
        [],
        ["Nom du candidat", "Total des voix", "Pourcentage"],
      ];

      // Calculer le total des voix
      const totalVotes = classementData.reduce((sum, data) => sum + data[2], 0);

      // Préparer les données de classement
      const rows = classementData.map((data) => [
        data[1],
        data[2],
        ((data[2] / totalVotes) * 100).toFixed(2) + "%",
      ]);

      // Combiner les en-têtes et les données
      const csvContent = [...headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

      // Créer et télécharger le fichier CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute(
        "download",
        `Resultats_Electoraux_Cameroun_${annee}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors de la génération du CSV:", error);
    }
  };

  const generatePDF = async () => {
    // Création du document PDF
    const pdf = new jsPDF();

    // Définition des couleurs personnalisées
    const colors = {
      primary: [0, 102, 204], // Bleu royal
      secondary: [220, 53, 69], // Rouge officiel
      accent: [25, 135, 84], // Vert institutionnel
      text: [33, 37, 41], // Texte foncé
      lightBg: [248, 249, 250], // Fond clair
    };

    // Configuration de la page
    pdf.setFillColor(...colors.lightBg);
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
      "F"
    );

    // En-tête
    const headerY = 15;
    const headerCenter = pdf.internal.pageSize.width / 2;

    // Images
    pdf.addImage("/Armoiries_CMR.png", "PNG", 15, headerY, 25, 25);
    pdf.addImage(
      "/LOGO-POLYTECHNIQUE-01-scaled.jpg",
      "JPG",
      pdf.internal.pageSize.width - 40,
      headerY,
      25,
      25
    );

    // Titre principal et sous-titres
    pdf.setTextColor(...colors.primary);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("RÉPUBLIQUE DU CAMEROUN", headerCenter, headerY + 10, {
      align: "center",
    });

    pdf.setTextColor(...colors.secondary);
    pdf.setFontSize(16);
    pdf.text("PAIX - TRAVAIL - PATRIE", headerCenter, headerY + 20, {
      align: "center",
    });

    // Ligne de séparation décorative
    pdf.setDrawColor(...colors.primary);
    pdf.setLineWidth(0.5);
    pdf.line(40, headerY + 30, pdf.internal.pageSize.width - 40, headerY + 30);

    // Titre du document
    pdf.setFontSize(18);
    pdf.setTextColor(...colors.text);
    pdf.text(
      "RÉSULTATS DES ÉLECTIONS PRÉSIDENTIELLES",
      headerCenter,
      headerY + 45,
      { align: "center" }
    );
    pdf.setFontSize(16);
    pdf.text(`Année ${annee}`, headerCenter, headerY + 55, { align: "center" });

    // Première table - Résultats détaillés
    const tableHeaders = [
      [
        "Nom du candidat",
        "Nombre de voix",
        "Bureau de vote",
        "Parti politique",
      ],
    ];
    const tableData = resultats.map((resultat) => [
      resultat.candidat.nom_candidat,
      resultat.nombre_voix,
      resultat.bureauVote.nom_bureau,
      resultat.candidat.parti_politique,
    ]);

    autoTable(pdf, {
      startY: headerY + 65,
      head: tableHeaders,
      body: tableData,
      theme: "grid",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: colors.primary,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 40, halign: "center" },
        2: { cellWidth: 50 },
        3: { cellWidth: 50 },
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
    });

    // Deuxième table - Classement National
    const classementData = await fetchClassementData();
    classementData.sort((a, b) => b[2] - a[2]);

    pdf.addPage();

    // Titre du classement
    pdf.setFontSize(18);
    pdf.setTextColor(...colors.primary);
    pdf.text("CLASSEMENT NATIONAL", headerCenter, 30, { align: "center" });

    const tableHeadersClassement = [
      ["Rang", "Nom du candidat", "Total des voix", "Pourcentage"],
    ];
    const totalVotes = classementData.reduce((sum, data) => sum + data[2], 0);
    const tableDataClassement = classementData.map((data, index) => [
      (index + 1).toString(),
      data[1],
      data[2].toLocaleString(),
      `${((data[2] / totalVotes) * 100).toFixed(2)}%`,
    ]);

    autoTable(pdf, {
      startY: 40,
      head: tableHeadersClassement,
      body: tableDataClassement,
      theme: "grid",
      styles: {
        font: "helvetica",
        fontSize: 11,
        cellPadding: 8,
      },
      headStyles: {
        fillColor: colors.secondary,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 25, halign: "center" },
        1: { cellWidth: 60 },
        2: { cellWidth: 40, halign: "right" },
        3: { cellWidth: 40, halign: "center" },
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
    });

    // Pied de page
    const footerY = pdf.internal.pageSize.height - 30;

    // Ligne de séparation
    pdf.setDrawColor(...colors.primary);
    pdf.setLineWidth(0.5);
    pdf.line(40, footerY - 10, pdf.internal.pageSize.width - 40, footerY - 10);

    // Informations de signature
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.text);
    pdf.text("Document généré par WEBGENIUS_5GI", 40, footerY);
    pdf.text(
      `Date d'édition : ${new Date().toLocaleDateString()}`,
      pdf.internal.pageSize.width - 40,
      footerY,
      { align: "right" }
    );

    // Sauvegarde du PDF
    pdf.save(`Resultats_Electoraux_Cameroun_${annee}.pdf`);
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
        <p className={`${lusitana.className} text-2xl`}>ELECAM-RESULTS.COM</p>
      </div>
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={`${lusitana.className} flex items-center gap-2`}
              >
                {downloadIcon} Télécharger
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={generatePDF}>
                Format PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={generateCSV}>
                Format CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
