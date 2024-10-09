-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 07, 2024 at 06:48 AM
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
(605, 3, 1, 215, 'Y', '2024-09-30 11:43:02'),
(606, 3, 13, 216, 'Y', '2024-09-30 11:43:02'),
(607, 3, 18, 217, 'Y', '2024-09-30 11:43:02'),
(608, 3, 20, 218, 'Y', '2024-09-30 11:43:02'),
(609, 3, 28, 219, 'Y', '2024-09-30 11:43:02'),
(610, 3, 30, 220, 'Y', '2024-09-30 11:43:02'),
(611, 3, 44, 221, 'Y', '2024-09-30 11:43:02'),
(612, 3, 45, 222, 'Y', '2024-09-30 11:43:02'),
(613, 3, 46, 223, 'Y', '2024-09-30 11:43:02'),
(614, 3, 47, 224, 'Y', '2024-09-30 11:43:02');

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
  `expire_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buy_plan`
--

INSERT INTO `buy_plan` (`id`, `user_id`, `plan_id`, `amount`, `status`, `date`, `expire_date`) VALUES
(54, 9, 1, '1000', 'ongoing', '2024-10-04 09:38:47', '2024-10-14'),
(55, 9, 1, '1000', 'ongoing', '2024-10-04 09:41:41', '2024-10-14'),
(56, 9, 1, '1000', 'ongoing', '2024-10-04 09:42:31', '2024-10-14');

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
  `price_at_that_time` varchar(100) DEFAULT NULL,
  `upi_id` varchar(100) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `reason` varchar(45) DEFAULT NULL,
  `Approved_declined_By` varchar(50) NOT NULL DEFAULT 'Not Approved',
  `bank_name` varchar(100) DEFAULT NULL,
  `ifsc_code` varchar(100) DEFAULT NULL,
  `ac_no` varchar(100) DEFAULT NULL,
  `ac_name` varchar(100) DEFAULT NULL,
  `ac_type` varchar(100) NOT NULL,
  `paymethod_id` varchar(200) DEFAULT NULL,
  `cypto` varchar(300) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `coupan` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`id`, `user_name`, `balance`, `image`, `image_path`, `transaction_id`, `payment_type`, `price_at_that_time`, `upi_id`, `status`, `reason`, `Approved_declined_By`, `bank_name`, `ifsc_code`, `ac_no`, `ac_name`, `ac_type`, `paymethod_id`, `cypto`, `currency`, `coupan`, `date`) VALUES
