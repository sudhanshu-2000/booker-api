-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 16, 2024 at 01:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booker-website`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents_statement`
--

CREATE TABLE `agents_statement` (
  `id` int(11) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `discription` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agents_statement`
--

INSERT INTO `agents_statement` (`id`, `mobile`, `amount`, `discription`, `date`) VALUES
(55, '8898765437', '0.14', 'Level 1', '2024-02-24 10:07:22'),
(56, '8898765437', '0.08', 'Level 1', '2024-02-24 10:07:22');

-- --------------------------------------------------------

--
-- Table structure for table `assign_module`
--

CREATE TABLE `assign_module` (
  `id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `module` int(11) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assign_module`
--

INSERT INTO `assign_module` (`id`, `role`, `module`, `position`, `status`, `date`) VALUES
(585, 5, 1, 204, 'Y', '2024-09-11 09:52:07'),
(586, 5, 13, 205, 'Y', '2024-09-11 09:52:07'),
(587, 5, 18, 206, 'Y', '2024-09-11 09:52:07'),
(588, 5, 20, 207, 'Y', '2024-09-11 09:52:07'),
(589, 5, 28, 208, 'Y', '2024-09-11 09:52:07'),
(590, 5, 30, 209, 'Y', '2024-09-11 09:52:07'),
(591, 6, 1, 210, 'Y', '2024-09-11 09:52:21'),
(592, 6, 13, 211, 'Y', '2024-09-11 09:52:21'),
(593, 6, 18, 212, 'Y', '2024-09-11 09:52:21'),
(594, 6, 20, 213, 'Y', '2024-09-11 09:52:21'),
(595, 6, 28, 214, 'Y', '2024-09-11 09:52:21'),
(645, 16, 28, 226, 'Y', '2024-11-25 06:09:52'),
(646, 16, 44, 227, 'Y', '2024-11-25 06:09:52'),
(647, 16, 45, 228, 'Y', '2024-11-25 06:09:52'),
(648, 16, 46, 229, 'Y', '2024-11-25 06:09:52'),
(748, 3, 1, 230, 'Y', '2024-12-14 08:39:17'),
(749, 3, 13, 231, 'Y', '2024-12-14 08:39:17'),
(750, 3, 18, 232, 'Y', '2024-12-14 08:39:17'),
(751, 3, 20, 233, 'Y', '2024-12-14 08:39:17'),
(752, 3, 28, 234, 'Y', '2024-12-14 08:39:17'),
(753, 3, 30, 235, 'Y', '2024-12-14 08:39:17'),
(754, 3, 44, 236, 'Y', '2024-12-14 08:39:17'),
(755, 3, 45, 237, 'Y', '2024-12-14 08:39:17'),
(756, 3, 46, 238, 'Y', '2024-12-14 08:39:17'),
(757, 3, 47, 239, 'Y', '2024-12-14 08:39:17'),
(758, 3, 48, 240, 'Y', '2024-12-14 08:39:17'),
(759, 3, 49, 241, 'Y', '2024-12-14 08:39:17'),
(760, 3, 50, 242, 'Y', '2024-12-14 08:39:17');

-- --------------------------------------------------------

--
-- Table structure for table `bet_mines`
--

CREATE TABLE `bet_mines` (
  `id` int(11) NOT NULL,
  `gameid` varchar(200) NOT NULL,
  `game_type` varchar(100) NOT NULL,
  `mobile` varchar(200) NOT NULL,
  `bet_amount` varchar(100) NOT NULL,
  `multiple` varchar(100) DEFAULT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'P',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bet_mines`
--

INSERT INTO `bet_mines` (`id`, `gameid`, `game_type`, `mobile`, `bet_amount`, `multiple`, `status`, `date`) VALUES
(37, '2024000000', 'Mines', '8690708302', '100', '', 'P', '2024-12-07 09:20:31'),
(38, '2024000001', 'Wheel', '8690708302', '100', '', 'P', '2024-12-07 09:20:53'),
(39, '2024000002', 'Wheel', '8690708302', '100', '1.2', 'W', '2024-12-07 09:21:11'),
(40, '2024000003', 'Mines', '8690708302', '100', '', 'P', '2024-12-07 09:22:21'),
(41, '2024000004', 'Mines', '8690708302', '100', '1.08', 'W', '2024-12-07 09:22:26'),
(42, '2024000005', 'Mines', '8690708302', '100', '', 'P', '2024-12-07 09:34:58'),
(43, '2024000006', 'Mines', '8690708302', '100', '', 'P', '2024-12-07 09:35:06'),
(44, '2024000007', 'Wheel', '8690708302', '100', '1.2', 'W', '2024-12-07 10:16:54'),
(45, '2024000008', 'Wheel', '8690708302', '100', '', 'L', '2024-12-07 10:17:45'),
(46, '2024000009', 'Wheel', '8690708302', '100', '1.2', 'W', '2024-12-07 10:22:18'),
(47, '2024000010', 'Wheel', '8690708302', '100', '', 'L', '2024-12-07 10:26:29'),
(48, '2024000011', 'Wheel', '8690708302', '100', '', 'P', '2024-12-07 10:27:15'),
(49, '2024000012', 'Wheel', '8690708302', '100', '1.5', 'W', '2024-12-07 10:27:18'),
(50, '2024000013', 'Wheel', '8690708302', '100', '', 'L', '2024-12-07 10:28:51'),
(51, '2024000014', 'Wheel', '8690708302', '100', '1.5', 'W', '2024-12-07 10:29:26'),
(52, '2024000015', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:53:25'),
(53, '2024000016', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:53:29'),
(54, '2024000017', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:53:32'),
(55, '2024000018', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:53:36'),
(56, '2024000019', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:55:46'),
(57, '2024000020', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:55:49'),
(58, '2024000021', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:55:53'),
(59, '2024000022', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:55:56'),
(60, '2024000023', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:00'),
(61, '2024000024', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:03'),
(62, '2024000025', 'Wheel', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:07'),
(63, '2024000026', 'Wheel', '8690708302', '100', '1.2', 'W', '2024-12-07 10:56:15'),
(64, '2024000027', 'Wheel', '8690708302', '100', '1.2', 'W', '2024-12-07 10:56:18'),
(65, '2024000028', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:26'),
(66, '2024000029', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:28'),
(67, '2024000030', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:30'),
(68, '2024000031', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:32'),
(69, '2024000032', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:34'),
(70, '2024000033', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:37'),
(71, '2024000034', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:38'),
(72, '2024000035', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:41'),
(73, '2024000036', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:43'),
(74, '2024000037', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:44'),
(75, '2024000038', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:47'),
(76, '2024000039', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:49'),
(77, '2024000040', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:51'),
(78, '2024000041', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:53'),
(79, '2024000042', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:55'),
(80, '2024000043', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:57'),
(81, '2024000044', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:56:59'),
(82, '2024000045', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:58:14'),
(83, '2024000046', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:58:16'),
(84, '2024000047', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:58:18'),
(85, '2024000048', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:58:20'),
(86, '2024000049', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:58:22'),
(87, '2024000050', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:59:04'),
(88, '2024000051', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:59:06'),
(89, '2024000052', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:59:42'),
(90, '2024000053', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:59:44'),
(91, '2024000054', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:59:46'),
(92, '2024000055', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:59:48'),
(93, '2024000056', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 10:59:50'),
(94, '2024000057', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:00:15'),
(95, '2024000058', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:22'),
(96, '2024000059', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:24'),
(97, '2024000060', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:26'),
(98, '2024000061', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:28'),
(99, '2024000062', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:30'),
(100, '2024000063', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:32'),
(101, '2024000064', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:34'),
(102, '2024000065', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:36'),
(103, '2024000066', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:38'),
(104, '2024000067', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:40'),
(105, '2024000068', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:42'),
(106, '2024000069', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:44'),
(107, '2024000070', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:46'),
(108, '2024000071', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:48'),
(109, '2024000072', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:50'),
(110, '2024000073', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:52'),
(111, '2024000074', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:54'),
(112, '2024000075', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:56'),
(113, '2024000076', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:00:58'),
(114, '2024000077', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:00'),
(115, '2024000078', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:02'),
(116, '2024000079', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:04'),
(117, '2024000080', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:06'),
(118, '2024000081', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:08'),
(119, '2024000082', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:10'),
(120, '2024000083', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:12'),
(121, '2024000084', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:14'),
(122, '2024000085', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:26'),
(123, '2024000086', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:01:28'),
(124, '2024000087', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:02:16'),
(125, '2024000088', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:02:18'),
(126, '2024000089', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:03:03'),
(127, '2024000090', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:03:05'),
(128, '2024000091', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:04:04'),
(129, '2024000092', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:04:06'),
(130, '2024000093', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:04:59'),
(131, '2024000094', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:05:01'),
(132, '2024000095', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:06:00'),
(133, '2024000096', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:06:49'),
(134, '2024000097', 'Mines', '8690708302', '100', '1.03', 'W', '2024-12-07 11:07:46'),
(135, '2024000098', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:08:04'),
(136, '2024000099', 'Mines', '8690708302', '100', NULL, 'L', '2024-12-07 11:09:14'),
(137, '2024000100', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:09:59'),
(138, '2024000101', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:07'),
(139, '2024000102', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:09'),
(140, '2024000103', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:11'),
(141, '2024000104', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:13'),
(142, '2024000105', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:15'),
(143, '2024000106', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:17'),
(144, '2024000107', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:19'),
(145, '2024000108', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:21'),
(146, '2024000109', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:23'),
(147, '2024000110', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:25'),
(148, '2024000111', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:27'),
(149, '2024000112', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:29'),
(150, '2024000113', 'Mines', '8690708302', '100', NULL, 'L', '2024-12-07 11:10:31'),
(151, '2024000114', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:33'),
(152, '2024000115', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:35'),
(153, '2024000116', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:37'),
(154, '2024000117', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:39'),
(155, '2024000118', 'Mines', '8690708302', '100', NULL, 'L', '2024-12-07 11:10:41'),
(156, '2024000119', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:10:43'),
(157, '2024000120', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:50'),
(158, '2024000121', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:52'),
(159, '2024000122', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:54'),
(160, '2024000123', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:56'),
(161, '2024000124', 'Mines', '8690708302', '100', '1.12', 'W', '2024-12-07 11:10:58'),
(162, '2024000125', 'Mines', '8690708302', '100', NULL, 'P', '2024-12-07 11:11:00');

-- --------------------------------------------------------

--
-- Table structure for table `buy_plan`
--

CREATE TABLE `buy_plan` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `amount` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'ongoing',
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `expire_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buy_plan`
--

INSERT INTO `buy_plan` (`id`, `user_id`, `plan_id`, `amount`, `status`, `date`, `expire_date`) VALUES
(54, 9, 1, '1000', 'ongoing', '2024-10-04 09:38:47', '2024-10-13 18:30:00'),
(55, 9, 1, '1000', 'ongoing', '2024-10-04 09:41:41', '2024-10-13 18:30:00'),
(56, 9, 1, '1000', 'ongoing', '2024-10-04 09:42:31', '2024-10-13 18:30:00'),
(57, 16, 1, '1000', 'ongoing', '2024-10-14 09:57:36', '2024-10-23 18:30:00'),
(58, 9, 1, '100', 'ongoing', '2024-10-23 06:31:48', '2024-11-01 18:30:00'),
(59, 10, 2, '1000', 'ongoing', '2024-11-04 08:38:42', '2024-11-29 18:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `casino_bet`
--

CREATE TABLE `casino_bet` (
  `id` int(11) NOT NULL,
  `userid` varchar(100) NOT NULL,
  `gamedata_providerCode` varchar(100) DEFAULT NULL,
  `gamedata_providerTransactionId` varchar(200) DEFAULT NULL,
  `gamedata_gameCode` varchar(100) DEFAULT NULL,
  `gamedata_description` varchar(100) DEFAULT NULL,
  `gamedata_providerRoundId` varchar(200) DEFAULT NULL,
  `transactiondata_Id` varchar(100) DEFAULT NULL,
  `transactiondata_amount` varchar(100) DEFAULT NULL,
  `transactiondata_referenceId` varchar(200) DEFAULT NULL,
  `timestamp` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casino_bet`
--

INSERT INTO `casino_bet` (`id`, `userid`, `gamedata_providerCode`, `gamedata_providerTransactionId`, `gamedata_gameCode`, `gamedata_description`, `gamedata_providerRoundId`, `transactiondata_Id`, `transactiondata_amount`, `transactiondata_referenceId`, `timestamp`, `date`) VALUES
(1, '31', 'SN', '25406', 'VTP', 'bet', '2449691', '249', '500', '', '2024-12-12T06:02:09.115Z', '2024-12-12 06:02:09'),
(3, '31', 'SN', '25406', 'VTP', 'bet', '2449691', '2249', '500', '', '2024-12-12T06:06:45.666Z', '2024-12-12 06:06:45'),
(4, '31', 'SN', '25406', 'VTP', 'bet', '2449691', '224s9', '500', '', '2024-12-12T06:07:16.928Z', '2024-12-12 06:07:16'),
(5, '31', 'SN', '25406', 'VTP', 'bet', '2449691', '24ww9', '500', '', '2024-12-12T07:54:35.507Z', '2024-12-12 07:54:35'),
(6, '31', 'SN', '25406', 'VTP', 'bet', '2449691', '24w9', '500', '', '2024-12-12T07:55:38.608Z', '2024-12-12 07:55:38');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `message` varchar(300) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `message`, `phone`, `date`) VALUES
(10, 'tarun', 'tsoni9742@gmail.com', ' Hii thit sis me', '869070983302', '2024-07-26 11:31:51'),
(11, 'tarun', 'tsoni9742@gmail.com', 'Hii thit sis me', '869070983302', '2024-07-27 09:44:15'),
(12, 'tarun', 'tsoni9742@gmail.com', 'Hii thit sis me', '869070983302', '2024-07-27 09:50:55'),
(13, 'Jon Stewart Doe', 'test@example.us', 'hii', '6019521325', '2024-07-27 09:51:54'),
(14, 'tarun', 'tsoni9742@gmail.com', 'Hii thit sis me', '869070983302', '2024-07-27 09:52:35'),
(15, 'Jon Stewart Doe', 'tsoni9742@gmail.com', 'hii', '6019521325', '2024-07-27 09:52:59'),
(16, 'Jon Stewart Doe', 'tsoni9742@gmail.com', 'hii', '6019521325', '2024-07-27 09:55:24'),
(17, 'Jon Stewart Doe', 'tsoni9742@gmail.com', 'hiii', '6019521325', '2024-07-27 10:09:59'),
(18, 'Jon Stewart Doe', 'tsoni9742@gmail.com', 'hii', '6019521325', '2024-07-27 10:16:07'),
(19, 'tarun', 'tsoni9742@gmail.com', 'Hii thit sis me', '869070983302', '2024-07-29 09:03:22'),
(20, 'Jon Stewart Doe', 'tsoni9742@gmail.com', 'Hii', '6019521325', '2024-08-01 06:04:42');

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

CREATE TABLE `deposit` (
  `id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `balance` varchar(200) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `image_path` varchar(250) DEFAULT NULL,
  `transaction_id` varchar(50) DEFAULT NULL,
  `payment_type` varchar(50) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `price_at_that_time` varchar(100) DEFAULT NULL,
  `upi_id` varchar(100) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `reason` varchar(45) DEFAULT NULL,
  `Approved_declined_By` varchar(50) NOT NULL DEFAULT 'Not Approved',
  `bank_name` varchar(100) DEFAULT NULL,
  `ifsc_code` varchar(100) DEFAULT NULL,
  `ac_no` varchar(100) DEFAULT NULL,
  `ac_name` varchar(100) DEFAULT NULL,
  `ac_type` varchar(100) DEFAULT NULL,
  `paymethod_id` varchar(200) DEFAULT NULL,
  `cypto` varchar(300) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `coupan` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`id`, `user_name`, `balance`, `image`, `image_path`, `transaction_id`, `payment_type`, `type`, `price_at_that_time`, `upi_id`, `status`, `reason`, `Approved_declined_By`, `bank_name`, `ifsc_code`, `ac_no`, `ac_name`, `ac_type`, `paymethod_id`, `cypto`, `currency`, `coupan`, `date`) VALUES
(66, '8690708302', '100', 'image-1732015066872-743401510.png', 'assets/img/', '826385273834', 'Deposit', 'Bank', NULL, NULL, 'Success', NULL, 'Superadmin', 'SBIN', 'SBIN0idmco', '757491445273', 'Sparrow Task', 'Saving', NULL, NULL, NULL, NULL, '2024-11-19 11:17:46'),
(67, '8690708302', '100', 'image-1732015158788-213542693.png', 'assets/img/', '826385273834', 'Deposit', 'UPI', NULL, '9999999998@ybl', 'Success', NULL, 'Superadmin', NULL, NULL, NULL, 'Sparrow Task', '', NULL, NULL, NULL, NULL, '2024-11-19 11:19:18'),
(68, '8690708302', '10', 'image-1732015196788-992683254.png', 'assets/img/', '14286559b6bbc38276b4ce342d5b12201799de6589660e21b8', 'Deposit', 'USDT', '82.4', NULL, 'Success', NULL, 'Superadmin', NULL, NULL, NULL, NULL, '', NULL, '14286559b6bbc38276b4ce342d5b12201799de6589660e21b81cb22ea129d7d7', 'TRC20 USDT', NULL, '2024-11-19 11:19:56'),
(69, '8690708302', '100', 'image-1732015513799-640023400.png', 'assets/img/', '826385273834', 'Deposit', 'Bank', NULL, NULL, 'Cancelled', 'some', 'Superadmin', 'SBIN', 'SBIN0idmco', '757491445273', 'Sparrow Task', 'Saving', NULL, NULL, NULL, NULL, '2024-11-19 11:25:13'),
(70, '8690708302', '100', 'image-1732015551890-477096249.png', 'assets/img/', '826385273834', 'Deposit', 'Bank', NULL, NULL, 'Success', NULL, 'Superadmin', 'SBIN', 'SBIN0idmco', '757491445273', 'Sparrow Task', 'Saving', NULL, NULL, NULL, NULL, '2024-11-19 11:25:51'),
(71, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Success', NULL, 'Superadmin', 'IOAB', 'DFjj0sdsjwe', '280102382348734', 'sudhanhu', 'Saving', NULL, NULL, NULL, NULL, '2024-11-19 11:30:05'),
(72, '8690708302', '10', NULL, NULL, NULL, 'Withdrawal', 'USDT', '82.4', NULL, 'Cancelled', 'some', 'Superadmin', NULL, NULL, NULL, NULL, '', NULL, '14286559b6bbc38276b4ce342d5b12201799de6589660e21b81cb22ea129d7d7', 'TRC20 USDT', NULL, '2024-11-19 11:33:33'),
(73, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Success', NULL, 'Superadmin', 'IOAB', 'DFjj0sdsjwe', '280102382348734', 'sudhanhu', 'Saving', NULL, NULL, NULL, NULL, '2024-11-20 05:50:32'),
(74, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Cancelled', 'some', 'Superadmin', 'IOAB', 'DFjj0sdsjwe', '280102382348734', 'sudhanhu', 'Saving', NULL, NULL, NULL, NULL, '2024-11-20 06:07:11'),
(75, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Cancelled', 'some', 'Superadmin', 'IOAB', 'DFjj0sdsjwe', '280102382348734', 'sudhanhu', 'Saving', NULL, NULL, NULL, NULL, '2024-11-20 06:07:41'),
(76, '8690708302', '1000', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Success', NULL, 'Superadmin', 'kotak mahindra', 'IOBA0002801', '34523454434', 'TARUN', 'Current', NULL, NULL, NULL, NULL, '2024-11-20 06:30:09'),
(77, '8690708302', '10000', 'image-1732084496947-640285069.png', 'assets/img/', '826385273834', 'Deposit', 'Bank', NULL, NULL, 'Success', 'SOME', 'Superadmin', 'SBIN', 'SBIN0idmco', '757491445273', 'Sparrow Task', 'Saving', NULL, NULL, NULL, NULL, '2024-11-20 06:34:56'),
(78, '8690708302', '1000', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Success', NULL, 'Superadmin', 'SBI', 'SBIN0035552', '52145258745', 'TARUN', 'Current', NULL, NULL, NULL, NULL, '2024-11-20 06:41:16'),
(79, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Cancelled', 'some', 'Superadmin', 'SBI', 'SBIN0035552', '52145258745', 'TARUN', 'Saving', NULL, NULL, NULL, NULL, '2024-11-20 08:44:34'),
(80, '8690708302', '10000', 'image-1733566084024-191163911.png', 'assets/img/', '111111111111', 'Deposit', 'Bank', NULL, NULL, 'Pending', NULL, 'Not Approved', 'SBIN', 'SBIN0idmco', '757491445273', 'Sparrow Task', 'Saving', NULL, NULL, NULL, NULL, '2024-12-07 10:08:04');

-- --------------------------------------------------------

--
-- Table structure for table `game_statement`
--

CREATE TABLE `game_statement` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `bet_type` varchar(50) DEFAULT NULL,
  `game_name` varchar(100) DEFAULT NULL,
  `period` varchar(50) DEFAULT NULL,
  `Select` varchar(50) DEFAULT NULL,
  `game_type` varchar(50) DEFAULT NULL,
  `bet_balance` varchar(50) DEFAULT NULL,
  `total_balance` varchar(50) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_statement`
--

INSERT INTO `game_statement` (`id`, `username`, `bet_type`, `game_name`, `period`, `Select`, `game_type`, `bet_balance`, `total_balance`, `status`, `date`) VALUES
(37, '9794368090', 'Money Transfer', NULL, NULL, NULL, 'Received', '1000', '1000', 'Y', '2024-12-16 10:56:10'),
(38, '9794368090', 'Add Bet', 'Fast-Party', '21474883674', 'Green', 'Color-Game', '10', '990', 'Y', '2024-12-16 10:56:19'),
(39, '9794368090', 'Add Bet', 'Fast-Party', '21474883674', 'Violet', 'Color-Game', '10', '980', 'Y', '2024-12-16 10:56:21'),
(40, '9794368090', 'Win Bet', 'Fast-Party', '21474883674', 'Green', 'Color-Game', '20', '1000', 'Y', '2024-12-16 10:56:28'),
(41, '9794368090', 'Add Bet', 'Fast-Party', '21474883675', 'Violet', 'Color-Game', '10', '990', 'Y', '2024-12-16 10:56:42'),
(42, '9794368090', 'Add Bet', 'Fast-Party', '21474883675', 'Red', 'Color-Game', '10', '980', 'Y', '2024-12-16 10:56:44'),
(43, '9794368090', 'Add Bet', 'Fast-Party', '21474883675', 'Red', 'Color-Game', '100', '880', 'Y', '2024-12-16 10:56:49'),
(44, '9794368090', 'Win Bet', 'Fast-Party', '21474883675', 'Red', 'Color-Game', '20', '900', 'Y', '2024-12-16 10:56:58'),
(45, '9794368090', 'Win Bet', 'Fast-Party', '21474883675', 'Red', 'Color-Game', '200', '1100', 'Y', '2024-12-16 10:56:58'),
(46, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1000', 'Y', '2024-12-16 10:58:03'),
(47, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '112.00000000000001', '1112', 'Y', '2024-12-16 10:58:05'),
(48, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1012', 'Y', '2024-12-16 10:58:11'),
(49, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '146', '1158', 'Y', '2024-12-16 10:58:16'),
(50, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1058', 'Y', '2024-12-16 10:58:42'),
(51, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Wheel', '150', '1208', 'Y', '2024-12-16 10:58:46'),
(52, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1108', 'Y', '2024-12-16 11:01:16'),
(53, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1008', 'Y', '2024-12-16 11:01:23'),
(54, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '247.00000000000003', '1255', 'Y', '2024-12-16 11:01:32'),
(55, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1155', 'Y', '2024-12-16 11:03:48'),
(56, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1055', 'Y', '2024-12-16 11:03:52'),
(57, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '1175', 'Y', '2024-12-16 11:03:55'),
(58, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1075', 'Y', '2024-12-16 11:03:57'),
(59, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '975', 'Y', '2024-12-16 11:04:01'),
(60, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '1095', 'Y', '2024-12-16 11:04:05'),
(61, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '995', 'Y', '2024-12-16 11:04:05'),
(62, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Wheel', '150', '1145', 'Y', '2024-12-16 11:04:09'),
(63, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1045', 'Y', '2024-12-16 11:04:33'),
(64, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '247.00000000000003', '1292', 'Y', '2024-12-16 11:04:41'),
(65, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1192', 'Y', '2024-12-16 11:05:02'),
(66, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1092', 'Y', '2024-12-16 11:05:10'),
(67, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '247.00000000000003', '1339', 'Y', '2024-12-16 11:05:19'),
(68, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1239', 'Y', '2024-12-16 11:07:13'),
(69, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1139', 'Y', '2024-12-16 11:07:19'),
(70, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '495', '1634', 'Y', '2024-12-16 11:07:29'),
(71, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1534', 'Y', '2024-12-16 11:07:32'),
(72, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '619', '2153', 'Y', '2024-12-16 11:07:46'),
(73, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2053', 'Y', '2024-12-16 11:07:59'),
(74, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1953', 'Y', '2024-12-16 11:08:06'),
(75, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1853', 'Y', '2024-12-16 11:10:11'),
(76, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1753', 'Y', '2024-12-16 11:10:23'),
(77, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1653', 'Y', '2024-12-16 11:10:28'),
(78, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '354', '2007', 'Y', '2024-12-16 11:10:41'),
(79, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1969', 'Y', '2024-12-16 11:10:43'),
(80, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '112.00000000000001', '2081', 'Y', '2024-12-16 11:10:44'),
(81, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1981', 'Y', '2024-12-16 11:10:58'),
(82, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2101', 'Y', '2024-12-16 11:11:01'),
(83, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1907', 'Y', '2024-12-16 11:12:27'),
(84, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1807', 'Y', '2024-12-16 11:12:33'),
(85, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1707', 'Y', '2024-12-16 11:12:40'),
(86, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '199', '1906', 'Y', '2024-12-16 11:13:46'),
(87, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1806', 'Y', '2024-12-16 11:14:16'),
(88, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '1926', 'Y', '2024-12-16 11:14:19'),
(89, '8690708302', 'Money Transfer', NULL, NULL, NULL, 'Send', '100', '2001', 'Y', '2024-12-16 11:17:35'),
(90, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1826', 'Y', '2024-12-16 11:25:19'),
(91, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '309', '2135', 'Y', '2024-12-16 11:25:31'),
(92, '9794368090', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2035', 'Y', '2024-12-16 11:25:34'),
(93, '9794368090', 'Win Bet', NULL, NULL, NULL, 'Mines', '309', '2344', 'Y', '2024-12-16 11:25:48'),
(94, '8690708302', 'Add Bet', 'Bcone', '20302962454', 'Green', 'Color-Game', '10', '1991', 'Y', '2024-12-16 11:30:15'),
(95, '8690708302', 'Add Bet', 'Bcone', '20302962454', 'Violet', 'Color-Game', '10', '1981', 'Y', '2024-12-16 11:30:17'),
(96, '8690708302', 'Add Bet', 'Bcone', '20302962454', 'Green', 'Color-Game', '30', '1951', 'Y', '2024-12-16 11:30:20'),
(97, '8690708302', 'Add Bet', 'Fast-Party', '21474883742', 'Green', 'Color-Game', '10', '1941', 'Y', '2024-12-16 11:30:33'),
(98, '8690708302', 'Add Bet', 'Fast-Party', '21474883742', 'Violet', 'Color-Game', '10', '1931', 'Y', '2024-12-16 11:30:38'),
(99, '8690708302', 'Add Bet', 'Fast-Party', '21474883742', 'Green', 'Color-Game', '10', '1921', 'Y', '2024-12-16 11:30:42'),
(100, '8690708302', 'Win Bet', 'Bcone', '20302962454', 'Green', 'Color-Game', '20', '1941', 'Y', '2024-12-16 11:30:43'),
(101, '8690708302', 'Win Bet', 'Bcone', '20302962454', 'Green', 'Color-Game', '60', '2001', 'Y', '2024-12-16 11:30:43'),
(102, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1901', 'Y', '2024-12-16 11:33:55'),
(103, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1801', 'Y', '2024-12-16 11:33:55'),
(104, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '1921', 'Y', '2024-12-16 11:34:00'),
(105, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1821', 'Y', '2024-12-16 11:34:00'),
(106, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '150', '1971', 'Y', '2024-12-16 11:34:04'),
(107, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1871', 'Y', '2024-12-16 11:34:04'),
(108, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '1991', 'Y', '2024-12-16 11:34:09'),
(109, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1891', 'Y', '2024-12-16 11:34:09'),
(110, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2011', 'Y', '2024-12-16 11:34:09'),
(111, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1911', 'Y', '2024-12-16 11:34:11'),
(112, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2031', 'Y', '2024-12-16 11:34:13'),
(113, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1931', 'Y', '2024-12-16 11:34:13'),
(114, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2051', 'Y', '2024-12-16 11:34:16'),
(115, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1951', 'Y', '2024-12-16 11:34:16'),
(116, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2071', 'Y', '2024-12-16 11:34:19'),
(117, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1971', 'Y', '2024-12-16 11:34:20'),
(118, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2091', 'Y', '2024-12-16 11:34:25'),
(119, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1991', 'Y', '2024-12-16 11:34:25'),
(120, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2111', 'Y', '2024-12-16 11:34:30'),
(121, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2011', 'Y', '2024-12-16 11:34:30'),
(122, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2131', 'Y', '2024-12-16 11:34:32'),
(123, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2031', 'Y', '2024-12-16 11:34:32'),
(124, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2151', 'Y', '2024-12-16 11:34:34'),
(125, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2051', 'Y', '2024-12-16 11:34:34'),
(126, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2171', 'Y', '2024-12-16 11:34:37'),
(127, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2071', 'Y', '2024-12-16 11:34:37'),
(128, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2191', 'Y', '2024-12-16 11:34:40'),
(129, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2091', 'Y', '2024-12-16 11:34:41'),
(130, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2211', 'Y', '2024-12-16 11:34:46'),
(131, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2111', 'Y', '2024-12-16 11:34:46'),
(132, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2231', 'Y', '2024-12-16 11:34:49'),
(133, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2131', 'Y', '2024-12-16 11:34:49'),
(134, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2151', 'Y', '2024-12-16 11:34:54'),
(135, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2151', 'Y', '2024-12-16 11:34:54'),
(136, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2271', 'Y', '2024-12-16 11:34:54'),
(137, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2171', 'Y', '2024-12-16 11:34:55'),
(138, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2291', 'Y', '2024-12-16 11:35:00'),
(139, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2191', 'Y', '2024-12-16 11:35:00'),
(140, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2091', 'Y', '2024-12-16 11:35:04'),
(141, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2231', 'Y', '2024-12-16 11:35:10'),
(142, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2231', 'Y', '2024-12-16 11:35:10'),
(143, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2231', 'Y', '2024-12-16 11:35:10'),
(144, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2131', 'Y', '2024-12-16 11:35:10'),
(145, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2251', 'Y', '2024-12-16 11:35:14'),
(146, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2151', 'Y', '2024-12-16 11:35:14'),
(147, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2051', 'Y', '2024-12-16 11:35:16'),
(148, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2171', 'Y', '2024-12-16 11:35:20'),
(149, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2071', 'Y', '2024-12-16 11:35:20'),
(150, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2191', 'Y', '2024-12-16 11:35:25'),
(151, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2091', 'Y', '2024-12-16 11:35:25'),
(152, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '150', '2241', 'Y', '2024-12-16 11:35:27'),
(153, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2141', 'Y', '2024-12-16 11:35:27'),
(154, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2261', 'Y', '2024-12-16 11:35:30'),
(155, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2161', 'Y', '2024-12-16 11:35:31'),
(156, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2061', 'Y', '2024-12-16 11:35:34'),
(157, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2181', 'Y', '2024-12-16 11:35:39'),
(158, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2081', 'Y', '2024-12-16 11:35:39'),
(159, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2201', 'Y', '2024-12-16 11:35:42'),
(160, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2101', 'Y', '2024-12-16 11:35:42'),
(161, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2001', 'Y', '2024-12-16 11:35:45'),
(162, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2121', 'Y', '2024-12-16 11:35:49'),
(163, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2021', 'Y', '2024-12-16 11:35:49'),
(164, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '150', '2171', 'Y', '2024-12-16 11:35:55'),
(165, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1971', 'Y', '2024-12-16 11:35:55'),
(166, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1971', 'Y', '2024-12-16 11:35:55'),
(167, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '150', '2121', 'Y', '2024-12-16 11:35:59'),
(168, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2021', 'Y', '2024-12-16 11:35:59'),
(169, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2141', 'Y', '2024-12-16 11:36:03'),
(170, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2041', 'Y', '2024-12-16 11:36:03'),
(171, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1941', 'Y', '2024-12-16 11:36:05'),
(172, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2061', 'Y', '2024-12-16 11:36:09'),
(173, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1961', 'Y', '2024-12-16 11:36:09'),
(174, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1861', 'Y', '2024-12-16 11:36:12'),
(175, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1761', 'Y', '2024-12-16 11:36:17'),
(176, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1989', 'Y', '2024-12-16 11:36:17'),
(177, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '1889', 'Y', '2024-12-16 11:36:17'),
(178, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1889', 'Y', '2024-12-16 11:36:17'),
(179, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1997', 'Y', '2024-12-16 11:36:18'),
(180, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1897', 'Y', '2024-12-16 11:36:18'),
(181, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2017', 'Y', '2024-12-16 11:36:19'),
(182, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1917', 'Y', '2024-12-16 11:36:19'),
(183, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1817', 'Y', '2024-12-16 11:36:20'),
(184, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1925', 'Y', '2024-12-16 11:36:20'),
(185, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2033', 'Y', '2024-12-16 11:36:22'),
(186, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1933', 'Y', '2024-12-16 11:36:22'),
(187, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2053', 'Y', '2024-12-16 11:36:22'),
(188, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1953', 'Y', '2024-12-16 11:36:22'),
(189, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2061', 'Y', '2024-12-16 11:36:24'),
(190, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1961', 'Y', '2024-12-16 11:36:24'),
(191, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2189', 'Y', '2024-12-16 11:36:26'),
(192, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2189', 'Y', '2024-12-16 11:36:26'),
(193, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1989', 'Y', '2024-12-16 11:36:26'),
(194, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1989', 'Y', '2024-12-16 11:36:26'),
(195, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2097', 'Y', '2024-12-16 11:36:28'),
(196, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1997', 'Y', '2024-12-16 11:36:28'),
(197, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2117', 'Y', '2024-12-16 11:36:31'),
(198, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1917', 'Y', '2024-12-16 11:36:31'),
(199, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1917', 'Y', '2024-12-16 11:36:31'),
(200, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2025', 'Y', '2024-12-16 11:36:32'),
(201, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1925', 'Y', '2024-12-16 11:36:32'),
(202, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2153', 'Y', '2024-12-16 11:36:34'),
(203, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2153', 'Y', '2024-12-16 11:36:34'),
(204, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2053', 'Y', '2024-12-16 11:36:34'),
(205, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1953', 'Y', '2024-12-16 11:36:34'),
(206, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2061', 'Y', '2024-12-16 11:36:36'),
(207, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1961', 'Y', '2024-12-16 11:36:36'),
(208, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2081', 'Y', '2024-12-16 11:36:36'),
(209, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1981', 'Y', '2024-12-16 11:36:36'),
(210, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1881', 'Y', '2024-12-16 11:36:41'),
(211, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2217', 'Y', '2024-12-16 11:36:41'),
(212, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2217', 'Y', '2024-12-16 11:36:41'),
(213, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2217', 'Y', '2024-12-16 11:36:41'),
(214, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2017', 'Y', '2024-12-16 11:36:41'),
(215, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2017', 'Y', '2024-12-16 11:36:41'),
(216, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2125', 'Y', '2024-12-16 11:36:42'),
(217, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2025', 'Y', '2024-12-16 11:36:42'),
(218, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2361', 'Y', '2024-12-16 11:36:46'),
(219, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2361', 'Y', '2024-12-16 11:36:46'),
(220, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2361', 'Y', '2024-12-16 11:36:46'),
(221, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2061', 'Y', '2024-12-16 11:36:46'),
(222, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2061', 'Y', '2024-12-16 11:36:46'),
(223, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2061', 'Y', '2024-12-16 11:36:46'),
(224, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1961', 'Y', '2024-12-16 11:36:47'),
(225, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2069', 'Y', '2024-12-16 11:36:48'),
(226, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1969', 'Y', '2024-12-16 11:36:48'),
(227, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2197', 'Y', '2024-12-16 11:36:52'),
(228, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2197', 'Y', '2024-12-16 11:36:52'),
(229, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1997', 'Y', '2024-12-16 11:36:52'),
(230, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1997', 'Y', '2024-12-16 11:36:52'),
(231, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2105', 'Y', '2024-12-16 11:36:52'),
(232, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2005', 'Y', '2024-12-16 11:36:52'),
(233, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2233', 'Y', '2024-12-16 11:36:54'),
(234, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2233', 'Y', '2024-12-16 11:36:54'),
(235, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2033', 'Y', '2024-12-16 11:36:54'),
(236, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2033', 'Y', '2024-12-16 11:36:54'),
(237, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2141', 'Y', '2024-12-16 11:36:56'),
(238, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2041', 'Y', '2024-12-16 11:36:56'),
(239, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Wheel', '120', '2161', 'Y', '2024-12-16 11:36:57'),
(240, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '2061', 'Y', '2024-12-16 11:36:57'),
(241, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2169', 'Y', '2024-12-16 11:36:58'),
(242, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '2069', 'Y', '2024-12-16 11:36:58'),
(243, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2285', 'Y', '2024-12-16 11:37:02'),
(244, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2285', 'Y', '2024-12-16 11:37:02'),
(245, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1985', 'Y', '2024-12-16 11:37:02'),
(246, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1985', 'Y', '2024-12-16 11:37:02'),
(247, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1985', 'Y', '2024-12-16 11:37:02'),
(248, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1885', 'Y', '2024-12-16 11:37:07'),
(249, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2101', 'Y', '2024-12-16 11:37:07'),
(250, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '2101', 'Y', '2024-12-16 11:37:07'),
(251, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1901', 'Y', '2024-12-16 11:37:07'),
(252, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1901', 'Y', '2024-12-16 11:37:07'),
(253, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1601', 'Y', '2024-12-16 11:37:12'),
(254, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1601', 'Y', '2024-12-16 11:37:12'),
(255, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1601', 'Y', '2024-12-16 11:37:12'),
(256, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1817', 'Y', '2024-12-16 11:37:12'),
(257, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1817', 'Y', '2024-12-16 11:37:12'),
(258, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1617', 'Y', '2024-12-16 11:37:12'),
(259, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1617', 'Y', '2024-12-16 11:37:12'),
(260, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1725', 'Y', '2024-12-16 11:37:16'),
(261, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1525', 'Y', '2024-12-16 11:37:16'),
(262, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Wheel', '100', '1525', 'Y', '2024-12-16 11:37:16'),
(263, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1425', 'Y', '2024-12-16 11:37:16'),
(264, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1533', 'Y', '2024-12-16 11:37:18'),
(265, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1433', 'Y', '2024-12-16 11:37:18'),
(266, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1541', 'Y', '2024-12-16 11:37:20'),
(267, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1441', 'Y', '2024-12-16 11:37:20'),
(268, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1449', 'Y', '2024-12-16 11:37:22'),
(269, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1449', 'Y', '2024-12-16 11:37:22'),
(270, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1665', 'Y', '2024-12-16 11:37:27'),
(271, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1565', 'Y', '2024-12-16 11:37:27'),
(272, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1565', 'Y', '2024-12-16 11:37:27'),
(273, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1465', 'Y', '2024-12-16 11:37:27'),
(274, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1573', 'Y', '2024-12-16 11:37:28'),
(275, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1473', 'Y', '2024-12-16 11:37:28'),
(276, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1581', 'Y', '2024-12-16 11:37:30'),
(277, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1481', 'Y', '2024-12-16 11:37:30'),
(278, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1381', 'Y', '2024-12-16 11:37:32'),
(279, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1281', 'Y', '2024-12-16 11:37:35'),
(280, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1389', 'Y', '2024-12-16 11:37:35'),
(281, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1497', 'Y', '2024-12-16 11:37:40'),
(282, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1297', 'Y', '2024-12-16 11:37:40'),
(283, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1297', 'Y', '2024-12-16 11:37:40'),
(284, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1405', 'Y', '2024-12-16 11:37:40'),
(285, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1305', 'Y', '2024-12-16 11:37:40'),
(286, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1205', 'Y', '2024-12-16 11:37:42'),
(287, '8690708302', 'Win Bet', NULL, NULL, NULL, 'Mines', '108', '1313', 'Y', '2024-12-16 11:37:45'),
(288, '8690708302', 'Add Bet', NULL, NULL, NULL, 'Mines', '100', '1213', 'Y', '2024-12-16 11:37:45');

-- --------------------------------------------------------

--
-- Table structure for table `investment_plans`
--

CREATE TABLE `investment_plans` (
  `id` int(11) NOT NULL,
  `plan_name` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `times` varchar(200) NOT NULL,
  `percentage` varchar(200) NOT NULL,
  `day_count` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `investment_plans`
--

INSERT INTO `investment_plans` (`id`, `plan_name`, `title`, `times`, `percentage`, `day_count`, `status`, `date`) VALUES
(1, 'Daily', 'Days', '10', '8', '10', 'Y', '2024-09-04 06:10:32'),
(2, 'Weekly', 'Weeks', '6', '12', '42', 'Y', '2024-09-04 06:11:05'),
(3, 'Monthly', 'Months', '4', '15', '120', 'Y', '2024-09-04 06:11:52'),
(4, 'Quatarly', 'Quatars', '2', '18', '180', 'Y', '2024-09-04 06:27:02');

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `name`, `price`, `date`) VALUES
(1, '1', '30', '2024-04-30 04:10:54'),
(2, '2', '20', '2024-04-30 04:11:04'),
(3, '3', '10', '2024-04-30 04:11:18');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_active` varchar(1) NOT NULL DEFAULT 'N',
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `name`, `username`, `password`, `is_active`, `status`, `date`) VALUES
(14, 'Kumar Ji', 'Superadmin', '$2b$12$JZZL/FuFOD.ibnxlComhVuWe7YzDq1zswgezphrzLk.Auq1wLuqGW', 'Y', 'Y', '2022-07-29 00:02:44'),
(15, 'testing', 'test', '$2b$10$mh/WZV1LwVEnxzoTa5rKiuUOZT2urb81itGLIV73yiJ/rAgmwSHDi', 'N', 'Y', '2023-03-03 06:05:15'),
(17, 'Yuraj', 'yuvraj', '$2b$10$OJmDoC92JBsR4oD9V3uxFuBNoTDP.6OO6pXQBi3HCFlNP8qvlUt9G', 'N', 'Y', '2024-11-25 06:10:21');

-- --------------------------------------------------------

--
-- Table structure for table `login_check`
--

CREATE TABLE `login_check` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `token` varchar(1000) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_check`
--

INSERT INTO `login_check` (`id`, `user_name`, `token`, `date`) VALUES
(1, '8690708302', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijg2OTA3MDgzMDIiLCJpYXQiOjE3MzQzNTEzMzAsImV4cCI6MTczNDQzNzczMH0.W5hsLTOIHSD02Ru5ZFRPFR3TUjZdvFdoUZoqYP0ysEA', '2024-11-23 09:01:36'),
(2, '8690708301', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijg2OTA3MDgzMDEiLCJpYXQiOjE3MzQzNTE4NTUsImV4cCI6MTczNDQzODI1NX0.OIwXDk13gmj7sYx30zyHiPu3cp86iH5uGso5UzMLcRI', '2024-12-10 11:21:10'),
(3, '9794368090', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijk3OTQzNjgwOTAiLCJpYXQiOjE3MzQzNTA0MjIsImV4cCI6MTczNDQzNjgyMn0.0o3PfffmNLe7MvW1gvBLxvxrz1HJj2XF7oz9kYluuMM', '2024-12-16 07:00:47');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `id` int(11) NOT NULL,
  `module_name` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `toggle` varchar(50) NOT NULL DEFAULT 'true',
  `child` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `module_name`, `url`, `status`, `toggle`, `child`, `date`) VALUES
(1, 'Dashboard', '/home/dashboard', 'Y', 'true', NULL, '2022-07-26 05:55:10'),
(13, 'module', '/home/module', 'Y', 'true', NULL, '2022-07-26 05:55:10'),
(18, 'role', '/home/role', 'Y', 'true', NULL, '2022-08-03 00:44:23'),
(20, 'activity mapping', '/home/activity-mapping', 'Y', 'true', NULL, '2022-08-05 00:35:20'),
(28, 'User Details', '/home/user-details', 'Y', 'true', NULL, '2022-10-19 05:26:14'),
(30, 'Sub-Admin', '/home/sub-admin', 'Y', 'true', NULL, '2023-02-16 09:55:26'),
(44, 'Deposit', '/home/deposit', 'Y', 'true', NULL, '2024-09-11 09:48:44'),
(45, 'withdrawal', '/home/withdrawal', 'Y', 'true', NULL, '2024-09-11 09:51:22'),
(46, 'Investment-Plan', '/home/investment-plan', 'Y', 'true', NULL, '2024-09-12 10:23:33'),
(47, 'User-Bank', '/home/user-bank', 'Y', 'true', NULL, '2024-09-30 11:42:53'),
(48, 'Payment Details', '/home/payment-details', 'Y', 'true', NULL, '2024-11-22 05:26:44'),
(49, 'Wagering', '/home/wagering', 'Y', 'true', NULL, '2024-12-03 09:06:27'),
(50, 'Reffer Bonus', '/home/reffer-bonus', 'Y', 'true', NULL, '2024-12-14 06:51:36');

-- --------------------------------------------------------

--
-- Table structure for table `new_investment_plan`
--

CREATE TABLE `new_investment_plan` (
  `id` int(11) NOT NULL,
  `plan_name` varchar(200) NOT NULL,
  `amount_start` varchar(100) NOT NULL,
  `amount_end` varchar(100) NOT NULL,
  `retrun_percentage` varchar(10) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `new_investment_plan`
--

INSERT INTO `new_investment_plan` (`id`, `plan_name`, `amount_start`, `amount_end`, `retrun_percentage`, `status`, `date`) VALUES
(1, 'VIP1', '1', '50', '0.5', 'Y', '2024-12-13 08:45:14'),
(2, 'VIP2', '51', '100', '1', 'Y', '2024-12-13 10:15:07');

-- --------------------------------------------------------

--
-- Table structure for table `new_payment_details`
--

CREATE TABLE `new_payment_details` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `upi_id` varchar(100) DEFAULT NULL,
  `qr_code` varchar(100) DEFAULT NULL,
  `number` varchar(10) DEFAULT NULL,
  `ac_no` varchar(200) DEFAULT NULL,
  `ac_type` varchar(200) DEFAULT NULL,
  `ifsc_code` varchar(200) DEFAULT NULL,
  `bank_name` varchar(200) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `new_payment_details`
--

INSERT INTO `new_payment_details` (`id`, `name`, `upi_id`, `qr_code`, `number`, `ac_no`, `ac_type`, `ifsc_code`, `bank_name`, `type`, `status`, `date`) VALUES
(4, 'Sparrow Task', NULL, NULL, NULL, '757491445273', 'Saving', 'SBIN0idmco', 'SBIN', 'Bank', 'Y', '2024-05-20 11:09:03'),
(5, 'Sparrow Task', '9999999999@ybl', 'image-1716293301327-334261957.png', '9999999999', NULL, NULL, NULL, NULL, 'UPI', 'Y', '2024-05-20 11:40:19'),
(6, 'Sparrow Task', '9999999998@ybl', 'image-1716293869510-791043490.png', '9999999998', NULL, NULL, NULL, NULL, 'UPI', 'Y', '2024-05-20 11:57:20');

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `otp` varchar(200) NOT NULL,
  `number` varchar(200) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `otp`, `number`, `date`) VALUES
(75, '$2b$12$pT1ZEQKtgxKyUxfaUEutmeJcT1xrUp8.pLl4Yb9aDgjUADk2zM8Hi', 't.soni9742@gmail.com', '2024-10-16 11:35:35'),
(76, '$2b$12$GKftMAZaA9LOKFeDEQjxeOQYpor3NNBwXv3V8Mou/pJD/VPMoJDcS', 'ts.oni9742@gmail.com', '2024-10-16 11:36:36'),
(80, '$2b$12$uRXf3ITW5v2quw4ymQkudOgRFvmRNDalN.Kxk71oYwacK56FZZP5y', 'ni@gmail.com', '2024-12-07 11:10:46');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `bgimage` varchar(100) NOT NULL,
  `minimumrebetamount` varchar(100) NOT NULL,
  `monthyreward` varchar(100) NOT NULL,
  `levelreward` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `title`, `bgimage`, `minimumrebetamount`, `monthyreward`, `levelreward`, `status`, `date`) VALUES
(1, 'VIP1', 'image-1733573651470-400981850.png', '1000', '1', '100', 'Y', '2024-12-05 10:41:24'),
(2, 'VIP2', 'image-1733397560924-364484358.png', '50000', '2', '150', 'Y', '2024-12-05 11:19:20'),
(3, 'VIP3', 'image-1733397610438-480724019.png', '100000', '3', '300', 'Y', '2024-12-05 11:20:10'),
(4, 'VIP4', 'image-1733397649605-81158423.png', '500000', '5', '500', 'Y', '2024-12-05 11:20:49');

-- --------------------------------------------------------

--
-- Table structure for table `reffer_bonus`
--

CREATE TABLE `reffer_bonus` (
  `id` int(11) NOT NULL,
  `reffer_to` varchar(100) NOT NULL,
  `reffer_by` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reffer_bonus`
--

INSERT INTO `reffer_bonus` (`id`, `reffer_to`, `reffer_by`, `status`, `date`) VALUES
(1, '100', '250', 'Y', '2024-12-14 14:21:32'),
(2, '100', '333', 'N', '2024-12-14 15:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `view` varchar(100) NOT NULL,
  `delete_d` varchar(100) NOT NULL,
  `update_d` varchar(100) NOT NULL,
  `status_d` varchar(100) NOT NULL,
  `add_d` varchar(100) DEFAULT NULL,
  `role_assign` varchar(1) NOT NULL DEFAULT 'N',
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `display_name`, `view`, `delete_d`, `update_d`, `status_d`, `add_d`, `role_assign`, `status`, `date`) VALUES
(3, 'Super Admin', 'Super Administration', 'true', 'true', 'true', 'true', 'true', 'Y', 'N', '2022-07-23 00:43:22'),
(5, 'Developer', 'For developer', 'true', 'true', 'true', 'true', 'true', 'Y', 'N', '2023-02-17 06:14:26'),
(6, 'View Admin', 'View Only', 'true', 'false', 'false', 'false', 'false', 'Y', 'N', '2023-03-01 10:36:21'),
(16, 'Yuvraj', 'Yuvraj', 'true', 'true', 'true', 'true', 'true', 'Y', 'N', '2024-11-25 06:09:27');

-- --------------------------------------------------------

--
-- Table structure for table `role_assign`
--

CREATE TABLE `role_assign` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_assign`
--

INSERT INTO `role_assign` (`id`, `user_id`, `role_id`, `status`, `date`) VALUES
(4, 14, 3, 'Y', '2023-02-16 09:07:07'),
(5, 15, 5, 'Y', '2023-03-03 06:05:15'),
(7, 17, 16, 'Y', '2024-11-25 06:10:21');

-- --------------------------------------------------------

--
-- Table structure for table `statement`
--

CREATE TABLE `statement` (
  `id` int(11) NOT NULL,
  `number` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `balance` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statement`
--

INSERT INTO `statement` (`id`, `number`, `type`, `description`, `amount`, `balance`, `date`) VALUES
(136, '8690708302', 'Money Transfer', 'Sent To ColorGame', '8800', '0', '2024-12-07 06:40:56'),
(137, '8690708302', 'Money Transfer', 'Sent To ColorGame', '40000', '60000', '2024-12-07 07:06:47'),
(138, '8690708302', 'Money Transfer', 'Received from GameWallet', '1100', '4400', '2024-12-16 05:23:57'),
(139, '8690708302', 'Money Transfer', 'Sent To GameWallet', '101', '4299', '2024-12-16 05:24:35'),
(140, '9794368090', 'Money Transfer', 'Sent To GameWallet', '1000', '9000', '2024-12-16 07:25:45'),
(141, '9794368090', 'Money Transfer', 'Sent To GameWallet', '1000', '8000', '2024-12-16 07:28:16'),
(142, '8690708302', 'Money Transfer', 'Sent To GameWallet', '1000', '3299', '2024-12-16 07:38:59'),
(143, '8690708302', 'Money Transfer', 'Sent To GameWallet', '1000', '2299', '2024-12-16 07:56:14'),
(144, '8690708302', 'Money Transfer', 'Sent To GameWallet', '100', '2199', '2024-12-16 10:17:07'),
(145, '8690708302', 'Money Transfer', 'Sent To GameWallet', '101', '2098', '2024-12-16 10:19:32'),
(146, '8690708302', 'Money Transfer', 'Received from GameWallet', '100', '2198', '2024-12-16 10:21:43'),
(147, '8690708302', 'Money Transfer', 'Received from GameWallet', '102', '2300', '2024-12-16 10:25:26'),
(148, '8690708302', 'Money Transfer', 'Sent To GameWallet', '1000', '1300', '2024-12-16 10:26:02'),
(149, '9794368090', 'Money Transfer', 'Sent To GameWallet', '100', '7900', '2024-12-16 10:44:46'),
(150, '9794368090', 'Money Transfer', 'Received from GameWallet', '100', '8000', '2024-12-16 10:45:02'),
(151, '9794368090', 'Money Transfer', 'Sent To GameWallet', '1000', '7000', '2024-12-16 10:56:10'),
(152, '8690708302', 'Money Transfer', 'Received from GameWallet', '100', '1400', '2024-12-16 11:17:35');

-- --------------------------------------------------------

--
-- Table structure for table `usdt`
--

CREATE TABLE `usdt` (
  `id` int(11) NOT NULL,
  `currency` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `address` varchar(300) NOT NULL,
  `qr_code` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usdt`
--

INSERT INTO `usdt` (`id`, `currency`, `price`, `address`, `qr_code`, `status`, `date`) VALUES
(2, 'TRC20 USDT', '82.4', '14286559b6bbc38276b4ce342d5b12201799de6589660e21b81cb22ea129d7d7', 'image-1726035379957-65796751.png', 'Y', '2024-10-04 09:23:48');

-- --------------------------------------------------------

--
-- Table structure for table `userbankdeatils`
--

CREATE TABLE `userbankdeatils` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `account_no` varchar(100) NOT NULL,
  `ifsc_code` varchar(100) DEFAULT NULL,
  `account_holder_name` varchar(100) NOT NULL,
  `bankname` varchar(100) DEFAULT NULL,
  `account_type` varchar(100) DEFAULT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'P',
  `approved_or_denied_by` varchar(100) DEFAULT 'Not Approved',
  `user_reason` varchar(250) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userbankdeatils`
--

INSERT INTO `userbankdeatils` (`id`, `user_id`, `account_no`, `ifsc_code`, `account_holder_name`, `bankname`, `account_type`, `status`, `approved_or_denied_by`, `user_reason`, `reason`, `date`) VALUES
(7, '9', '52145258745', 'SBIN0035552', 'TARUN', 'SBI', 'Saving', 'Y', 'Superadmin', '', NULL, '2024-11-20 06:27:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `mobile` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pincode` varchar(100) DEFAULT NULL,
  `uid` varchar(50) NOT NULL,
  `is_active` varchar(1) NOT NULL DEFAULT 'N',
  `reffer_by` varchar(200) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `reffer_code` varchar(200) DEFAULT NULL,
  `plan_type` int(11) DEFAULT 1,
  `upi_id` varchar(100) DEFAULT NULL,
  `bank_status` varchar(1) NOT NULL DEFAULT 'N',
  `user_pin` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `purchase_date` datetime NOT NULL DEFAULT current_timestamp(),
  `plan_expire` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(1) DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `username`, `mobile`, `password`, `email`, `pincode`, `uid`, `is_active`, `reffer_by`, `position`, `reffer_code`, `plan_type`, `upi_id`, `bank_status`, `user_pin`, `date`, `purchase_date`, `plan_expire`, `status`) VALUES
(31, 'TEJPAL SONI', '8690708302', '$2b$12$VxVbYG2CIrt6gu5OI5M4a.Req5vu6dLzGhBNPriS0p.TfPju88ETa', 'TSONI9742@GMAIL.COM', NULL, '100001', 'N', '5Zw8gbwv', '0', '8IV4W9in', 1, NULL, 'N', 'Y', '2024-12-07 10:07:29', '2024-12-07 15:37:29', '2024-12-07 10:07:29', 'Y'),
(32, 'TEJPAL SONI', '8690708301', '$2b$12$bUVY1m5DfYuvF2WK5tp2M.52au1ZB8udmBc7RcCo.1RwdZTbKt5P2', 'TSONI9743@GMAIL.COM', NULL, '100002', 'N', '5Zw8gbwv', '0', 'YAXBzXNx', 1, NULL, 'N', 'Y', '2024-12-10 11:21:06', '2024-12-10 16:51:06', '2024-12-10 11:21:06', 'Y'),
(34, 'Sudhanshu Maurya', '9794368090', '$2b$12$8tXpres4G0ayvkHrCNKuI..zGPN.z5YNmdflHO2nRvskw/FlfvBdm', 'sudhanshumauryaspn@gmail.com', NULL, '100003', 'N', '5Zw8gbwv', '0', '7SJgs3Ye', 1, NULL, 'N', 'Y', '2024-12-16 07:00:32', '2024-12-16 12:30:32', '2024-12-16 07:00:32', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `user_level`
--

CREATE TABLE `user_level` (
  `id` int(11) NOT NULL,
  `user_reffral` varchar(100) DEFAULT NULL,
  `level_1` varchar(100) DEFAULT NULL,
  `level_2` varchar(100) DEFAULT NULL,
  `level_3` varchar(100) DEFAULT NULL,
  `status1` varchar(100) NOT NULL DEFAULT 'Pending',
  `status2` varchar(100) NOT NULL DEFAULT 'Pending',
  `status3` varchar(100) NOT NULL DEFAULT 'Pending',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_pin`
--

CREATE TABLE `user_pin` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pin` varchar(300) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_pin`
--

INSERT INTO `user_pin` (`id`, `user_id`, `pin`, `date`, `update_date`) VALUES
(7, 9, '$2b$12$P.XKCyK/qFWxDDQm7Hq5M.GlulNEuFaLQ7v1rQRGc9x1sg5uHjZA.', '2024-10-04 09:20:46', '2024-10-04 09:20:46'),
(8, 10, '$2b$12$aQ7/2UGuzAAbsQYMlOGvCOjfWg4dLQRWN0m9gBHDDMLojpM51PNP.', '2024-10-04 09:53:39', '2024-10-04 09:54:48'),
(9, 11, '$2b$12$o8eZExQ.5L/BfAh5HuqdIOP5SotBrDNaTGiG4T1QdSoEorwaAa0Wy', '2024-10-08 06:16:58', '2024-10-08 06:18:00'),
(10, 12, '$2b$12$lzULb/.p6g17mjqzYgX.Bul7mT52wTkh93yuESBiFZE3Gt2XZRTvy', '2024-10-14 05:47:05', '2024-10-14 05:47:05'),
(11, 13, '$2b$12$3XeNwm3ph5oc5VRJC9G8J.bKwAsguAvJa2VIDQ7W1zJGoaLCKgVQa', '2024-10-14 07:50:57', '2024-10-14 07:50:57'),
(12, 14, '$2b$12$o6xSeIZmflX1kQY93mrsguMDANVUOqlT8AnafmcHe/VXnU2SLufpO', '2024-10-14 07:56:06', '2024-10-14 07:56:06'),
(13, 16, '$2b$12$TiTWtSTLNSOeBr.65kVfd.ZMrl9hieuU.ssiUBIYsBuVWoD6SZKka', '2024-10-14 09:19:21', '2024-10-14 09:19:21'),
(14, 20, '$2b$12$dQq6p2E7g3QOTWHSgFwjUuhESFO8kG67V.6/jPY9b0tPE86vQiF.i', '2024-10-18 11:19:29', '2024-10-18 11:19:29'),
(15, 25, '$2b$12$11/VG976iTLFTOng4S1CWuqQUgPAYqTffyWMCrnGlYEET0UJvuv/6', '2024-10-22 07:05:11', '2024-10-22 07:05:11'),
(16, 24, '$2b$12$Tvlv/mnTGEc7p53HpmRkpu4lOig/Fs75gNnQSdBqdBcxBuCU1Sxpa', '2024-10-22 07:41:32', '2024-10-22 07:41:32'),
(53, 31, '$2b$12$JMLQ9g4.AewP2/7qK0t7.eQFxvUF8BKlRxIfG0EPOM6POlOqyhadm', '2024-12-07 10:07:37', '2024-12-07 10:07:37'),
(54, 32, '$2b$12$PGW.W964l7G9otLHvJI2vOQzkfreyMofduBu6Hsz9HqRqN.JqQjVG', '2024-12-10 11:21:14', '2024-12-10 11:21:14'),
(55, 34, '$2b$12$Wke9PvAMQIeXWj4urH6xo.Kpk1Ze52Dt8f9Xs0JaSI9.ybfvxL.JK', '2024-12-16 07:07:42', '2024-12-16 07:07:42');

-- --------------------------------------------------------

--
-- Table structure for table `user_reffer`
--

CREATE TABLE `user_reffer` (
  `id` int(11) NOT NULL,
  `reffer_to` varchar(100) NOT NULL,
  `reffer_by` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_sessionid`
--

CREATE TABLE `user_sessionid` (
  `id` int(11) NOT NULL,
  `userid` varchar(100) NOT NULL,
  `sessionid` varchar(300) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_sessionid`
--

INSERT INTO `user_sessionid` (`id`, `userid`, `sessionid`, `date`) VALUES
(1, '31', 'wvTJ1QewRX939ZRDATwN%2bGSM50g96HNveb6uJGR071SXD%2fNUQrtcO%2b1P5Mxxxxxx', '2024-12-09 11:50:16');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `wallet_balance` varchar(200) NOT NULL DEFAULT '0',
  `game_wallet` varchar(100) NOT NULL DEFAULT '0',
  `wagering` varchar(100) NOT NULL DEFAULT '0',
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`id`, `user_name`, `wallet_balance`, `game_wallet`, `wagering`, `status`, `date`) VALUES
(39, '8690708302', '1400', '1213', '30953', 'Y', '2024-12-07 10:07:29'),
(40, '8690708301', '0', '0', '0', 'Y', '2024-12-10 11:21:06'),
(42, '9794368090', '7000', '2344', '3020', 'Y', '2024-12-16 07:00:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents_statement`
--
ALTER TABLE `agents_statement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assign_module`
--
ALTER TABLE `assign_module`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module` (`module`),
  ADD KEY `role_x` (`role`);

--
-- Indexes for table `bet_mines`
--
ALTER TABLE `bet_mines`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gameid` (`gameid`);

--
-- Indexes for table `buy_plan`
--
ALTER TABLE `buy_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `casino_bet`
--
ALTER TABLE `casino_bet`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactiondata_Id` (`transactiondata_Id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit`
--
ALTER TABLE `deposit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_statement`
--
ALTER TABLE `game_statement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investment_plans`
--
ALTER TABLE `investment_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`username`);

--
-- Indexes for table `login_check`
--
ALTER TABLE `login_check`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `module_name` (`module_name`);

--
-- Indexes for table `new_investment_plan`
--
ALTER TABLE `new_investment_plan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plan_name` (`plan_name`);

--
-- Indexes for table `new_payment_details`
--
ALTER TABLE `new_payment_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`),
  ADD UNIQUE KEY `upi_id` (`upi_id`),
  ADD UNIQUE KEY `ac_no` (`ac_no`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title_2` (`title`),
  ADD KEY `title` (`title`);

--
-- Indexes for table `reffer_bonus`
--
ALTER TABLE `reffer_bonus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `display_name` (`display_name`);

--
-- Indexes for table `role_assign`
--
ALTER TABLE `role_assign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role` (`role_id`);

--
-- Indexes for table `statement`
--
ALTER TABLE `statement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usdt`
--
ALTER TABLE `usdt`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userbankdeatils`
--
ALTER TABLE `userbankdeatils`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_no` (`account_no`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `reffer_code_left` (`reffer_code`);

--
-- Indexes for table `user_level`
--
ALTER TABLE `user_level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_pin`
--
ALTER TABLE `user_pin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_reffer`
--
ALTER TABLE `user_reffer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_sessionid`
--
ALTER TABLE `user_sessionid`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userid` (`userid`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents_statement`
--
ALTER TABLE `agents_statement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `assign_module`
--
ALTER TABLE `assign_module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=761;

--
-- AUTO_INCREMENT for table `bet_mines`
--
ALTER TABLE `bet_mines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `buy_plan`
--
ALTER TABLE `buy_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `casino_bet`
--
ALTER TABLE `casino_bet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `game_statement`
--
ALTER TABLE `game_statement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;

--
-- AUTO_INCREMENT for table `investment_plans`
--
ALTER TABLE `investment_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `login_check`
--
ALTER TABLE `login_check`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `new_investment_plan`
--
ALTER TABLE `new_investment_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `new_payment_details`
--
ALTER TABLE `new_payment_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reffer_bonus`
--
ALTER TABLE `reffer_bonus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `role_assign`
--
ALTER TABLE `role_assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `statement`
--
ALTER TABLE `statement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `usdt`
--
ALTER TABLE `usdt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userbankdeatils`
--
ALTER TABLE `userbankdeatils`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user_level`
--
ALTER TABLE `user_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_pin`
--
ALTER TABLE `user_pin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `user_reffer`
--
ALTER TABLE `user_reffer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_sessionid`
--
ALTER TABLE `user_sessionid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assign_module`
--
ALTER TABLE `assign_module`
  ADD CONSTRAINT `module` FOREIGN KEY (`module`) REFERENCES `module` (`id`),
  ADD CONSTRAINT `role_x` FOREIGN KEY (`role`) REFERENCES `role` (`id`);

--
-- Constraints for table `role_assign`
--
ALTER TABLE `role_assign`
  ADD CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `login` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
