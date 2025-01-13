"use client";
import Image from "next/image";
import AirPollution from "./Components/AirPollution/AirPollution";
import Population from "./Components/Population/Population";
import Sunset from "./Components/Sunset/Sunset";
//import defaultStates from "./utils/defaultStates";
import { useGlobalContext, useGlobalContextUpdate } from "./context/globalContext";
import Histogramme from "./Components/Histogramme/Histogramme";
import React, { useEffect, useRef, useState } from "react";
import { calender } from "./utils/Icons";
import CardElecteur from "./Components/CardElecteur/CardElecteur";
import Mapss from "./Components/Map/Mapss";
import axios from "axios";
import { lusitana } from "./Components/lib/fonts";
import ResultatChart from "./Components/revenue-chart";
import Navbar from "./Components/Navbar";

interface BureauDeVote {
  nom_bureau: string;
  centreVote: {
    nom_centre: string;
  };
  coordonnees: {
    latitude: number;
    longitude: number;
  };
}
export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [coordonnees, setCoordonnees] = useState({
    latitude: 3.864217556071893,
    longitude: 11.551995201269344,
  });
 const [BureauDeVote, setBureauDeVote] = useState<BureauDeVote[]>([]);

 useEffect(() => {
   const fetchBureauDeVotes = async () => {
     try {
       const res = await axios.get("http://localhost:8080/bureaux-de-vote/all");
       setBureauDeVote(res.data);
       console.log("BureauDeVotes: " + res.data)
     } catch (error: any) {
       console.error(
         "Erreur sur la récupération des résultats:",
         error.message
       );
      
     }
   };

   fetchBureauDeVotes();
 }, []);

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
    setCoordonnees({ latitude: lat, longitude: lon });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const { bureauDeVote } = useGlobalContext();
  

  const description1 =
    "Histogramme montrant la répartition des votes dans le " +
    (bureauDeVote ? bureauDeVote.nom_bureau : "N/A") ; 
  const itemsPerPage = 9;
  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    setShowAll(!showAll);
  };
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
            <div className="border rounded-lg w-2/3 h-full">
              {/**
              *  <h1>
                Résultats des bureaux de vote aux coordonnées :{" "}
                {coordonnees.latitude}, {coordonnees.longitude}
              </h1>
              */}

              <Mapss />
            </div>
            <div className={`${lusitana.className} border rounded-lg states flex flex-col gap-3 flex-1 h-full`}>
              <h2
                className="mb-4 text-xl md:text-2xl flex items-center gap-2 font-medium text-nowrap text-blue-500"
              >
                {calender} Résultats Des Élections Dans Quelques Bureaux De Vote
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {BureauDeVote.slice(
                  0,
                  showAll ? BureauDeVote.length : itemsPerPage
                ).map((state, index) => (
                  <div
                    key={index}
                    className="border rounded-lg cursor-pointer shadow-sm dark:shadow-none bg-white dark:bg-dark-grey"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-blue-950 dark:text-blue-300">
                        {state.nom_bureau}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-white mt-2">
                        Centre de vote: {state.centreVote.nom_centre}
                      </p>
                      <div className="mt-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => {
                            getClickedCityCords(
                              state.coordonnees.latitude,
                              state.coordonnees.longitude
                            );
                          }}
                        >
                          Voir sur la carte
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {BureauDeVote.length > itemsPerPage && (
                  <div
                    className="border rounded-lg cursor-pointer shadow-sm dark:shadow-none bg-white dark:bg-gray-800"
                    onClick={handleClick}
                  >
                    <div className="p-4 text-center text-blue-500 cursor-pointer">
                      {showAll ? "Voir moins" : "Voir plus"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-full p-4 lg:col-span-2">
            <br />
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
              {description1}
            </h1>
            <Histogramme />
          </div>
          <div className="h-full p-4 lg:col-span-2">
            <ResultatChart />
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
