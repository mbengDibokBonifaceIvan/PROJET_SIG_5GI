
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 27 nov. 2024 à 19:16
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sigdb`
--
-- Création de la base de données `sigdb`
CREATE DATABASE IF NOT EXISTS sigdb;
USE sigdb;
-- --------------------------------------------------------

--
-- Structure de la table `arrondissements`
--

CREATE TABLE `Arrondissement` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL
  /*`longitude` double NOT NULL,
  `lattitude` double NOT NULL*/
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `candidats`
--

CREATE TABLE `Candidat` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `resultats`
--

CREATE TABLE `Resultat` (
  `id` int(11) NOT NULL,
  `id_session` int(11) NOT NULL,
  `id_arrondissement` int(11) NOT NULL,
  `nombre_d_inscrits` int(11) NOT NULL,
  `nombre_de_votants` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `Session` (
  `id` int(11) NOT NULL,
  `annee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `votes`
--

CREATE TABLE `Vote` (
  `id` int(11) NOT NULL,
  `id_resultat` int(11) NOT NULL,
  `id_candidat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `arrondissements`
--
ALTER TABLE `Arrondissement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Candidat`
--
ALTER TABLE `Candidat`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `resultats`
--
ALTER TABLE `Resultat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_arrondissement` (`id_arrondissement`),
  ADD KEY `id_session` (`id_session`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `Session`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `votes`
--
ALTER TABLE `Vote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_candidat` (`id_candidat`),
  ADD KEY `id_resultat` (`id_resultat`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `arrondissements`
--
ALTER TABLE `Arrondissement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `candidats`
--
ALTER TABLE `Candidat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `resultats`
--
ALTER TABLE `Resultat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sessions`
--
ALTER TABLE `Session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `votes`
--
ALTER TABLE `Vote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `resultats`
--
ALTER TABLE `Resultat`
  ADD CONSTRAINT `resultats_ibfk_1` FOREIGN KEY (`id_arrondissement`) REFERENCES `Arrondissement` (`id`),
  ADD CONSTRAINT `resultats_ibfk_2` FOREIGN KEY (`id_session`) REFERENCES `Session` (`id`);

--
-- Contraintes pour la table `votes`
--
ALTER TABLE `Vote`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`id_candidat`) REFERENCES `Candidat` (`id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`id_resultat`) REFERENCES `Resultat` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
