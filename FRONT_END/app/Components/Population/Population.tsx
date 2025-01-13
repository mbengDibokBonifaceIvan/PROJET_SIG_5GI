"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { people, voteYesIcon } from "@/app/utils/Icons";
import { formatNumber } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { lusitana } from "../lib/fonts";

function Population() {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;
  const [totalElecteurs, setTotalElecteurs] = useState(0);
  const [totalVote, setTotalVote] = useState(0);

  useEffect(() => {
    const fetchtotalVote = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/resultats/totalVotes"
        );
        setTotalVote(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des votants:", error);
      }
    };
    fetchtotalVote();
  }, []);

  useEffect(() => {
    const fetchtotalElecteurs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/electeurs/count');
        setTotalElecteurs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Electeurs:', error);
      }
    }; fetchtotalElecteurs();
  },
    []);
useEffect(() => {
  const fetchtotalVote = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/resultats/totalVotes"
      );
      setTotalVote(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des votants:", error);
    }
  };
  fetchtotalVote();
}, []);

  if (!fiveDayForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className={`${lusitana.className} pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-4 dark:bg-dark-grey shadow-sm dark:shadow-none`}>
      <div className="top">
        <h2 className="flex items-center gap-2 text-blue-500 font-medium ">
          {people} Nombre total d'électeurs.
        </h2>
        <p className="pt-4 text-2xl dark:text-gray-200 ">
          <span className="text-4xl font-bold text-blue-200">
            {formatNumber(totalElecteurs)}
          </span>
        </p>
      </div>
      <div className="text-sm">
        {voteYesIcon} Nombre Total De Votants: {formatNumber(totalVote)}
      </div>
    </div>
  );
}

export default Population;
