import React, { useState, useEffect } from "react";

import {

  Chart as ChartJS,

  CategoryScale,

  LinearScale,

  BarElement,

  Title,

  Tooltip,

  Legend,

} from "chart.js";

import { Bar } from "react-chartjs-2";

import axios from "axios";



ChartJS.register(

  CategoryScale,

  LinearScale,

  BarElement,

  Title,

  Tooltip,

  Legend

);



interface Result {

  id: number;

  nom_candidat: string;

  nombre_voix: number;

}



const ResultatChart: React.FC = () => {

  const [hasError, setHasError] = useState(false);

  const [resultats, setResultats] = useState<Result[]>([]);



  useEffect(() => {

    const fetchVotesResults = async () => {

      try {

        const res = await axios.get(

          "http://localhost:8080/resultats/totalVoixByCandidatWithNames"

        );

        const { data: resultats } = res;

        setResultats(resultats);

      } catch (error: any) {

        console.error(

          "Erreur sur la récupération des résultats:",

          error.message

        );

        setHasError(true);

      }

    };



    fetchVotesResults();

  }, []);



  const chartData = {

    labels: resultats.map((candidat) => candidat.nom_candidat),

    datasets: [

      {

        label: "Total des voix",

        data: resultats.map((candidat) => candidat.nombre_voix),

        backgroundColor: "rgba(54, 162, 235, 0.2)",

        borderColor: "rgba(54, 162, 235, 1)",

        borderWidth: 1,

        fill: true,

      },

    ],

  };



  const chartOptions = {
    scales: {
      x: {
        type: "category",
        labels: {
          show: true,
          fontSize: 14, // Optional font size
          fontFamily: "Poppins", // Optional font family
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full md:col-span-4">
            <h2>VOTE PAR CANDIDAT</h2>     {" "}
      {hasError ? (
        <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
                    Une erreur est survenue lors de la récupération des
          résultats.           Veuillez réessayer plus tard.        {" "}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 p-4">
                 {" "}
          {/**
           *   <Bar data={chartData} options={chartOptions} />
           */}
                 
        </div>
      )}
         {" "}
    </div>
  );

};

export default ResultatChart;