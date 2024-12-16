"use Client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import defaultStates from "../utils/defaultStates";

import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([
    //6.749132771345389, 13.12901698663508,
    3.864217556071893, 11.551995201269344,
  ]);

  //Bureau de vote
  const [bureauDeVote, setBureauDeVote] = useState({});
  const fetchBureauDeVote = async (lat, lon) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/bureaux-de-vote/by-coordinates?latitude=${lat}&longitude=${lon}`
      );
      setBureauDeVote(res.data);
      //  console.log(res.data);
      fetchVotesResults(res.data.id_bureau_vote);
      //   console.log(res.data.id_bureau_vote);
    } catch (error) {
      console.log(
        "Erreur sur la recuperation du bureau de vote: ",
        error.message
      );
    }
  };
  //Candidat
  const [candidatData, setCandidatData] = useState({});
  const fetchCandidatData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/candidats/all");
      setCandidatData(res.data);
    } catch (error) {
      console.log("Erreur sur la recuperation des candidats: ", error.message);
    }
  };

  //Resultats des votes

  const [votesResults, setVotesResults] = useState({});
  const fetchVotesResults = async (idBureauVote) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/resultats/bureau/${idBureauVote}`
      );
      setVotesResults(res.data);
      console.log("Resultats des votes: ", res.data);
    } catch (error) {
      console.log("Erreur sur la recuperation des resulttats: ", error.message);
    }
  };

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, seUvIndex] = useState({});

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Air Quality
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  // five day forecast
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  //geocoded list
  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  //fetch uv data
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

      seUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching the forecast:", error);
    }
  };

  // handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    fetchBureauDeVote(activeCityCoords[0], activeCityCoords[1]);
    fetchCandidatData();
    fetchVotesResults;
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        bureauDeVote,
        candidatData,
        votesResults,
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
        // setCoordonnees,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
          //setCoordonnees,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
