-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 25, 2020 at 12:48 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myaccounts`
--
CREATE DATABASE IF NOT EXISTS `myaccounts` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `myaccounts`;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
  `expense_id` int(6) NOT NULL AUTO_INCREMENT,
  `expense_name` varchar(100) DEFAULT NULL,
  `amount` int(10) DEFAULT NULL,
  `date_recorded` date DEFAULT NULL,
  `user_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`expense_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expense_id`, `expense_name`, `amount`, `date_recorded`, `user_id`) VALUES
(1, 'Rice', 200, '2020-03-03', 1),
(2, 'Yam', 500, '2020-03-06', 1),
(4, 'Oil', 70, '2020-03-11', 1),
(5, 'Yam Balls', 500, '2020-02-11', 1),
(6, 'Vanilla Essence', 44, '2020-02-18', 1),
(7, 'Potatoes and Gravy', 600, '2020-02-19', 2),
(8, 'Rumbaba Cake', 300, '2020-02-29', 2),
(9, 'Maggi Sauce and Onions', 600, '2020-03-03', 2),
(10, 'Agushi Stew', 300, '2020-03-03', 2),
(11, 'edibles', 500, '2020-03-18', 1),
(12, 'Watches', 500, '2020-01-08', 1),
(13, 'Bags', 600, '2020-01-22', 1),
(14, 'rice', 60, '2020-03-18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `qty_in_stock` int(10) DEFAULT NULL,
  `user_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `name`, `price`, `qty_in_stock`, `user_id`) VALUES
(1, 'Rice', 45, 4, 1),
(2, 'Gari and Beans', 44, 1, 1),
(3, 'Cups', 50, 45, 1),
(4, 'Bowls', 15, 20, 2),
(5, 'Plates', 5, 50, 1),
(6, 'Plates', 10, 50, 2);

-- --------------------------------------------------------

--
-- Table structure for table `payables`
--

DROP TABLE IF EXISTS `payables`;
CREATE TABLE IF NOT EXISTS `payables` (
  `payables_id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(10) DEFAULT NULL,
  `paydate` date DEFAULT NULL,
  `user_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`payables_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `receivables`
--

DROP TABLE IF EXISTS `receivables`;
CREATE TABLE IF NOT EXISTS `receivables` (
  `receivables_id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(10) DEFAULT NULL,
  `paydate` date DEFAULT NULL,
  `user_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`receivables_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales` (
  `sale_id` int(6) NOT NULL AUTO_INCREMENT,
  `amount` int(10) DEFAULT NULL,
  `quantity` int(9) DEFAULT NULL,
  `item_id` int(6) DEFAULT NULL,
  `user_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`sale_id`),
  KEY `item_id` (`item_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `password`) VALUES
(1, 'Kwaku', 'Boohene', 'kwaku.kwayisi@gmail.com', 'kwaku.boohene1'),
(2, 'Frank', 'Doe', 'frank.doe@mail.com', 'frank.doe1'),
(5, 'Jane', 'Doe', 'jane.doe@gmail.com', 'jane.doe1'),
(6, 'Sean', 'Paul', 'sean.paul@gmail.com', 'sean.paul1');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `payables`
--
ALTER TABLE `payables`
  ADD CONSTRAINT `payables_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `receivables`
--
ALTER TABLE `receivables`
  ADD CONSTRAINT `receivables_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `inventory` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
