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
  CartesianGrid,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import CandidatsGrid from "./Components/CandidatsGrid ";


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

  // Données pour le diagramme à barres
  const barChartData = resultats.map((resultat) => ({
    name: resultat.candidat.nom_candidat,
    votes: resultat.nombre_voix,
  }));

  // Données pour le diagramme circulaire
  const pieChartData = resultats.map((resultat) => ({
    name: resultat.candidat.nom_candidat,
    value: resultat.nombre_voix,
  }));

  const COLORS = [
    "#8b5cf6",
    "#6366f1",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#84cc16",
    "#06b6d4",
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
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
            {/* Title Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
                <h2
                  className={`${lusitana.className} text-xl font-bold text-gray-800 dark:text-white`}
                >
                  TENDANCES ÉLECTORALES
                </h2>
              </div>
              <AirPollution />
            </div>

            {/* Candidates Grid */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20">
              <CandidatsGrid candidats={candidats} resultats={resultats} />
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
        <div className="grid lg:grid-cols-12 gap-6 mb-8 mt-10">
          {/* Bar Chart */}
          <div className="lg:col-span-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 h-full">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-violet-500 dark:text-violet-400 mr-4" />
                <h2
                  className={`${lusitana.className} text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400`}
                >
                  DISTRIBUTION DES VOTES
                </h2>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name">
                      <Label
                        value="Candidats"
                        offset={0}
                        position="insideBottom"
                      />
                    </XAxis>
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "0.75rem",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="votes" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                      {barChartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                      <LabelList dataKey="name" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="lg:col-span-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 h-full">
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-pink-500 dark:text-pink-400 mr-4" />
                <h2
                  className={`${lusitana.className} text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400`}
                >
                  RÉPARTITION DES VOTES
                </h2>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charts */}
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
