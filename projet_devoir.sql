-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 02 août 2020 à 17:40
-- Version du serveur :  10.4.13-MariaDB
-- Version de PHP : 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_devoir`
--

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id` bigint(20) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `dateLivraison` datetime DEFAULT NULL,
  `isPayed` bit(1) NOT NULL,
  `statuts` varchar(30) DEFAULT NULL,
  `totalHT` double NOT NULL,
  `totalTTC` double NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `urlFactureGlobal` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `id` bigint(20) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `montantPaye` double NOT NULL,
  `statuts` varchar(30) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `urlFacturePartielle` varchar(255) DEFAULT NULL,
  `commande_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id` bigint(20) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `prix` double NOT NULL,
  `prixMin` double NOT NULL,
  `qte` double NOT NULL,
  `statuts` varchar(30) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `produitcommande`
--

CREATE TABLE `produitcommande` (
  `id` bigint(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `prix` double NOT NULL,
  `qte` double NOT NULL,
  `statuts` varchar(30) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `commande_id` bigint(20) DEFAULT NULL,
  `produit_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(2, 'ROLE_ADMIN'),
(1, 'ROLE_CLIENT');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `adresse` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `statuts` varchar(30) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `adresse`, `createdAt`, `email`, `nom`, `password`, `statuts`, `telephone`, `updatedAt`, `username`, `role_id`) VALUES
(1, 'MEDINA', '2020-08-02 14:00:11', 'ex2016@gmail.com', 'ABDOULBASSUR ABDOU SOIMADOU', '$2a$10$kl8r0f9sRG7EAB0DSfOOc.BFXh9Uaz3TD0s57OoQi7FjDJFWucRXW', 'active', '772643456', '2020-08-02 14:00:11', 'ex2016', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKqv8i4u2pyfqfauugqylrol0p1` (`code`),
  ADD KEY `FKdoxqj5u97rh2fx400mxnviuli` (`user_id`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK5jexc9lyto9gv54lcnt9jigoi` (`code`),
  ADD KEY `FK7154xu8wk0uya9b09dg8pcedm` (`commande_id`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK4c9pycvudiq9gb9e6gij916y6` (`code`);

--
-- Index pour la table `produitcommande`
--
ALTER TABLE `produitcommande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1y63n81im8u0nvabcldvq8q09` (`commande_id`),
  ADD KEY `FKgrl22mk5flfycn5x6hshay0e7` (`produit_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  ADD KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `produitcommande`
--
ALTER TABLE `produitcommande`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `FKdoxqj5u97rh2fx400mxnviuli` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `FK7154xu8wk0uya9b09dg8pcedm` FOREIGN KEY (`commande_id`) REFERENCES `commande` (`id`);

--
-- Contraintes pour la table `produitcommande`
--
ALTER TABLE `produitcommande`
  ADD CONSTRAINT `FK1y63n81im8u0nvabcldvq8q09` FOREIGN KEY (`commande_id`) REFERENCES `commande` (`id`),
  ADD CONSTRAINT `FKgrl22mk5flfycn5x6hshay0e7` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
