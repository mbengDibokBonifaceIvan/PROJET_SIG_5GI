-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 12 jan. 2025 à 00:34
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

-- --------------------------------------------------------

--
-- Structure de la table `arrondissements`
--

CREATE TABLE `arrondissements` (
  `id_arrondissement` bigint(20) NOT NULL,
  `nom_arrondissement` varchar(255) DEFAULT NULL,
  `id_département` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `arrondissements`
--

INSERT INTO `arrondissements` (`id_arrondissement`, `nom_arrondissement`, `id_département`) VALUES
(1, 'Yaounde 1', 1),
(2, 'Yaounde 2', 1),
(3, 'DOUALA 2', 3),
(4, 'Arrondissement de Foumban', 2),
(6, 'Arrondissement de Faro', 5),
(7, 'Arrondissement de Yokadouma', 6),
(8, 'Arrondissement de Kousséri', 7),
(9, 'Arrondissement de Douala I', 8),
(10, 'Arrondissement de Tibati', 9),
(11, 'Arrondissement de Bamenda I', 10),
(12, 'Arrondissement de Dschang ', 13),
(13, 'Arrondissement de Kribi ', 11),
(14, 'Arrondissement de Kumba ', 12);

-- --------------------------------------------------------

--
-- Structure de la table `bureaux_de_vote`
--

CREATE TABLE `bureaux_de_vote` (
  `id_bureau_vote` bigint(20) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `nom_bureau` varchar(255) DEFAULT NULL,
  `centre_vote_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `bureaux_de_vote`
--

INSERT INTO `bureaux_de_vote` (`id_bureau_vote`, `latitude`, `longitude`, `nom_bureau`, `centre_vote_id`) VALUES
(1, 3.864217556071893, 11.551995201269344, 'Bureau de Vote de Yaounde', 1),
(2, 4.054910687449824, 9.756739189092695, 'Bureau de Vote de Douala', 1),
(3, 5.48172200780412, 10.424209921635493, 'Bureau de Vote de Bafoussam', 1),
(4, 2.9404263852128296, 9.909710911804625, 'Bureau de Vote de Kribi', 1),
(5, 40.4165, -3.7026, 'Bureau de Vote de Madrid', 2),
(7, 10.59429926548714, 14.322867461253484, 'Bureau de Vote de Maroua', 2),
(8, 3.870096695138264, 11.540876352270963, 'Bureau de Vote de Yaounde 1', 6),
(9, 4.067218752917907, 9.707660342630296, 'Bureau de Vote de Douala 1', 7),
(10, 5.721638504159253, 10.902085310382008, 'Bureau de Vote de Foumban', 8),
(11, 9.324050888491374, 13.392438698057367, 'Bureau de Vote de Fao', 9),
(12, 3.530883597968582, 15.01759797321842, 'Bureau de Vote de Yokadouma', 10),
(13, 12.08054543847019, 15.280973797687354, 'Bureau de Vote de Kousseri', 11),
(14, 6.4717142852679075, 12.616901512963409, 'Bureau de Vote de Tibati', 12),
(15, 6.4717142852679075, 12.616901512963409, 'Bureau de Vote de Bamenda', 13),
(16, 5.446319093480628, 10.044980005165165, 'Bureau de Vote de Dschang', 14),
(17, 2.9409786392539807, 9.908756072522404, 'Bureau de Vote de Kribi', 15),
(18, 4.6333384584187, 9.44384348033826, 'Bureau de Vote de Kumba', 16);

-- --------------------------------------------------------

--
-- Structure de la table `candidats`
--

CREATE TABLE `candidats` (
  `id_candidat` bigint(20) NOT NULL,
  `nom_candidat` varchar(255) DEFAULT NULL,
  `parti_politique` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `candidats`
--

INSERT INTO `candidats` (`id_candidat`, `nom_candidat`, `parti_politique`) VALUES
(1, 'Ivan', 'Solo Leveling'),
(2, 'Yasmine', 'Tiktok Coorporation'),
(3, 'Hemery', 'Bankai'),
(4, 'Diroil', 'Aomine'),
(5, 'Raissa', 'Tiom\'s');

-- --------------------------------------------------------

--
-- Structure de la table `centres_de_vote`
--

CREATE TABLE `centres_de_vote` (
  `id_centre_vote` bigint(20) NOT NULL,
  `nom_centre` varchar(255) DEFAULT NULL,
  `arrondissement_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `centres_de_vote`
--

INSERT INTO `centres_de_vote` (`id_centre_vote`, `nom_centre`, `arrondissement_id`) VALUES
(1, 'Centre de Vote 4', 1),
(2, 'Centre de Vote 1', 1),
(3, 'Centre de Vote 2', 2),
(4, 'Centre de Vote 8', 3),
(6, 'Centre de Vote de Yaounde 1', 1),
(7, 'Centre de Vote de Douala 1', 9),
(8, 'Centre de Vote de Foumban', 4),
(9, 'Centre de Vote de Faro', 6),
(10, 'Centre de Vote de Yokadouma', 7),
(11, 'Centre de Vote de Kousseri', 8),
(12, 'Centre de Vote de Tibati', 10),
(13, 'Centre de Vote de Bamenda 1', 10),
(14, 'Centre de Vote de Dschang ', 12),
(15, 'Centre de Vote de Kribi ', 13),
(16, 'Centre de Vote de Kumba ', 14);

-- --------------------------------------------------------

--
-- Structure de la table `departements`
--

CREATE TABLE `departements` (
  `id_département` bigint(20) NOT NULL,
  `nom_département` varchar(255) DEFAULT NULL,
  `id_région` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `departements`
--

INSERT INTO `departements` (`id_département`, `nom_département`, `id_région`) VALUES
(1, 'Département du Mfoundi', 4),
(2, 'Département du Noun', 2),
(3, 'Département du Haut-Nkam', 1),
(5, 'Département du Faro-et-Déo', 7),
(6, 'Département du Boumba-et-Ngoko', 8),
(7, 'Logone-et-Chari', 9),
(8, 'Département du Wouri', 1),
(9, 'Département du Mayo-Louti', 6),
(10, 'Département du Mezam', 10),
(11, 'Département de l\'Océan', 12),
(12, 'Département de la Meme', 11),
(13, 'Département de la Menoua', 2);

-- --------------------------------------------------------

--
-- Structure de la table `electeurs`
--

CREATE TABLE `electeurs` (
  `id_électeur` bigint(20) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `date_inscription` datetime(6) DEFAULT NULL,
  `date_naissance` datetime(6) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `numéro_électeur` varchar(255) DEFAULT NULL,
  `prénom` varchar(255) DEFAULT NULL,
  `bureau_vote_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `electeurs`
--

INSERT INTO `electeurs` (`id_électeur`, `adresse`, `date_inscription`, `date_naissance`, `nom`, `numéro_électeur`, `prénom`, `bureau_vote_id`) VALUES
(1, 'Adresse de l\'électeur', '2024-12-03 01:00:00.000000', '2001-01-01 01:00:00.000000', 'Mboto', '12345', 'celestin', 1),
(2, 'Adresse de l\'électeur', '2024-12-03 01:00:00.000000', '2001-01-01 01:00:00.000000', 'Atangana', '9854', 'Vincent', 2),
(3, 'Adresse de l\'électeur', '2024-12-03 01:00:00.000000', '2001-01-01 01:00:00.000000', 'Balep', '8753', 'Alexandra', 3),
(4, 'Nouvelle adresse de l\'électeur', '2024-12-04 01:00:00.000000', '1995-01-01 01:00:00.000000', 'Nouveau nom de l\'électeur', '54321', 'Nouveau prénom de l\'électeur', 2),
(9, '321 Pine Street', '2024-07-10 01:00:00.000000', '1980-03-20 01:00:00.000000', 'Johnson', '1234', 'Alice', 2),
(10, '567 Cedar Avenue', '2025-02-28 01:00:00.000000', '1992-11-12 01:00:00.000000', 'Wilson', '6789', 'Michael', 7),
(11, '987 Willow Lane', '2024-10-15 01:00:00.000000', '1975-08-05 01:00:00.000000', 'Martinez', '3456', 'Sofia', 15),
(12, '789 Elm Street', '2024-09-12 01:00:00.000000', '1987-06-28 01:00:00.000000', 'Lee', '5432', 'David', 3),
(13, '456 Oak Avenue', '2025-03-05 01:00:00.000000', '1990-04-15 01:00:00.000000', 'Garcia', '8765', 'Maria', 10),
(14, '123 Maple Street', '2024-11-20 01:00:00.000000', '1983-12-03 01:00:00.000000', 'Chen', '9876', 'Ling', 18);

-- --------------------------------------------------------

--
-- Structure de la table `regions`
--

CREATE TABLE `regions` (
  `id_région` bigint(20) NOT NULL,
  `nom_région` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `regions`
--

INSERT INTO `regions` (`id_région`, `nom_région`) VALUES
(1, 'Littoral'),
(2, 'Ouest'),
(4, 'Centre'),
(6, 'Nord'),
(7, 'Adamaoua'),
(8, 'Est'),
(9, 'Extrême-Nord'),
(10, 'Nord-Ouest'),
(11, 'Sud-Ouest'),
(12, 'Sud');

-- --------------------------------------------------------

--
-- Structure de la table `resultats`
--

CREATE TABLE `resultats` (
  `id_résultat` bigint(20) NOT NULL,
  `annee_election` int(11) NOT NULL,
  `date_saisie` datetime(6) DEFAULT NULL,
  `nombre_voix` int(11) NOT NULL,
  `id_bureau_vote` bigint(20) DEFAULT NULL,
  `id_candidat` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `resultats`
--

INSERT INTO `resultats` (`id_résultat`, `annee_election`, `date_saisie`, `nombre_voix`, `id_bureau_vote`, `id_candidat`) VALUES
(1, 2024, '2024-12-06 01:00:00.000000', 500, 2, 1),
(2, 2024, '2024-12-06 01:00:00.000000', 200, 2, 2),
(3, 2024, '2024-12-06 01:00:00.000000', 395, 2, 3),
(5, 2024, '2024-12-06 01:00:00.000000', 100, 1, 4),
(6, 2024, '2024-12-06 01:00:00.000000', 800, 1, 1),
(7, 2024, '2024-12-06 01:00:00.000000', 500, 1, 2),
(8, 2024, '2024-12-04 01:00:00.000000', 135, 2, 4),
(9, 2024, '2024-12-06 01:00:00.000000', 600, 1, 3),
(10, 2024, '2024-12-06 01:00:00.000000', 600, 3, 4),
(11, 2024, '2024-12-06 01:00:00.000000', 100, 3, 1),
(12, 2024, '2024-12-06 01:00:00.000000', 258, 3, 2),
(13, 2024, '2024-12-06 01:00:00.000000', 180, 3, 3),
(15, 2024, '2024-12-06 01:00:00.000000', 100, 1, 5),
(16, 2024, '2024-12-06 01:00:00.000000', 90, 7, 5),
(17, 2024, '2024-12-06 01:00:00.000000', 250, 15, 5),
(18, 2024, '2024-12-06 01:00:00.000000', 180, 10, 5),
(19, 2024, '2024-12-06 01:00:00.000000', 75, 18, 5);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` bigint(20) NOT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `nom_utilisateur` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `id_bureau_vote` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `mot_de_passe`, `nom_utilisateur`, `role`, `id_bureau_vote`) VALUES
(1, '12345678', 'Mbeng', 'SuperAdmin', 1),
(2, '87654321', 'Mfangam', 'SuperAdmin', 2),
(3, '123456789', 'Mbong', 'Scrutateur', 2),
(4, '987654321', 'Keumouo', 'SuperAdmin', 3),
(6, 'tiomela18', 'Tiomela', 'Scrutateur', 1),
(7, 'afoncraft', 'Lashu', 'Scrutateur', 2),
(8, 'frantzDimitri', 'Tapamo', 'Scrutateur', 3),
(9, 'MonsieurBel', 'Belinga', 'Scrutateur', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `arrondissements`
--
ALTER TABLE `arrondissements`
  ADD PRIMARY KEY (`id_arrondissement`),
  ADD KEY `FKmcexp5g27lvm1jed47s2p3ip0` (`id_département`);

--
-- Index pour la table `bureaux_de_vote`
--
ALTER TABLE `bureaux_de_vote`
  ADD PRIMARY KEY (`id_bureau_vote`),
  ADD KEY `FKt5bfjw02t3owk3lnmh3a49hgx` (`centre_vote_id`);

--
-- Index pour la table `candidats`
--
ALTER TABLE `candidats`
  ADD PRIMARY KEY (`id_candidat`);

--
-- Index pour la table `centres_de_vote`
--
ALTER TABLE `centres_de_vote`
  ADD PRIMARY KEY (`id_centre_vote`),
  ADD KEY `FK8wdn3e2f2bpml7q5klopsviep` (`arrondissement_id`);

--
-- Index pour la table `departements`
--
ALTER TABLE `departements`
  ADD PRIMARY KEY (`id_département`),
  ADD KEY `FKap8qe4ry97ffbubgqvchbvoy3` (`id_région`);

--
-- Index pour la table `electeurs`
--
ALTER TABLE `electeurs`
  ADD PRIMARY KEY (`id_électeur`),
  ADD KEY `FKgubiak2bfnlyke4xh9y7m7dj0` (`bureau_vote_id`);

--
-- Index pour la table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id_région`);

--
-- Index pour la table `resultats`
--
ALTER TABLE `resultats`
  ADD PRIMARY KEY (`id_résultat`),
  ADD KEY `FKmb1igil3a313ga3xxf56ay2cf` (`id_bureau_vote`),
  ADD KEY `FKr12h895e4pr3yeiju0y7wuevt` (`id_candidat`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD KEY `FK6m858dbodh1ql6dngiyc3n1lu` (`id_bureau_vote`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `arrondissements`
--
ALTER TABLE `arrondissements`
  MODIFY `id_arrondissement` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `bureaux_de_vote`
--
ALTER TABLE `bureaux_de_vote`
  MODIFY `id_bureau_vote` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `candidats`
--
ALTER TABLE `candidats`
  MODIFY `id_candidat` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `centres_de_vote`
--
ALTER TABLE `centres_de_vote`
  MODIFY `id_centre_vote` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `departements`
--
ALTER TABLE `departements`
  MODIFY `id_département` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `electeurs`
--
ALTER TABLE `electeurs`
  MODIFY `id_électeur` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `regions`
--
ALTER TABLE `regions`
  MODIFY `id_région` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `resultats`
--
ALTER TABLE `resultats`
  MODIFY `id_résultat` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `arrondissements`
--
ALTER TABLE `arrondissements`
  ADD CONSTRAINT `FKmcexp5g27lvm1jed47s2p3ip0` FOREIGN KEY (`id_département`) REFERENCES `departements` (`id_département`);

--
-- Contraintes pour la table `bureaux_de_vote`
--
ALTER TABLE `bureaux_de_vote`
  ADD CONSTRAINT `FKt5bfjw02t3owk3lnmh3a49hgx` FOREIGN KEY (`centre_vote_id`) REFERENCES `centres_de_vote` (`id_centre_vote`);

--
-- Contraintes pour la table `centres_de_vote`
--
ALTER TABLE `centres_de_vote`
  ADD CONSTRAINT `FK8wdn3e2f2bpml7q5klopsviep` FOREIGN KEY (`arrondissement_id`) REFERENCES `arrondissements` (`id_arrondissement`);

--
-- Contraintes pour la table `departements`
--
ALTER TABLE `departements`
  ADD CONSTRAINT `FKap8qe4ry97ffbubgqvchbvoy3` FOREIGN KEY (`id_région`) REFERENCES `regions` (`id_région`);

--
-- Contraintes pour la table `electeurs`
--
ALTER TABLE `electeurs`
  ADD CONSTRAINT `FKgubiak2bfnlyke4xh9y7m7dj0` FOREIGN KEY (`bureau_vote_id`) REFERENCES `bureaux_de_vote` (`id_bureau_vote`);

--
-- Contraintes pour la table `resultats`
--
ALTER TABLE `resultats`
  ADD CONSTRAINT `FKmb1igil3a313ga3xxf56ay2cf` FOREIGN KEY (`id_bureau_vote`) REFERENCES `bureaux_de_vote` (`id_bureau_vote`),
  ADD CONSTRAINT `FKr12h895e4pr3yeiju0y7wuevt` FOREIGN KEY (`id_candidat`) REFERENCES `candidats` (`id_candidat`);

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `FK6m858dbodh1ql6dngiyc3n1lu` FOREIGN KEY (`id_bureau_vote`) REFERENCES `bureaux_de_vote` (`id_bureau_vote`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
