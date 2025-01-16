"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Card = () => {
  const [stats, setStats] = useState({
    regions: 0,
    departements: 0,
    arrondissements: 0,
    scrutateurs: 0,
    administrateurs: 0,
    electeurs: 0,
    centresVote: 0,
    bureauxVote: 0,
    candidats: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = {
          regions: "regions/countAll",
          departements: "departements/count",
          arrondissements: "arrondissements/count",
          scrutateurs: "utilisateurs/nombreScrutateurs",
          administrateurs: "utilisateurs/nombreSuperAdministrateur",
          electeurs: "electeurs/count",
          centresVote: "centres-de-vote/count",
          bureauxVote: "bureaux-de-vote/count",
          candidats: "candidats/count",
        };

        const baseURL = "http://localhost:8080";

        const requests = Object.entries(endpoints).map(([key, endpoint]) =>
          axios
            .get(`${baseURL}/${endpoint}`)
            .then((response) => ({ [key]: response.data }))
            .catch((error) => {
              console.error(`Error fetching ${key}:`, error);
              return { [key]: 0 };
            })
        );

        const results = await Promise.all(requests);
        const newStats = Object.assign({}, ...results);
        setStats(newStats);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { name: "Total Region", value: stats.regions, url: "/Regions" },
    { name: "Total Candidat", value: stats.candidats, url: "/Candidats" },
    {
      name: "Total Arrondissement",
      value: stats.arrondissements,
      url: "/Arrondissements",
    },
    {
      name: "Total Departement",
      value: stats.departements,
      url: "/Departements",
    },
    {
      name: "Total Bureau De Vote",
      value: stats.bureauxVote,
      url: "/BureauxDeVote",
    },
    {
      name: "Total Centre De Vote",
      value: stats.centresVote,
      url: "/CentreDeVote",
    },
    { name: "Total Electeur", value: stats.electeurs, url: "/Electeurs" },
    {
      name: "Total Scrutateur",
      value: stats.scrutateurs,
      url: "/ScrutateurTable",
    },
    {
      name: "Total Administrateur",
      value: stats.administrateurs,
      url: "/SuperAdminTable",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <ProductCard
          key={index}
          name={card.name}
          value={card.value}
          url={card.url}
        />
      ))}
    </div>
  );
};

export default Card;
