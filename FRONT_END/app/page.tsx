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
import { useGlobalContext, useGlobalContextUpdate } from "./context/globalContext";
import Histogramme from "./Components/Histogramme/Histogramme";
import Resultat from "./Components/Results/Resultat";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { calender, downloadIcon, github } from "./utils/Icons";
import CardElecteur from "./Components/CardElecteur/CardElecteur";
import RevenueChart from "./Components/revenue-chart";
import Mapss from "./Components/Map/Mapss";
import axios from "axios";

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [coordonnees, setCoordonnees] = useState({
    latitude: 3.864217556071893,
    longitude: 11.551995201269344,
  });


  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
    setCoordonnees({ latitude: lat, longitude: lon });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const histogramRef = useRef<HTMLDivElement | null>(null);
  const mapBoxRef = useRef<HTMLDivElement | null>(null);

  const { bureauDeVote } = useGlobalContext();
  

  const description1 =
    "Histogramme montrant la répartition des votes dans le bureau de vote de " +
    (bureauDeVote ? bureauDeVote.nom_bureau : "N/A") +
    "."; 

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
            <div className="h-full ">
              <CardElecteur />
            </div>
            <div className="h-full">
              <Sunset />
            </div>
          </div>
          <div className="mapbox-con mt-4 flex gap-4 flex-1">
            <div className="w-2/3 h-full" ref={mapBoxRef}>
              <h1>
                Résultats des bureaux de vote aux coordonnées :{" "}
                {coordonnees.latitude}, {coordonnees.longitude}
              </h1>
            
              <Mapss />
            </div>
            <div className="states flex flex-col gap-3 flex-1 h-full">
              <h2 className="flex items-center gap-2 font-medium  text-blue-500">
                {calender} Résultats Des Élections Dans Quelques Villes
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
            <h1>{description1}</h1>
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
