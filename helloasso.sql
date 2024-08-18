-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 18 août 2024 à 10:08
-- Version du serveur : 8.0.21
-- Version de PHP : 8.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `helloasso`
--

-- --------------------------------------------------------

--
-- Structure de la table `wp_cotisations_club`
--

CREATE TABLE `wp_cotisations_club` (
  `id` smallint UNSIGNED NOT NULL,
  `titre` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descriptif` varchar(255) NOT NULL,
  `plein_tarif` smallint NOT NULL,
  `demi_tarif` smallint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `wp_cotisations_club`
--

INSERT INTO `wp_cotisations_club` (`id`, `titre`, `descriptif`, `plein_tarif`, `demi_tarif`) VALUES
(1, 'J', '-25 ans au 01/09/2023', 1200, 600),
(2, 'A', '25 ans et plus au 01/09/2023', 2500, 1200),
(5, 'F/F2', 'Famille (2 adultes et à partir de 1 enfant)', 6000, NULL),
(6, 'MV', 'Membre à vie', 0, 0),
(7, 'C', 'Chômeur (justificatif à fournir) et adhérent du club depuis plus d’un an', 0, 0),
(8, 'ANP', 'Adhérent non pratiquant', 1200, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `wp_licences_ffme`
--

CREATE TABLE `wp_licences_ffme` (
  `id` smallint UNSIGNED NOT NULL,
  `titre` char(10) NOT NULL,
  `descriptif` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `plein_tarif` smallint NOT NULL,
  `demi_tarif` smallint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `wp_licences_ffme`
--

INSERT INTO `wp_licences_ffme` (`id`, `titre`, `descriptif`, `plein_tarif`, `demi_tarif`) VALUES
(1, 'FJ', '-18 ans au 31/08/2024 ', 6100, NULL),
(2, 'FA', '18 ans et plus au 31/08/2024', 7350, NULL),
(3, 'FF2', 'Famille :3ème personne et plus ', 4500, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `wp_licences_ffr`
--

CREATE TABLE `wp_licences_ffr` (
  `id` smallint NOT NULL,
  `titre` char(10) NOT NULL,
  `descriptif` varchar(255) NOT NULL,
  `plein_tarif` smallint NOT NULL,
  `demi_tarif` smallint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `wp_licences_ffr`
--

INSERT INTO `wp_licences_ffr` (`id`, `titre`, `descriptif`, `plein_tarif`, `demi_tarif`) VALUES
(1, 'IRA', 'Individuelle Responsabilité Civile Accident Corporel', 2950, NULL),
(2, 'FRA', 'Familiale Responsabilité Civile Accident Corporel', 5850, NULL),
(3, 'IMPN', 'Individuelle Multi-Loisirs Pleine Nature', 4150, NULL),
(4, 'FMPN', 'Familiale Multi-Loisirs Pleine Nature ', 8250, NULL),
(5, 'IMPNJ', 'Jeunes -26 ans au 31/08/2024', 1500, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `wp_options_ffme`
--

CREATE TABLE `wp_options_ffme` (
  `id` smallint NOT NULL,
  `titre` char(10) NOT NULL,
  `descriptif` varchar(150) NOT NULL,
  `plein_tarif` smallint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `wp_options_ffme`
--

INSERT INTO `wp_options_ffme` (`id`, `titre`, `descriptif`, `plein_tarif`) VALUES
(1, 'Base+', '', 300),
(2, 'Base++', '', 1000),
(3, 'Ski piste', '', 500),
(4, 'Skatline', '', 500),
(5, 'Trail', '', 1000);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `wp_cotisations_club`
--
ALTER TABLE `wp_cotisations_club`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `wp_licences_ffme`
--
ALTER TABLE `wp_licences_ffme`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `wp_licences_ffr`
--
ALTER TABLE `wp_licences_ffr`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `wp_options_ffme`
--
ALTER TABLE `wp_options_ffme`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `wp_cotisations_club`
--
ALTER TABLE `wp_cotisations_club`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `wp_licences_ffme`
--
ALTER TABLE `wp_licences_ffme`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `wp_licences_ffr`
--
ALTER TABLE `wp_licences_ffr`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `wp_options_ffme`
--
ALTER TABLE `wp_options_ffme`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
