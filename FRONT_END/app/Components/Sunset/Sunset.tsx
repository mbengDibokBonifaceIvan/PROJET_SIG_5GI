"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { voteIcon, voteYesIcon } from "@/app/utils/Icons";
import { formatNumber, unixToTime } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { userCheckIcon } from "../../utils/Icons";
import axios from "axios";
import { lusitana } from "../lib/fonts";

function Sunset() {
  const { forecast, fiveDayForecast, bureauDeVote } = useGlobalContext();
  const [totalVote, setTotalVote] = useState(0);
  const { city } = fiveDayForecast;

  useEffect(() => {
    if (bureauDeVote && forecast && forecast.sys && forecast.sys.sunset) {
      const fetchtotalVote = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/resultats/total-votes/${bureauDeVote.id_bureau_vote}`
          );
          //console.log(response.data);
          setTotalVote(response.data);
          if (response.data <= 0) {
            setTotalVote(0);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des votants:", error);
        }
      };

      fetchtotalVote();
    }
  }, [bureauDeVote, forecast]);

  if (!bureauDeVote || !forecast || !forecast.sys || !forecast.sys.sunset) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className={`${lusitana.className} pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none`}>
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-blue-500 ">
          {userCheckIcon} Total De Personnes ayant Voté
        </h2>
        <p className="pt-4 text-2xl">
          <span className="text-4xl font-bold text-blue-200">
            {formatNumber(totalVote)}
          </span>
        </p>{" "}
      </div>

      <p className="text-sm ">Ville de: {city.name}.</p>
    </div>
  );
}

export default Sunset;
