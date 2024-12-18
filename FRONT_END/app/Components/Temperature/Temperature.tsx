"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";
import Image from "next/image";

function Temperature() {
  const { forecast } = useGlobalContext();

  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    // upadte time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // custom format: 24 hour format
      const formatedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [timezone]);

return (
  <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
    <p className="flex justify-between items-center">
      <span className="font-medium">{currentDay}</span>
      <span className="font-medium">{localTime}</span>
    </p>
    <p className="pt-2 font-bold flex gap-1">
      <span>{name}</span>
      <span>{navigation}</span>
    </p>
    <div className=" flex flex-col items-center mb-1">
      <div className="mt-8">
        <Image
          src="/Armoiries_CMR.png"
          width={200}
          height={100}
          className="hidden md:block rounded-lg"
          alt="Armoiries du Cameroun"
        />

        <Image
          src="/Armoiries_CMR.png"
          width={75}
          height={10}
          className="block md:hidden"
          alt="Armoiries du Cameroun"
        />
      </div>
      <div className="text-center mt-3">
        <p className="capitalize text-lg font-medium dark:text-gray-200">
          Paix-Travail-Patrie
        </p>
      </div>
    </div>
  </div>
);


}

export default Temperature;

 {
   /** return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      {/**<p className="py-10 text-9xl font-bold self-center">{temp}°</p>
       
      <span className="py-10 text-9xl font-bold self-center">
        <Image
          src="/Armoiries_CMR.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
      </span>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  ); */
 } 