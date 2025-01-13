"use client";
import Image from "next/image";
import AirPollution from "./Components/AirPollution/AirPollution";
import Population from "./Components/Population/Population";
import Sunset from "./Components/Sunset/Sunset";
//import defaultStates from "./utils/defaultStates";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "./context/globalContext";
import Histogramme from "./Components/Histogramme/Histogramme";
import React, { useEffect, useRef, useState } from "react";
import { calender } from "./utils/Icons";
import CardElecteur from "./Components/CardElecteur/CardElecteur";
import Mapss from "./Components/Map/Mapss";
import axios from "axios";
import { lusitana } from "./Components/lib/fonts";
import ResultatChart from "./Components/revenue-chart";
import Navbar from "./Components/Navbar";
import VotingStationsList from "./Components/VotingStationsList";
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
        const res = await axios.get(
          "http://localhost:8080/bureaux-de-vote/all"
        );
        setBureauDeVote(res.data);
        console.log("BureauDeVotes: " + res.data);
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
    (bureauDeVote ? bureauDeVote.nom_bureau : "N/A");
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

          { /** Composant de droit qui gere les bureaux de vote */}
          <VotingStationsList
            BureauDeVote={BureauDeVote}
            getClickedCityCords={getClickedCityCords}
            calender={calender}
            lusitana={lusitana}
          />

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
