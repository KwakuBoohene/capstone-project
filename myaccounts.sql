-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 29, 2020 at 01:10 PM
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
-- Table structure for table `creditors`
--

DROP TABLE IF EXISTS `creditors`;
CREATE TABLE IF NOT EXISTS `creditors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `amount` int(10) DEFAULT NULL,
  `d_o_borrowing` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `made_payment` tinyint(1) DEFAULT 0,
  `user_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `creditors`
--

INSERT INTO `creditors` (`id`, `name`, `amount`, `d_o_borrowing`, `deadline`, `made_payment`, `user_id`) VALUES
(1, 'AB & Crentsil Partners', 55, '2020-02-04', '2020-03-05', 1, 1),
(2, 'Kasoa Foods', 1000, '2020-02-10', NULL, 0, 1),
(3, 'Creditor 3', 44, '2020-04-28', '2020-05-06', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `debtors`
--

DROP TABLE IF EXISTS `debtors`;
CREATE TABLE IF NOT EXISTS `debtors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `amount` int(10) DEFAULT NULL,
  `d_o_borrowing` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `received_payment` tinyint(1) DEFAULT 0,
  `user_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `debtors`
--

INSERT INTO `debtors` (`id`, `name`, `amount`, `d_o_borrowing`, `deadline`, `received_payment`, `user_id`) VALUES
(1, 'Variety Foods', 54, '2020-04-15', '2020-04-14', 1, 1),
(2, 'Kasoa Foods', 1000, '2020-02-10', NULL, NULL, NULL),
(3, 'Fable Fast Foods', 600, '2020-04-15', '2020-04-21', 1, 1),
(4, 'Economical Fast Foods', 44, '2020-04-08', NULL, 0, NULL),
(5, 'Rice and Stew Purchases', 600, '2020-04-30', '2020-05-06', NULL, 1);

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
  `expense_type` int(6) DEFAULT NULL,
  PRIMARY KEY (`expense_id`),
  KEY `user_id` (`user_id`),
  KEY `expenses_ibfk_2` (`expense_type`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expense_id`, `expense_name`, `amount`, `date_recorded`, `user_id`, `expense_type`) VALUES
(4, 'Oil', 70, '2020-03-11', 1, 2),
(6, 'Vanilla Essence', 44, '2020-02-18', 1, 2),
(7, 'Potatoes and Gravy', 600, '2020-02-19', 2, 2),
(8, 'Rumbaba Cake', 300, '2020-02-29', 2, 2),
(9, 'Maggi Sauce and Onions', 600, '2020-03-03', 2, 2),
(10, 'Agushi Stew', 300, '2020-03-03', 2, 2),
(14, 'rice', 60, '2020-03-18', 1, 2),
(15, 'cabbage stew', 45, '2020-03-25', 1, 2),
(17, 'Gari', 100, '2020-03-17', 1, 2),
(18, 'edibles', 66, '2019-05-06', 1, 2),
(19, 'rice', 700, '2020-04-17', 1, 4),
(20, 'rice', 555, '2020-06-10', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `expense_type`
--

DROP TABLE IF EXISTS `expense_type`;
CREATE TABLE IF NOT EXISTS `expense_type` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expense_type`
--

INSERT INTO `expense_type` (`id`, `type`, `description`) VALUES
(1, 'Administrative Expense', 'These are expenses which are not directly tied to the service you render or the goods you buy and sell or the goods you produce and sell'),
(2, 'Service/Production/Merchandise Expense', 'This cost includes the cost incurred as a result of a service you rendered (if your business is the type which renders services) or the cost you incurred as a result of buying a product to sell (if you are in the merchandising business)'),
(3, 'Other', NULL),
(4, 'Utility expenses', 'This refers to any expense on amenities like water, electricity and sewage');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales` (
  `sale_id` int(6) NOT NULL AUTO_INCREMENT,
  `description` text DEFAULT NULL,
  `amount` int(10) DEFAULT NULL,
  `date_recorded` date DEFAULT NULL,
  `quantity` int(9) DEFAULT NULL,
  `user_id` int(6) NOT NULL,
  PRIMARY KEY (`sale_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`sale_id`, `description`, `amount`, `date_recorded`, `quantity`, `user_id`) VALUES
(1, 'plates of onion stew', 600, '2020-03-17', 9, 1),
(2, 'Rice', 500, '2020-03-10', 60, 1),
(3, 'Gari and Soakings', 700, '2020-04-23', 5, 1),
(4, 'rice', 700, '2020-04-29', 7, 1),
(5, 'rice and gari', 500, '2019-09-17', 50, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `password`) VALUES
(1, 'Kwaku', 'Boohene', 'kwaku.kwayisi@gmail.com', 'kwaku.boohene1'),
(2, 'Frank', 'Doe', 'frank.doe@mail.com', 'frank.doe1'),
(5, 'Jane', 'Doe', 'jane.doe@gmail.com', 'jane.doe1'),
(6, 'Sean', 'Paul', 'sean.paul@gmail.com', 'sean.paul1'),
(12, 'Yaw', 'Ankrah', 'yaw.ankrah@gmail.com', 'yawisgreat');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `creditors`
--
ALTER TABLE `creditors`
  ADD CONSTRAINT `creditors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `debtors`
--
ALTER TABLE `debtors`
  ADD CONSTRAINT `debtors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`expense_type`) REFERENCES `expense_type` (`id`);

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
