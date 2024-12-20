"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { voteIcon, voteYesIcon } from "@/app/utils/Icons";
import { formatNumber, unixToTime } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { userCheckIcon } from '../../utils/Icons';
import axios from "axios";
import { lusitana } from "../lib/fonts";

function CardElecteur() {
  //const { forecast } = useGlobalContext();
  //const { fiveDayForecast } = useGlobalContext();
  const [totalCandidat, setTotalCandidat] = useState(0);

  useEffect(() => {
    const fetchtotalCandidat = async () => {
      try {
        const response = await axios.get('http://localhost:8080/candidats/count');
        if (!response) {
          return <Skeleton className="h-[12rem] w-full" />;
        }
        setTotalCandidat(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des candidats:', error);
      }
    }; fetchtotalCandidat();
  }, []);

  {
    /**
  const { city } = fiveDayForecast;
  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(forecast?.sys?.sunrise, timezone);

     */
  }
  
  return (
    <div className={`${lusitana.className} pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none`}>
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium text-blue-500 ">
          {userCheckIcon} Total De Candidats Éligibles
        </h2>
        <p className="pt-4 text-2xl">
          <span className="text-4xl font-bold text-blue-200">
            {formatNumber(totalCandidat)}
          </span>
        </p>{" "}
      </div>

      <p className="text-sm">
        {voteYesIcon} Nombre Total De Candidat:{" "}
        {formatNumber(totalCandidat )}
      </p>
    </div>
  );
}

export default CardElecteur;
