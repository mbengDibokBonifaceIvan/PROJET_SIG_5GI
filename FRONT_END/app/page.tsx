"use client";
import Image from "next/image";
import AirPollution from "./Components/AirPollution/AirPollution";
import Population from "./Components/Population/Population";
import Sunset from "./Components/Sunset/Sunset";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "./context/globalContext";
import Histogramme from "./Components/Histogramme/Histogramme";
import React, { useEffect, useState } from "react";
import { calender } from "./utils/Icons";
import CardElecteur from "./Components/CardElecteur/CardElecteur";
import Mapss from "./Components/Map/Mapss";
import axios from "axios";
import { lusitana } from "./Components/lib/fonts";
import ResultatChart from "./Components/revenue-chart";
import Navbar from "./Components/Navbar";
import VotingStationsList from "./Components/VotingStationsList";
import { User, Award, ChevronRight, TrendingUp, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
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

interface Candidat {
  id_candidat: number;
  nom_candidat: string;
  parti_politique: string;
  photo: string | null;
}

interface Resultat {
  id_resultat: number;
  bureauVote: BureauDeVote;
  candidat: Candidat;
  nombre_voix: number;
  date_saisie: Date;
  annee_election: number;
}

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [coordonnees, setCoordonnees] = useState({
    latitude: 3.864217556071893,
    longitude: 11.551995201269344,
  });
  const [BureauDeVote, setBureauDeVote] = useState<BureauDeVote[]>([]);
  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const [resultats, setResultats] = useState<Resultat[]>([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/resultats/totalVoixByCandidatWithNames"
        );
        setResultats(
          response.data.map((data: any) => ({
            id_resultat: data[0],
            candidat: { nom_candidat: data[1] },
            nombre_voix: data[2],
          }))
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bureauRes, candidatsRes] = await Promise.all([
          axios.get("http://localhost:8080/bureaux-de-vote/all"),
          axios.get("http://localhost:8080/candidats/all"),
        ]);
        setBureauDeVote(bureauRes.data);
        setCandidats(candidatsRes.data);
      } catch (error: any) {
        console.error(
          "Erreur lors de la récupération des données:",
          error.message
        );
      }
    };

    fetchData();
  }, []);

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
    setCoordonnees({ latitude: lat, longitude: lon });
    window.scrollTo({
      // top: 0, pour aller d'abord en haut avant de se diriger vers le bureau de vote selectionne
      behavior: "smooth", // behavior: "smooth" pour faire un scroll progressif
    });
  };

  const { bureauDeVote } = useGlobalContext();
  const description1 =
    "Histogramme montrant la répartition des votes dans le " +
    (bureauDeVote ? bureauDeVote.nom_bureau : "N/A");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section avec Stats */}
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Stats Cards Row */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <Population />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <CardElecteur />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <Sunset />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Air Pollution Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
                <h2
                  className={`${lusitana.className} text-xl font-bold text-gray-800 dark:text-white`}
                >
                  Tendances Électorales
                </h2>
              </div>
              <AirPollution />
            </div>

            {/* Candidates Section */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-purple-500 dark:text-purple-400 mr-3" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Candidats
                  </h2>
                </div>
                <button className="text-sm text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 flex items-center">
                  Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {candidats.map((candidat) => (
                  <div
                    key={candidat.id_candidat}
                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 
          rounded-2xl p-6 transition-all duration-300 hover:shadow-xl
          border border-gray-100 dark:border-gray-700"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-green-500/10 dark:bg-green-400/10 rounded-full p-1">
                        <Award className="w-4 h-4 text-green-500 dark:text-green-400" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-24 h-24">
                        {candidat.photo ? (
                          <div className="relative h-full">
                            <img
                              src={`http://localhost:8080/candidats/photo/${candidat.id_candidat}`}
                              alt={candidat.nom_candidat}
                              className="w-full h-full rounded-2xl object-cover shadow-lg
                    group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
                          </div>
                        ) : (
                          <div
                            className="h-full rounded-2xl bg-gray-100 dark:bg-gray-700 
                flex items-center justify-center shadow-lg"
                          >
                            <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {candidat.nom_candidat}
                        </h3>

                        <div
                          className="inline-block px-3 py-1 bg-purple-50 dark:bg-purple-900/30 
              rounded-full text-sm text-purple-600 dark:text-purple-400"
                        >
                          {candidat.parti_politique}
                        </div>

                        {resultats.map(
                          (resultat) =>
                            candidat.nom_candidat ===
                              resultat.candidat.nom_candidat && (
                              <div
                                className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 
                  rounded-full text-sm text-blue-600 dark:text-blue-400"
                              >
                                <span className="font-medium">
                                  {resultat.nombre_voix?.toLocaleString()}
                                </span>
                                <span className="ml-1 text-xs opacity-75">
                                  voix
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-emerald-500 dark:text-emerald-400 mr-3" />
                <h2
                  className={`${lusitana.className} text-xl font-bold text-gray-800 dark:text-white`}
                >
                  CARTE MONDIALE
                </h2>
              </div>
            </div>
            <Mapss />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
            <VotingStationsList
              BureauDeVote={BureauDeVote}
              getClickedCityCords={getClickedCityCords}
              calender={calender}
              lusitana={lusitana}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-6 grid lg:grid-cols-2 gap-6 pb-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
              <h2
                className={`${lusitana.className} text-xl font-bold text-gray-800 dark:text-white`}
              >
                {description1}
              </h2>
            </div>
            <Histogramme />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <ResultatChart />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              CopyRight
              <Image
                src={"/logo-white.svg"}
                alt="logo"
                width={20}
                height={20}
              />
              <a
                href="#"
                target="_blank"
                className="text-purple-500 dark:text-purple-400 font-bold hover:underline"
              >
                WebGenius 2025
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
