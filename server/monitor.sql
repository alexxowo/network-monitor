-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-01-2022 a las 03:45:07
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `monitor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `agent_name` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `agents`
--

INSERT INTO `agents` (`id`, `agent_name`) VALUES
(1, 'Agent'),
(2, 'SNMP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hosts`
--

CREATE TABLE `hosts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hostname` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `address` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `port` int(10) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `agent` int(1) NOT NULL,
  `description` text COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `hosts`
--

INSERT INTO `hosts` (`id`, `hostname`, `address`, `port`, `status`, `agent`, `description`) VALUES
(1, 'alexandre PC', '192.168.60.53', 10050, 1, 1, 'Hola Mundo'),
(3, 'alexandre PC', '192.168.4.53', 10050, 1, 1, 'Hola Mundo'),
(4, 'Servidor 1', '192.168.90.33', 10050, 1, 1, 'Hola Mundo'),
(5, 'Servidor 2', '192.168.90.32', 10050, 1, 1, 'Hola Mundo'),
(6, 'DNS Cache', '192.168.90.31', 10050, 1, 1, 'Hola Mundo'),
(7, 'localhost', '127.0.0.1', 10050, 1, 1, 'Localhost');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items`
--

CREATE TABLE `items` (
  `id` bigint(20) NOT NULL,
  `item_type` int(11) NOT NULL,
  `host_id` bigint(20) UNSIGNED NOT NULL,
  `value` float NOT NULL,
  `unixtime` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `items`
--

INSERT INTO `items` (`id`, `item_type`, `host_id`, `value`, `unixtime`) VALUES
(1, 1, 7, 500, 400),
(4, 1, 7, 8.54639, 1642729922),
(5, 1, 7, 8.54639, 1642729981),
(6, 1, 7, 2.22075, 1642730040),
(7, 1, 7, 2.29003, 1642730100),
(8, 1, 7, 2.27211, 1642730160),
(9, 1, 7, 2.25164, 1642730221),
(10, 1, 7, 2.19672, 1642730280),
(11, 1, 7, 2.16723, 1642730340),
(12, 1, 7, 2.15058, 1642730401),
(13, 1, 7, 2.15418, 1642730461),
(14, 1, 7, 2.11504, 1642730520),
(15, 1, 7, 2.33182, 1642730581),
(16, 1, 7, 2.3544, 1642730640),
(17, 1, 7, 2.36553, 1642730700),
(18, 1, 7, 2.41226, 1642730761),
(19, 1, 7, 2.33408, 1642730820),
(20, 1, 7, 2.28673, 1642732800),
(21, 1, 7, 2.30368, 1642732860),
(22, 1, 7, 2.1929, 1642732921),
(23, 1, 7, 2.27033, 1642733040),
(24, 1, 7, 2.56895, 1642733101);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item_type`
--

CREATE TABLE `item_type` (
  `id` int(11) DEFAULT NULL,
  `item_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hosts`
--
ALTER TABLE `hosts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address` (`address`),
  ADD KEY `agent` (`agent`);

--
-- Indices de la tabla `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unixtime` (`unixtime`),
  ADD KEY `host_id` (`host_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `hosts`
--
ALTER TABLE `hosts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `hosts`
--
ALTER TABLE `hosts`
  ADD CONSTRAINT `hosts_ibfk_1` FOREIGN KEY (`agent`) REFERENCES `agents` (`id`);

--
-- Filtros para la tabla `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
