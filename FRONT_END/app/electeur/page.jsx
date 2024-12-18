"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,  
  Button, 
} from "@mui/material";

const ElecteursPage = () => {
  const [electeurs, setElecteurs] = useState([]);

  useEffect(() => {
    const fetchElecteurs = async () => {
      const response = await fetch("http://localhost:8080/electeurs/all");
      const data = await response.json();
      setElecteurs(data);
    };

    fetchElecteurs();
  }, []);

  const handleEdit = (id) => {
    console.log(`Editing electeur with id: ${id}`);
  };

  const handleDelete = ( id) => {
    console.log(`Deleting electeur with id: ${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Liste des Électeurs
      </h1>
      {electeurs.length === 0 ? (
        <p className="text-center">Aucune donnée disponible</p>
      ) : (
        <TableContainer component={Paper} className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Date de Naissance</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Numéro d'Électeur</TableCell>
                <TableCell>Bureau de Vote</TableCell>
                <TableCell>Date d'Inscription</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {electeurs.map((electeur) => (
                <TableRow
                  key={electeur.id_électeur}
                  className="bg-gray-50 dark:bg-gray-900"
                >
                  <TableCell>{electeur.id_électeur}</TableCell>
                  <TableCell>{electeur.nom}</TableCell>
                  <TableCell>{electeur.prénom}</TableCell>
                  <TableCell>{electeur.date_naissance}</TableCell>
                  <TableCell>{electeur.adresse}</TableCell>
                  <TableCell>{electeur.numéro_électeur}</TableCell>
                  <TableCell>{electeur.bureauVote.nom_bureau}</TableCell>
                  <TableCell>{electeur.date_inscription}</TableCell>
                  <TableCell className=" text-nowrap">
                    <Button
                      onClick={() => handleEdit(electeur.id_électeur)}
                      variant="contained"
                      color="primary"
                      className="mr-2"
                    >
                      Editer
                    </Button>
                    <Button
                      onClick={() => handleDelete(electeur.id_électeur)}
                      variant="contained"
                      color="error"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="text-center mt-8">
        <Button variant="contained" color="success">
          Créer un nouvel électeur
        </Button>
      </div>
    </div>
  );
};

export default ElecteursPage;
