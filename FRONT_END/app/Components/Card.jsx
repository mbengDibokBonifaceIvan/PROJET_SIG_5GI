import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const Card = () => {
  const [totalRegions, setTotalRegions] = useState(0);
  const [totalDepartements, setTotalDepartements] = useState(0);
  const [totalArrondissements, setTotalArrondissements] = useState(0);
  const [totalStrutateurs, setTotalStrutateurs] = useState(0);
  const [totalAdministrateurs, setTotalAdministrateurs] = useState(0);
  const [totalElecteurs, setTotalElecteurs] = useState(0);
  const [totalCentreVote, setTotalCentreVote] = useState(0);
  const [totalBureauVote, setTotalBureauVote] = useState(0);
  const [totalCandidat, setTotalCandidat] = useState(0);







  



  useEffect(() => {
    const fetchTotalRegions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/regions/countAll'); // Assurez-vous que l'URL correspond à votre API
        setTotalRegions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des régions:', error);
      }
    };


    const fetchtotalDepartements = async () => {
      try {
        const response = await axios.get('http://localhost:8080/departements/count'); 
        setTotalDepartements(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des departements:', error);
      }
    };


    const fetchtotalArrondissements = async () => {
      try {
        const response = await axios.get('http://localhost:8080/arrondissements/count'); 
        setTotalArrondissements(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Arrondissements:', error);
      }
    };



    const fetchtotalStrutateurs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/utilisateurs/nombreScrutateurs');
        setTotalStrutateurs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Strutateurs:', error);
      }
    };




    const fetchtotalAdministrateurs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/utilisateurs/nombreSuperAdministrateur'); 
        setTotalAdministrateurs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Administrateurs:', error);
      }
    };




    const fetchtotalElecteurs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/electeurs/count'); 
        setTotalElecteurs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Electeurs:', error);
      }
    };



    const fetchtotalCentreVote = async () => {
      try {
        const response = await axios.get('http://localhost:8080/centres-de-vote/count'); 
        setTotalCentreVote(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Centres De Vote:', error);
      }
    };




    const fetchtotalBureauVote = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bureaux-de-vote/count'); 
        setTotalBureauVote(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des bureaux De Vote:', error);
      }
    };


    const fetchtotalCandidat = async () => {
      try {
        const response = await axios.get('http://localhost:8080/candidats/count'); 
        setTotalCandidat(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des candidats:', error);
      }
    };



    fetchtotalCandidat();
    fetchtotalBureauVote();
    fetchtotalCentreVote();
    fetchtotalElecteurs();
    fetchtotalAdministrateurs();
    fetchtotalStrutateurs();
    fetchTotalRegions();
    fetchtotalDepartements();
    fetchtotalArrondissements();
  }, []);

  return (
    // <div className="product">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ProductCard
        value={totalRegions} // Utilisez la valeur récupérée ici
        name="Total Region"
        url="/region"
      />
      <ProductCard
        value={totalCandidat}
        name="Total Candidat"
        url="/candidats"
      />
      <ProductCard
        name="Total Arrondissement"
        value={totalArrondissements}
        url="/arrondissement"
      />
      <ProductCard
        name="Total Departement"
        value={totalDepartements}
        url="/departement"
      />
      <ProductCard
        name="Total Bureau De Vote"
        value={totalBureauVote}
        url="/bureauvote"
      />
      <ProductCard
        name="Total Centre De Vote"
        value={totalCentreVote}
        url="/centrevote"
      />
      <ProductCard
        name="Total Electeur"
        value={totalElecteurs}
        url="/electeur"
      />
      <ProductCard
        name="Total Scrutateur"
        value={totalStrutateurs}
        url="/scrutateurs"
      />
      <ProductCard
        name="Total Administrateur"
        value={totalAdministrateurs}
        url="/superAdministrateur"
      />
    </div>
  );
}

export default Card;