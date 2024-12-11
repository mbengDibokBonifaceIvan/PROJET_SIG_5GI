"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { flagIcon, thermo } from "@/app/utils/Icons";
import { airQulaityIndexText } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Image from "next/image";

function AirPollution() {
  // const { airQuality } = useGlobalContext();

  // // check if airQuality is available, check if necessary properties are available
  // if (
  //   !airQuality ||
  //   !airQuality.list ||
  //   !airQuality.list[0] ||
  //   !airQuality.list[0].main
  // ) {
  //   return (
  //     <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  //   );
  // }

  // const airQualityIndex = airQuality.list[0].main.aqi * 10;

  // const filteredIndex = airQulaityIndexText.find((item) => {
  //   return item.rating === airQualityIndex;
  // });

  // return (
  //   <div
  //     className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-5
  //      dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
  //   >
  //     <Progress value={airQualityIndex} max={100} className="progress" />
  //     <h1 className="flex items-center gap-2 font-medium justify-center  text-blue-500">
  //       SESSION 2024 {flagIcon}
  //     </h1>
  //     <p className="text-center"> Résultats Des Élections Présidentielle 2024 Au Cameroun</p>
  //   </div>
  // );
  return (
    <div
      className="air-pollution pt-6 px-4 h-[10rem] border rounded-lg flex flex-col gap-5
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className="flex ">
      <Image
        src="/Armoiries_CMR.png"
        width={75}
        height={10}
        className=""
        alt="Armoiries du Cameroun"
      />
      <div className="p-4"></div>
      <div  className="flex-col items-center justify-center mx-auto  ">
      <p
            className={`text-xl md:text-xl md:leading-normal`}
          >
            <strong>Bienvenue sur ELECEM-RESULTS.COM!</strong> Découvrez les résultats en temps réel.
          </p>
        <h1 className="flex items-center gap-2 p-1 font-medium justify-center  text-blue-500">
          SESSION 2024 {flagIcon}
        </h1>
        <p className="text-center"> Résultats Des Élections Présidentielle 2024 Au Cameroun</p>
    </div>
      </div>
      </div>

  );
}

export default AirPollution;
