"use client";
import Image from "next/image";
import AirPollution from "./Components/AirPollution/AirPollution";
import Mapbox from "./Components/Mapbox/Mapbox";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population/Population";
import Sunset from "./Components/Sunset/Sunset";
import Temperature from "./Components/Temperature/Temperature";
import Wind from "./Components/Wind/Wind";
import defaultStates from "./utils/defaultStates";
import { useGlobalContextUpdate } from "./context/globalContext";
import Histogramme from "./Components/Histogramme/Histogramme";
import Resultat from "./Components/Results/Resultat";
import html2canvas from "html2canvas";
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import { calender, downloadIcon, github } from "./utils/Icons";
import CardElecteur from "./Components/CardElecteur/CardElecteur";
import RevenueChart from "./Components/revenue-chart";
import Mapss from "./Components/Map/Mapss";


export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const histogramRef = useRef<HTMLDivElement | null>(null);
  const mapBoxRef = useRef<HTMLDivElement | null>(null);

  function generatePDF() {
    if (!histogramRef.current) {
      return;
    }

    const pdf = new jsPDF();

    // Définir le contenu pour le PDF
    const title = "Résultats des Élections Présidentielles";
    const session = "SESSION 2024 Au Cameroun";
    const description1 =
      "Histogramme montrant la répartition des votes par Arrondissement.";

    // Ajouter le titre et les informations supplémentaires au PDF
    pdf.setFontSize(26);
    pdf.text(title, 15, 20);
    pdf.setFontSize(17);
    pdf.text(session, 15, 50);
    pdf.text(description1, 15, 80);

    // Capturer le contenu du composant Histogramme en tant qu'image
    html2canvas(histogramRef.current).then((histogramCanvas) => {
      const histogramImg = histogramCanvas.toDataURL("image/png");

      const imgHeight = (180 * 100) / 180; // Hauteur ajustée pour maintenir le ratio

      // Ajouter les images au PDF
      pdf.addImage(histogramImg, "PNG", 15, 100, 180, imgHeight); // Ajouter l'image de l'histogramme

      pdf.save("resultats_elections_cameroun.pdf"); // Télécharger le PDF avec le nom "resultats_elections_cameroun.pdf" contenant les images et les informations supplémentaires
    });
  }

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[8rem] m-auto">
      <Navbar />
      <div className="flex flex-col w-full p-4">
            <div className="h-full w-full">
              <AirPollution />
            </div>
        </div>
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
      
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="h-full">
              <Population />
            </div>
            <div className="h-full " >
              <CardElecteur />
            </div>
            <div className="h-full">
              <Sunset />
            </div>

          </div>
          <div className="mapbox-con mt-4 flex gap-4 flex-1">
            <div className="w-2/3 h-full" ref={mapBoxRef}>
              <Mapss />
            </div>
            <div className="states flex flex-col gap-3 flex-1 h-full">
              <h2 className="flex items-center gap-2 font-medium  text-blue-500">
                { calender} Résultats Des Élections Dans Quelques Villes
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => (
                  <div
                    key={index}
                    className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                    onClick={() => {
                      getClickedCityCords(state.lat, state.lon);
                    }}
                  >
                    <p className="px-6 py-4 text-blue-950 dark:text-blue-100">
                      {state.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-full p-4 lg:col-span-2" ref={histogramRef}>
                <Histogramme />
            </div>
            <div className="h-full p-4 lg:col-span-2" ref={histogramRef}>
                <RevenueChart />
            </div>
        </div>
      </div>

      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          CopyRight
          <Image src={"/logo-white.svg"} alt="logo" width={20} height={20} />
          <a href="#" target="_blank" className=" text-green-300 font-bold">
            WebGenius 2025
          </a>
        </p>
      </footer>
    </main>
  );
}