(48, '8690708302', '10000', 'image-1728033871100-568260639.png', 'assets/img/', '523652365236', 'Deposit', NULL, NULL, 'Success', NULL, 'Superadmin', NULL, NULL, NULL, NULL, '', '5', NULL, NULL, NULL, '2024-10-04 09:24:31'),
(49, '8690708302', '100', 'image-1728035030468-71268989.png', 'assets/img/', '14286559b6bbc38276b4ce342d5b12201799de6589660e21b8', 'USDT', '82.4', NULL, 'Cancelled', 'Due to some Resaon\n', 'Superadmin', NULL, NULL, NULL, NULL, '', NULL, '14286559b6bbc38276b4ce342d5b12201799de6589660e21b81cb22ea129d7d7', 'TRC20 USDT', NULL, '2024-10-04 09:43:50'),
(50, '8690708302', '105', 'image-1728035070703-985206570.png', 'assets/img/', '14286559b6bbc38276b4ce342d5b12201799de6589660e21b8', 'USDT', '82.4', NULL, 'Success', NULL, 'Superadmin', NULL, NULL, NULL, NULL, '', NULL, '14286559b6bbc38276b4ce342d5b12201799de6589660e21b81cb22ea129d7d7', 'TRC20 USDT', NULL, '2024-10-04 09:44:30'),
(51, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', NULL, NULL, 'Cancelled', 'meri marji', 'Superadmin', 'SBI BANK', 'SBIN0031114', '52123255565', 'TEJPAL SONI', 'Saving', NULL, NULL, NULL, NULL, '2024-10-04 09:45:44'),
(52, '8690708302', '100', NULL, NULL, NULL, 'USDT', '82.4', NULL, 'Success', NULL, 'Superadmin', NULL, NULL, NULL, NULL, '', NULL, '14286559b6bbc38276b4ce342d5b12201799de6589660e21b81cb22ea129d7d7', 'TRC20 USDT', NULL, '2024-10-04 09:48:55'),
(53, '8690708302', '100', 'image-1728035361942-102764697.png', 'assets/img/', '14286559b6bbc38276b4ce342d5b12201799de6589660e21b8', 'USDT', '82.4', NULL, 'Success', NULL, 'Superadmin', NULL, NULL, NULL, NULL, '', NULL, '14286559b6bbc38276b4ce342d5b12201799de6589660e21b81cb22ea129d7d7', 'TRC20 USDT', NULL, '2024-10-04 09:49:21');

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
(15, 'testing', 'test', '$2b$10$mh/WZV1LwVEnxzoTa5rKiuUOZT2urb81itGLIV73yiJ/rAgmwSHDi', 'N', 'Y', '2023-03-03 06:05:15');

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
(47, 'User-Bank', '/home/user-bank', 'Y', 'true', NULL, '2024-09-30 11:42:53');

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
  `ac_holder_name` varchar(200) DEFAULT NULL,
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

INSERT INTO `new_payment_details` (`id`, `name`, `upi_id`, `qr_code`, `number`, `ac_holder_name`, `ac_no`, `ac_type`, `ifsc_code`, `bank_name`, `type`, `status`, `date`) VALUES
(4, 'Sparrow Task', NULL, NULL, NULL, 'Sparrow Task', '757491445273', 'Saving', 'SBIN0idmco', 'SBIN', 'Bank', 'Y', '2024-05-20 11:09:03'),
(5, 'Sparrow Task', '9999999999@ybl', 'image-1716293301327-334261957.png', '9999999999', NULL, NULL, NULL, NULL, NULL, 'UPI', 'Y', '2024-05-20 11:40:19'),
(6, 'Sparrow Task', '9999999998@ybl', 'image-1716293869510-791043490.png', '9999999998', NULL, NULL, NULL, NULL, NULL, 'UPI', 'Y', '2024-05-20 11:57:20');

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
  `role_assign` varchar(1) NOT NULL DEFAULT 'N',
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `display_name`, `view`, `delete_d`, `update_d`, `role_assign`, `status`, `date`) VALUES
(3, 'Super Admin', 'Super Administration', 'true', 'true', 'true', 'Y', 'N', '2022-07-23 00:43:22'),
(5, 'Developer', 'For developer', 'true', 'true', 'true', 'Y', 'N', '2023-02-17 06:14:26'),
(6, 'View Admin', 'View Only', 'true', 'false', 'false', 'Y', 'N', '2023-03-01 10:36:21');

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
(5, 15, 5, 'Y', '2023-03-03 06:05:15');

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
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statement`
--

INSERT INTO `statement` (`id`, `number`, `type`, `description`, `amount`, `date`) VALUES
(81, '8690708302', 'Deposit', 'Approve By Superadmin', '10000', '2024-10-04 09:30:21'),
(82, '8690708302', 'Investment', '', '1000', '2024-10-04 09:38:47'),
(83, '8690708302', 'Investment', '', '1000', '2024-10-04 09:41:41'),
(84, '8690708302', 'Investment', '', '1000', '2024-10-04 09:42:31'),
(85, '8690708302', 'Deposit', 'Approve By Superadmin', '8652', '2024-10-04 09:44:40'),
(86, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-10-04 09:45:44'),
(87, '8690708302', 'USDT', 'Withdrawal Amount Is 100 * 82 = ₹ 8200', '8200', '2024-10-04 09:48:55'),
(88, '8690708302', 'USDT', 'Approve By Superadmin', '8240', '2024-10-04 09:49:08'),
(89, '8690708302', 'Deposit', 'Approve By Superadmin', '8240', '2024-10-04 09:50:00'),
(90, '8690708302', 'Money Transfer', 'Transfer To 8690708301', '1000', '2024-10-04 09:53:35'),
(91, '8690708301', 'Money Transfer', 'Transfer from 8690708302', '1000', '2024-10-04 09:53:35'),
(92, '8690708302', 'Money Transfer', 'Sent To ColorGame', '1000', '2024-10-04 10:13:59'),
(93, '8690708301', 'Money Transfer', 'Sent To ColorGame', '1000', '2024-10-04 10:16:38');

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
(3, '9', '52123255565', 'SBIN0031114', 'TEJPAL SONI', 'SBI BANK', 'Saving', 'Y', 'Superadmin', NULL, NULL, '2024-10-04 09:45:11');

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
  `reffer_code` varchar(200) DEFAULT NULL,
  `reffer_code_left` varchar(200) DEFAULT NULL,
  `reffer_code_right` varchar(200) DEFAULT NULL,
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

INSERT INTO `user_details` (`id`, `username`, `mobile`, `password`, `email`, `pincode`, `uid`, `is_active`, `reffer_by`, `reffer_code`, `reffer_code_left`, `reffer_code_right`, `plan_type`, `upi_id`, `bank_status`, `user_pin`, `date`, `purchase_date`, `plan_expire`, `status`) VALUES
(9, 'TEJPAL SONI', '8690708302', '$2b$12$nH5gD/7TVsa7Ok5JUJ6FwuvwDPyUDaxT6S7GGeIFmNpHNX1uG9mIm', 'tsoni9742@gmail.com', NULL, '100001', 'N', '5Zw8gbwv', 'qKR2WfPY', NULL, NULL, 1, NULL, 'Y', 'Y', '2024-10-04 09:20:35', '2024-10-04 14:50:35', '2024-10-04 09:20:35', 'Y'),
(10, 'TEJPAL SONI', '8690708301', '$2b$12$y3knsi3EK5C1DrViz4ozRuVmhpUnDpd6aaxf7nIJdzFNIqO1lJsD2', 'kalof68456@chainds.com', NULL, '100002', 'N', '5Zw8gbwv', 'pmozm2oV', NULL, NULL, 1, NULL, 'N', 'Y', '2024-10-04 09:53:09', '2024-10-04 15:23:09', '2024-10-04 09:53:09', 'Y');

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
(8, 10, '$2b$12$aQ7/2UGuzAAbsQYMlOGvCOjfWg4dLQRWN0m9gBHDDMLojpM51PNP.', '2024-10-04 09:53:39', '2024-10-04 09:54:48');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `wallet_balance` varchar(200) NOT NULL DEFAULT '0',
  `winning_wallet` varchar(100) NOT NULL DEFAULT '0',
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`id`, `user_name`, `wallet_balance`, `winning_wallet`, `status`, `date`) VALUES
(9, '8690708302', '13692', '0', 'Y', '2024-10-04 09:20:35'),
(10, '8690708301', '0', '0', 'Y', '2024-10-04 09:53:09');

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
-- Indexes for table `buy_plan`
--
ALTER TABLE `buy_plan`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `module_name` (`module_name`);

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
  ADD UNIQUE KEY `reffer_code` (`reffer_code`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `reffer_code_left` (`reffer_code_left`),
  ADD UNIQUE KEY `reffer_code_right` (`reffer_code_right`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=615;

--
-- AUTO_INCREMENT for table `buy_plan`
--
ALTER TABLE `buy_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `new_payment_details`
--
ALTER TABLE `new_payment_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `role_assign`
--
ALTER TABLE `role_assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `statement`
--
ALTER TABLE `statement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `usdt`
--
ALTER TABLE `usdt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userbankdeatils`
--
ALTER TABLE `userbankdeatils`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_level`
--
ALTER TABLE `user_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_pin`
--
ALTER TABLE `user_pin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
