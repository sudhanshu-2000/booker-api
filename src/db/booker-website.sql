-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 21, 2024 at 10:10 AM
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
-- Database: `kmaobharat_booker`
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
(615, 3, 1, 215, 'Y', '2024-11-14 05:16:04'),
(616, 3, 18, 216, 'Y', '2024-11-14 05:16:04'),
(617, 3, 20, 217, 'Y', '2024-11-14 05:16:04'),
(618, 3, 28, 218, 'Y', '2024-11-14 05:16:04'),
(619, 3, 30, 219, 'Y', '2024-11-14 05:16:04'),
(620, 3, 44, 220, 'Y', '2024-11-14 05:16:04'),
(621, 3, 45, 221, 'Y', '2024-11-14 05:16:04'),
(622, 3, 46, 222, 'Y', '2024-11-14 05:16:04'),
(623, 3, 47, 223, 'Y', '2024-11-14 05:16:04');

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
(56, 9, 1, '1000', 'ongoing', '2024-10-04 09:42:31', '2024-10-14'),
(57, 16, 1, '1000', 'ongoing', '2024-10-14 09:57:36', '2024-10-24'),
(58, 9, 1, '100', 'ongoing', '2024-10-23 06:31:48', '2024-11-02'),
(59, 10, 2, '1000', 'ongoing', '2024-11-04 08:38:42', '2024-11-30');

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
(77, '8690708302', '10000', 'image-1732084496947-640285069.png', 'assets/img/', '826385273834', 'Deposit', 'Bank', NULL, NULL, 'Cancelled', 'SOME', 'Superadmin', 'SBIN', 'SBIN0idmco', '757491445273', 'Sparrow Task', 'Saving', NULL, NULL, NULL, NULL, '2024-11-20 06:34:56'),
(78, '8690708302', '1000', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Success', NULL, 'Superadmin', 'SBI', 'SBIN0035552', '52145258745', 'TARUN', 'Current', NULL, NULL, NULL, NULL, '2024-11-20 06:41:16'),
(79, '8690708302', '100', NULL, NULL, NULL, 'Withdrawal', 'Bank', NULL, NULL, 'Cancelled', 'Tere ko nhi dunga\n', 'Superadmin', 'SBI', 'SBIN0035552', '52145258745', 'TARUN', 'Saving', NULL, NULL, NULL, NULL, '2024-11-20 08:44:34');

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
(76, '$2b$12$GKftMAZaA9LOKFeDEQjxeOQYpor3NNBwXv3V8Mou/pJD/VPMoJDcS', 'ts.oni9742@gmail.com', '2024-10-16 11:36:36');

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
(6, 'View Admin', 'View Only', 'true', 'false', 'false', 'false', 'false', 'Y', 'N', '2023-03-01 10:36:21');

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
(93, '8690708301', 'Money Transfer', 'Sent To ColorGame', '1000', '2024-10-04 10:16:38'),
(94, '8690708302', 'Money Transfer', 'Received from ColorGame', '100', '2024-10-08 05:20:31'),
(95, '9876543210', 'Deposit', 'Approve By Superadmin', '82400', '2024-10-14 09:23:04'),
(96, '9876543210', 'Investment', '', '1000', '2024-10-14 09:57:36'),
(97, '8690708302', 'Money Transfer', 'Sent To ColorGame', '1000', '2024-10-14 12:34:02'),
(98, '8690708302', 'Money Transfer', 'Sent To ColorGame', '100', '2024-10-15 10:26:37'),
(99, '8690708302', 'Investment', '', '100', '2024-10-23 06:31:48'),
(100, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-11-13 07:59:20'),
(101, '8690708302', 'Withdrawal', 'Approve By Superadmin', '100', '2024-11-18 12:00:03'),
(102, '8690708302', 'Deposit', 'Approve By Superadmin', '100', '2024-11-19 09:28:48'),
(103, '8690708302', 'Deposit', 'Approve By Superadmin', '100', '2024-11-19 10:26:37'),
(104, '8690708302', 'Deposit', 'Approve By Superadmin', '824', '2024-11-19 10:32:27'),
(105, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-11-19 10:43:56'),
(106, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-11-19 10:54:33'),
(107, '8690708302', 'Withdrawal', 'Approve By Superadmin', '100', '2024-11-19 10:59:23'),
(108, '8690708302', 'USDT', 'Withdrawal Amount Is 10 * 82 = ₹ 820', '820', '2024-11-19 10:59:31'),
(109, '8690708302', 'Deposit', 'Decliend By Superadmin', '824', '2024-11-19 11:13:44'),
(110, '8690708302', 'USDT', 'Withdrawal Amount Is 10 * 82 = ₹ 820', '820', '2024-11-19 11:14:23'),
(111, '8690708302', 'Deposit', 'Approve By Superadmin', '100', '2024-11-19 11:18:17'),
(112, '8690708302', 'Deposit', 'Approve By Superadmin', '100', '2024-11-19 11:19:47'),
(113, '8690708302', 'Deposit', 'Approve By Superadmin', '10', '2024-11-19 11:24:55'),
(114, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-11-19 11:30:05'),
(115, '8690708302', 'Withdrawal', 'Approve By Superadmin', '100', '2024-11-19 11:33:24'),
(116, '8690708302', 'USDT', 'Withdrawal Amount Is 10 * 82 = ₹ 820', '820', '2024-11-19 11:33:33'),
(117, '8690708302', 'Deposit', 'Decliend By Superadmin', '10', '2024-11-20 05:45:08'),
(118, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-11-20 05:50:32'),
(119, '8690708302', 'Withdrawal', 'Approve By Superadmin', '100', '2024-11-20 06:07:03'),
(120, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-11-20 06:07:11'),
(121, '8690708302', 'Deposit', 'Decliend By Superadmin', '100', '2024-11-20 06:07:22'),
(122, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-11-20 06:07:41'),
(123, '8690708302', 'Deposit', 'Decliend By Superadmin', '100', '2024-11-20 06:09:43'),
(124, '8690708302', 'Deposit', 'Approve By Superadmin', '100', '2024-11-20 06:09:54'),
(125, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 1000 ', '1000', '2024-11-20 06:30:09'),
(126, '8690708302', 'Withdrawal', 'Approve By Superadmin', '1000', '2024-11-20 06:33:39'),
(127, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 1000 ', '1000', '2024-11-20 06:41:16'),
(128, '8690708302', 'Withdrawal', 'Approve By Superadmin', '1000', '2024-11-20 07:51:51'),
(129, '8690708302', 'Withdrawal', 'Withdrawal Amount Is ₹ 100 ', '100', '2024-11-20 08:44:34'),
(130, '8690708302', 'Deposit', 'Decliend By Superadmin', '100', '2024-11-20 08:50:20'),
(131, '8690708302', 'Money Transfer', 'Sent To ColorGame', '1000', '2024-11-21 06:33:31'),
(132, '8690708302', 'Money Transfer', 'Received from ColorGame', '100', '2024-11-21 06:33:46');

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
(9, 'TEJPAL SONI', '8690708302', '$2b$12$T/LOdHDu.jC8HbZ9R5nBje7lhizFPTA5J8yLs9yKazPJ7SWFywZAm', 'tsoni9742@gmail.com', NULL, '100001', 'N', '5Zw8gbwv', 'L', 'pqz0HTRT', 1, NULL, 'Y', 'Y', '2024-10-04 09:20:35', '2024-10-04 14:50:35', '2024-10-04 09:20:35', 'Y'),
(10, 'TEJPAL SONI', '8690708301', '$2b$12$y3knsi3EK5C1DrViz4ozRuVmhpUnDpd6aaxf7nIJdzFNIqO1lJsD2', 'kalof68456@chainds.com', NULL, '100002', 'N', 'pqz0HTRT', 'L', '64HggQtD', 1, NULL, 'N', 'Y', '2024-10-04 09:53:09', '2024-10-04 15:23:09', '2024-10-04 09:53:09', 'Y'),
(11, 'tarun new', '8690708300', '$2b$12$OlLr0ifq93lkRDJJjugGbeQKwSvLl6Lzl9IAJ.2ZlJysfyDQSwqGG', 'tomik70880@adambra.com', NULL, '100003', 'N', 'pqz0HTRT', 'R', '1C4Fh5Rf', 1, NULL, 'N', 'Y', '2024-10-08 06:16:40', '2024-10-08 11:46:40', '2024-10-08 06:16:40', 'Y'),
(12, 'TEJPAL SONI', '8690708309', '$2b$12$IvhjC9RRBtwIhxD/WanEge4EvBIKQLWOEGeUOQFbsVoF2Hwye5LI.', 'tsoni974222@gmail.com', NULL, '100004', 'N', '1C4Fh5Rf', 'R', 'afyjRqst', 1, NULL, 'N', 'Y', '2024-10-14 05:45:03', '2024-10-14 11:15:03', '2024-10-14 05:45:03', 'Y'),
(13, 'TEJPAL SONI', '1111111111', '$2b$12$ttm1gtFdthWC8qJ5eAfb9O.IVNJdBRiWkXIARzoXfLKaoBORGcREG', 'shdfiuh@gmail.com', NULL, '100005', 'N', 'pqz0HTRT', 'L', 'KdXy71om', 1, NULL, 'N', 'Y', '2024-10-14 05:47:52', '2024-10-14 11:17:52', '2024-10-14 05:47:52', 'Y'),
(14, 'nEW', '2222222222', '$2b$12$k3cs2NIECd4zMlGdvMIULOUBH2crqozbIaTHElBx0e7H4r2Po1Egi', 'hhh@gmail.com', NULL, '100006', 'N', 'KdXy71om', 'L', 'gZtlf1r6', 1, NULL, 'N', 'Y', '2024-10-14 07:54:59', '2024-10-14 13:24:59', '2024-10-14 07:54:59', 'Y'),
(15, 'tarun new', '3333333333', '$2b$12$BYMQ16DYOYtJtdlXdVFER.ikcp2Kzaxd./nEtSaAXNs03cRBcWCrO', 'dfa@gmail.com', NULL, '100007', 'N', 'pqz0HTRT', 'R', 'G3DaLyP0', 1, NULL, 'N', 'N', '2024-10-14 07:56:44', '2024-10-14 13:26:44', '2024-10-14 07:56:44', 'Y'),
(16, 'Tarun Soni', '9876543210', '$2b$12$GuoIAnpWRFYWVnwAWS6OluyvvgI3q5rkjoc0TzrfMlI/onNEEkuCe', 'tarun@gmail.com', NULL, '100008', 'N', 'KdXy71om', 'R', '9FezZgcN', 1, NULL, 'N', 'Y', '2024-10-14 09:17:39', '2024-10-14 14:47:39', '2024-10-14 09:17:39', 'Y'),
(17, 'TEJPAL SONI', '6666666666', '$2b$12$kd7bcrRLwEjjnmUlfwB.0.A2ZAxN/2sU8Sot7oo1vojHNcL5uSHXC', 'iyh@gmail.com', NULL, '100009', 'N', 'pqz0HTRT', 'L', '2X7g8bDa', 1, NULL, 'N', 'N', '2024-10-15 10:03:53', '2024-10-15 15:33:53', '2024-10-15 10:03:53', 'Y'),
(18, 'Try One', '9998887776', '$2b$12$mcSl4h6T8MwgKSA5p.wJhe88F.x9AL1GLwP.7qu1Kr/VGNpwQTs8q', 'newOn@gmail.com', NULL, '100010', 'N', 'afyjRqst', 'R', 'EuHSenYd', 1, NULL, 'N', 'N', '2024-10-17 07:19:11', '2024-10-17 12:49:11', '2024-10-17 07:19:11', 'Y'),
(19, 'Left', '9632587412', '$2b$12$fPawdBhHpFP8kVZoi9mvreQUT03JUFdImii6Fy2.JfhkP0u/DbBpe', 'new2254@gmail.com', NULL, '100011', 'N', 'pqz0HTRT', 'L', 'plzObT7J', 1, NULL, 'N', 'N', '2024-10-17 07:51:41', '2024-10-17 13:21:41', '2024-10-17 07:51:41', 'Y'),
(20, 'GOD', '9632656985', '$2b$12$m.7X/QC5cxTpGe9YfbS1Q.DxCXsd.9OuPz/VIs9Z68UQXFXIB8ujq', 'GOD@GMAIL.COM', NULL, '100012', 'N', 'pqz0HTRT', 'L', 'hjKY7fxJ', 1, NULL, 'N', 'Y', '2024-10-18 11:05:35', '2024-10-18 16:35:35', '2024-10-18 11:05:35', 'Y'),
(21, 'user', '9587412563', '$2b$12$PXFDwCk55qHY7oVjNo3Y7O0pRxdATG7deE.qC1Kl.XKRzhvhwSlB2', 'user@gmail.com', NULL, '100013', 'N', 'hjKY7fxJ', 'L', 'Zf2sXnzb', 1, NULL, 'N', 'N', '2024-10-18 11:20:06', '2024-10-18 16:50:06', '2024-10-18 11:20:06', 'Y'),
(22, 'TEJPAL SONI', '9658745896', '$2b$12$QWi6eWns6DGvJDl8TTFT.OqHmcDY.pvBAoLhRvDuO/UPva9v5bE/S', 'newjjj@gmail.com', NULL, '100014', 'N', 'hjKY7fxJ', 'R', 'GmRZY4n2', 1, NULL, 'N', 'N', '2024-10-18 11:20:48', '2024-10-18 16:50:48', '2024-10-18 11:20:48', 'Y'),
(23, 'Left', '9658745899', '$2b$12$./ER2ihKov1zAUtfTzIeZeH5jmAimTsFJWPpM6uMgtFufzfyUNknO', 'hdsjh@gmail.com', NULL, '100015', 'N', 'hjKY7fxJ', 'L', 'NfazBka8', 1, NULL, 'N', 'N', '2024-10-18 11:21:26', '2024-10-18 16:51:26', '2024-10-18 11:21:26', 'Y'),
(24, 'God', '5268478569', '$2b$12$R7CGY9E/VXwL1dxUKH/he.wStph5N.gBqa33ByE2N0gd2CXp1GdI2', 'mmm@gmail.com', NULL, '100016', 'N', '64HggQtD', 'R', 'B8vEgLPT', 1, NULL, 'N', 'Y', '2024-10-22 07:03:32', '2024-10-22 12:33:32', '2024-10-22 07:03:32', 'Y'),
(25, 'SUDh', '6125478563', '$2b$12$cQijIib863pJNMLZEC12puKGRlkotAsV8ltOlPPbzdLCOIltpomfi', 'sdf@gmail.com', NULL, '100017', 'N', '1C4Fh5Rf', 'L', 'JdSQTomB', 1, NULL, 'N', 'Y', '2024-10-22 07:04:46', '2024-10-22 12:34:46', '2024-10-22 07:04:46', 'Y'),
(26, 'sdfs', '5236985211', '$2b$12$qCCmpah9ibLPTrBG0XQqROUoXhdRhXCw6SuMJSqq.n0ACEahzWaLm', 'sdfs@gmail.com', NULL, '100018', 'N', 'JdSQTomB', 'R', 'EaoGN8VU', 1, NULL, 'N', 'N', '2024-10-22 07:05:36', '2024-10-22 12:35:36', '2024-10-22 07:05:36', 'Y'),
(27, 'Left', '5362111232', '$2b$12$MEddXXcjpQzH5Zvz65jNVe9DSeCInnCkqkn/wAzpkrksOOqNID5uK', 'sdfhfdh@gmail.com', NULL, '100019', 'N', '1C4Fh5Rf', 'L', 'rw8rP69Q', 1, NULL, 'N', 'N', '2024-10-22 07:21:39', '2024-10-22 12:51:39', '2024-10-22 07:21:39', 'Y'),
(28, 'Sudhanshu Maurya', '4234567892', '$2b$12$DBrO5PcdaFWZP5k5gWWBh.09eZqEPzuNLwdXfHGAjrUqzlZ2zfiPm', 'sudhanshumaurya@frensysinfotech.com', NULL, '100020', 'N', 'B8vEgLPT', 'L', 'j0nwdUyv', 1, NULL, 'N', 'N', '2024-10-22 07:42:40', '2024-10-22 13:12:40', '2024-10-22 07:42:40', 'Y'),
(29, 'TEJPAL SONI', '2541236589', '$2b$12$Hp7Pzv31jgT8flj88xKB8Oq23zTtFjVf8LLwOVuxed3pfZ0/CB7p.', 'bgoo@gmail.com', NULL, '100021', 'N', '5Zw8gbwv', NULL, 'FJHQbsHt', 1, NULL, 'N', 'N', '2024-10-23 08:39:43', '2024-10-23 14:09:43', '2024-10-23 08:39:43', 'Y'),
(30, 'Tarkus', '5247852145', '$2b$12$4.C8Ul.jGmcylOWVYh/dU.vDvjIVDXi.qOrJlHnDafkWnypUQgim6', 'tarkus@gmail.com', NULL, '100022', 'N', 'qKR2WfPY', 'L', 'aR8etK2f', 1, NULL, 'N', 'N', '2024-11-12 05:58:31', '2024-11-12 11:28:31', '2024-11-12 05:58:31', 'Y');

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
(16, 24, '$2b$12$Tvlv/mnTGEc7p53HpmRkpu4lOig/Fs75gNnQSdBqdBcxBuCU1Sxpa', '2024-10-22 07:41:32', '2024-10-22 07:41:32');

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
(9, '8690708302', '8700', '0', 'Y', '2024-10-04 09:20:35'),
(10, '8690708301', '0', '0', 'Y', '2024-10-04 09:53:09'),
(11, '8690708300', '0', '0', 'Y', '2024-10-08 06:16:40'),
(12, '8690708309', '0', '0', 'Y', '2024-10-14 05:45:03'),
(13, '1111111111', '0', '0', 'Y', '2024-10-14 05:47:52'),
(14, '2222222222', '0', '0', 'Y', '2024-10-14 07:54:59'),
(15, '3333333333', '0', '0', 'Y', '2024-10-14 07:56:44'),
(16, '9876543210', '81400', '0', 'Y', '2024-10-14 09:17:39'),
(17, '6666666666', '0', '0', 'Y', '2024-10-15 10:03:53'),
(18, '9998887776', '0', '0', 'Y', '2024-10-17 07:19:11'),
(19, '9632587412', '0', '0', 'Y', '2024-10-17 07:51:41'),
(20, '9632656985', '0', '0', 'Y', '2024-10-18 11:05:35'),
(21, '9587412563', '0', '0', 'Y', '2024-10-18 11:20:06'),
(22, '9658745896', '0', '0', 'Y', '2024-10-18 11:20:48'),
(23, '9658745899', '0', '0', 'Y', '2024-10-18 11:21:26'),
(24, '5268478569', '0', '0', 'Y', '2024-10-22 07:03:32'),
(25, '6125478563', '0', '0', 'Y', '2024-10-22 07:04:46'),
(26, '5236985211', '0', '0', 'Y', '2024-10-22 07:05:36'),
(27, '5362111232', '0', '0', 'Y', '2024-10-22 07:21:39'),
(28, '4234567892', '0', '0', 'Y', '2024-10-22 07:42:40'),
(29, '2541236589', '0', '0', 'Y', '2024-10-23 08:39:43'),
(30, '5247852145', '0', '0', 'Y', '2024-11-12 05:58:31');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=624;

--
-- AUTO_INCREMENT for table `buy_plan`
--
ALTER TABLE `buy_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `role_assign`
--
ALTER TABLE `role_assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `statement`
--
ALTER TABLE `statement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user_level`
--
ALTER TABLE `user_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_pin`
--
ALTER TABLE `user_pin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
