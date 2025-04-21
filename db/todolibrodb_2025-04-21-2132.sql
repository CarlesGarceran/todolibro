-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-04-2025 a las 19:32:45
-- Versión del servidor: 10.6.21-MariaDB-0ubuntu0.22.04.2
-- Versión de PHP: 8.1.2-1ubuntu2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `todolibrodb`
--
CREATE DATABASE IF NOT EXISTS `todolibrodb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `todolibrodb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Authors`
--

DROP TABLE IF EXISTS `Authors`;
CREATE TABLE `Authors` (
  `AuthorId` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Image` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Authors`
--

TRUNCATE TABLE `Authors`;
--
-- Volcado de datos para la tabla `Authors`
--

INSERT INTO `Authors` (`AuthorId`, `Name`, `Image`) VALUES
(1, 'El Rubius', ''),
(2, 'Àlan Greus', ''),
(3, 'Till Lindemann', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Books`
--

DROP TABLE IF EXISTS `Books`;
CREATE TABLE `Books` (
  `ISBN` varchar(30) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Publisher` int(11) NOT NULL,
  `Author` int(11) NOT NULL,
  `Image` varchar(255) DEFAULT '',
  `LaunchDate` date DEFAULT NULL,
  `Price` decimal(20,6) DEFAULT NULL,
  `Synopsis` text NOT NULL DEFAULT 'No se tiene una sinopsis de este libro.',
  `Stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Books`
--

TRUNCATE TABLE `Books`;
--
-- Volcado de datos para la tabla `Books`
--

INSERT INTO `Books` (`ISBN`, `Name`, `Publisher`, `Author`, `Image`, `LaunchDate`, `Price`, `Synopsis`, `Stock`) VALUES
('9783866907058', 'Amazonas – Reise zum Rio Javari', 3, 3, '/assets/libros/amazonas_reise_zum_rio_javari.avif', '2021-12-18', 40.250000, 'Till Lindemann and Joey Kelly, two men of extremes: One is the singer of \"Rammstein\", who strikes provocative as well as fine tones in his lyrics; the other is a member of the Kelly Family and an endurance athlete.  Both enjoy being on the water and follow - as they did on their Yukon trip - the \"myth\" of a legendary river.  Exclusive photographs by Thomas Stachelhaus and Matthias Matthies tell of their adventures on the Río Yavarí, an untouched tributary of the Amazon.  With poems by Till Lindemann and an interview with both artists.  Exclusive photographs by Thomas Stachelhaus and Matthias Matthies.  Extraordinary, bibliophile furnishings in opulent landscape format.', 14),
('9788476603079', 'L\'Amulet Egipci', 2, 2, '/assets/libros/l_amulet_egipci_alan_greus.jpg', '1997-02-19', 8.550000, 'Francesc visita un museu d\'art egipci amb la classe. Però no s\'imagina que aquest fet esdevindrà el començament d\'una arriscada aventura que es desencadena amb el robatori d\'un valuós pectoral.PREMI FUNDACIÓ BANCAIXA DE NARRATIVA JUVENIL Francesc és un jove apassionat per les civilitzacions antigues i pels llibres que parlen de troballes arqueològiques. Un bon dia, la professora d\'Història anuncia a la classe la visita a una exposició d\'art egipci i Francesc creu descobrir finalment la utilitat de les «activitats extraescolars». Però no s\'imagina que aquella visita pot ser el començament d\'una arriscada aventura que es desecandena amb el robatori d\'un valuós pectoral exposat al museu i amb l\'aparició d\'un enigmàtic personatge que requereix la seua ajuda.', 666),
('9788499983196', 'El Libro Troll', 1, 1, '/assets/libros/el_libro_troll_rubius.png', '2014-05-17', 8.250000, 'Criaturitas del señor, este es el libro de ElRubius, el youtuber con más subs de España: más de 10 millones de suscriptores.   Tu vida es un libro a medio construir, una aventura espontánea, un juego a veces provocador, pero siempre extraordinario. elrubius, un auténtico fenómeno de YouTube, está dispuesto a acompañarte en una experiencia que recoge tus momentos más gloriosos. Se llama EL LIBRO TROLL y es su última locura: un cuaderno de actividades, un libro interactivo, un álbum de recuerdos…  Con un maestro extraordinario: elrubius.  ¡DALE CALOOOOOOH!  Rubén Doblas, elrubius, es el principal youtuber (por número de reproducciones y suscriptores) de España y uno de los primeros del mundo; un absoluto fenómeno de masas en las redes sociales.  En su página www.youtube.com/user/elrubiusOMG realiza sketches, gameplays, videoblogs y secciones fijas de gran éxito en las que aparece su propia imagen.', 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cart`
--

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
  `Users_userId` int(11) NOT NULL,
  `Books_ISBN` varchar(30) NOT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Cart`
--

TRUNCATE TABLE `Cart`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categories`
--

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
  `CategoryId` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Categories`
--

TRUNCATE TABLE `Categories`;
--
-- Volcado de datos para la tabla `Categories`
--

INSERT INTO `Categories` (`CategoryId`, `Name`) VALUES
(1, 'Juvenil'),
(2, 'Libros de influencers'),
(3, 'Más de 13 años');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Category_has_Book`
--

DROP TABLE IF EXISTS `Category_has_Book`;
CREATE TABLE `Category_has_Book` (
  `Category_CategoryId` int(11) NOT NULL,
  `Book_ISBN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Category_has_Book`
--

TRUNCATE TABLE `Category_has_Book`;
--
-- Volcado de datos para la tabla `Category_has_Book`
--

INSERT INTO `Category_has_Book` (`Category_CategoryId`, `Book_ISBN`) VALUES
(1, '9788476603079'),
(1, '9788499983196'),
(2, '9788499983196');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Favorites`
--

DROP TABLE IF EXISTS `Favorites`;
CREATE TABLE `Favorites` (
  `User` int(11) NOT NULL,
  `ISBN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Favorites`
--

TRUNCATE TABLE `Favorites`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Log`
--

DROP TABLE IF EXISTS `Log`;
CREATE TABLE `Log` (
  `userId` int(11) NOT NULL,
  `Action` varchar(255) NOT NULL,
  `Time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Log`
--

TRUNCATE TABLE `Log`;
--
-- Volcado de datos para la tabla `Log`
--

INSERT INTO `Log` (`userId`, `Action`, `Time`) VALUES
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-04-21 19:16:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Orders`
--

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `OrderId` int(11) NOT NULL,
  `User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Orders`
--

TRUNCATE TABLE `Orders`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Orders_has_Books`
--

DROP TABLE IF EXISTS `Orders_has_Books`;
CREATE TABLE `Orders_has_Books` (
  `Books_ISBN` varchar(30) NOT NULL,
  `Orders_OrderId` int(11) NOT NULL,
  `Orders_User` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Orders_has_Books`
--

TRUNCATE TABLE `Orders_has_Books`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Publishers`
--

DROP TABLE IF EXISTS `Publishers`;
CREATE TABLE `Publishers` (
  `PublisherId` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Image` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Publishers`
--

TRUNCATE TABLE `Publishers`;
--
-- Volcado de datos para la tabla `Publishers`
--

INSERT INTO `Publishers` (`PublisherId`, `Name`, `Image`) VALUES
(1, 'Ediciones Martínez Roca', ''),
(2, 'Edicions Bromera', ''),
(3, 'National Geographic Deutschland', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
  `ISBN` varchar(30) NOT NULL,
  `UserId` int(11) NOT NULL DEFAULT 0,
  `Comment` varchar(255) NOT NULL DEFAULT '',
  `Rating` decimal(20,6) NOT NULL DEFAULT 0.000000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Reviews`
--

TRUNCATE TABLE `Reviews`;
--
-- Volcado de datos para la tabla `Reviews`
--

INSERT INTO `Reviews` (`ISBN`, `UserId`, `Comment`, `Rating`) VALUES
('9783866907058', 8, 'Que grande el viejo sabroso.', 5.000000),
('9788499983196', 3, 'Ni fu ni fa', 3.000000),
('9788499983196', 7, 'No me pagan', 2.500000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles`
--

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `idRole` int(11) NOT NULL,
  `RoleName` text NOT NULL,
  `RoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Roles`
--

TRUNCATE TABLE `Roles`;
--
-- Volcado de datos para la tabla `Roles`
--

INSERT INTO `Roles` (`idRole`, `RoleName`, `RoleId`) VALUES
(1, 'Overseer', 255),
(2, 'Site Administrator', 254),
(3, 'Administrator', 180),
(4, 'Moderator', 127),
(5, 'Content Manager', 130),
(6, 'GOD', -1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles_has_Users`
--

DROP TABLE IF EXISTS `Roles_has_Users`;
CREATE TABLE `Roles_has_Users` (
  `Users_userId` int(11) NOT NULL,
  `Roles_idRole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Roles_has_Users`
--

TRUNCATE TABLE `Roles_has_Users`;
--
-- Volcado de datos para la tabla `Roles_has_Users`
--

INSERT INTO `Roles_has_Users` (`Users_userId`, `Roles_idRole`) VALUES
(8, 1),
(3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Sales`
--

DROP TABLE IF EXISTS `Sales`;
CREATE TABLE `Sales` (
  `SaleId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Price` decimal(11,0) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Sales`
--

TRUNCATE TABLE `Sales`;
--
-- Volcado de datos para la tabla `Sales`
--

INSERT INTO `Sales` (`SaleId`, `UserId`, `Price`) VALUES
(1, 3, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Sale_has_Books`
--

DROP TABLE IF EXISTS `Sale_has_Books`;
CREATE TABLE `Sale_has_Books` (
  `SaleId` int(11) NOT NULL,
  `ISBN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Sale_has_Books`
--

TRUNCATE TABLE `Sale_has_Books`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UserCollections`
--

DROP TABLE IF EXISTS `UserCollections`;
CREATE TABLE `UserCollections` (
  `ShelfId` varchar(45) NOT NULL,
  `Collection Name` varchar(45) NOT NULL,
  `Owner` int(11) NOT NULL,
  `Books_ISBN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `UserCollections`
--

TRUNCATE TABLE `UserCollections`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `userId` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `ProfilePicture` varchar(45) NOT NULL,
  `PasswordHash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `Users`
--

TRUNCATE TABLE `Users`;
--
-- Volcado de datos para la tabla `Users`
--

INSERT INTO `Users` (`userId`, `Name`, `Email`, `ProfilePicture`, `PasswordHash`) VALUES
(3, 'admin', 'admin@admin.com', '/assets/default_pfp.png', '173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705'),
(7, 'User', 'user@user.com', '/assets/default_pfp.png', '7b3d979ca8330a94fa7e9e1b466d8b99e0bcdea1ec90596c0dcc8d7ef6b4300c'),
(8, 'Carles', 'test@gmail.com', '/assets/default_pfp.png', '756bc47cb5215dc3329ca7e1f7be33a2dad68990bb94b76d90aa07f4e44a233a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Authors`
--
ALTER TABLE `Authors`
  ADD PRIMARY KEY (`AuthorId`);

--
-- Indices de la tabla `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`ISBN`),
  ADD KEY `fk_Book_Publisher1_idx` (`Publisher`),
  ADD KEY `fk_Books_Authors1_idx` (`Author`);

--
-- Indices de la tabla `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`Users_userId`,`Books_ISBN`),
  ADD KEY `fk_Cart_Books1_idx` (`Books_ISBN`);

--
-- Indices de la tabla `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indices de la tabla `Category_has_Book`
--
ALTER TABLE `Category_has_Book`
  ADD PRIMARY KEY (`Category_CategoryId`,`Book_ISBN`),
  ADD KEY `fk_Category_has_Book_Book1_idx` (`Book_ISBN`),
  ADD KEY `fk_Category_has_Book_Category1_idx` (`Category_CategoryId`);

--
-- Indices de la tabla `Favorites`
--
ALTER TABLE `Favorites`
  ADD PRIMARY KEY (`ISBN`,`User`),
  ADD KEY `fk_Favorites_Users1_idx` (`User`),
  ADD KEY `fk_Favorites_Books1_idx` (`ISBN`);

--
-- Indices de la tabla `Log`
--
ALTER TABLE `Log`
  ADD KEY `UserId` (`userId`);

--
-- Indices de la tabla `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`OrderId`,`User`),
  ADD KEY `fk_Order_Users1_idx` (`User`);

--
-- Indices de la tabla `Orders_has_Books`
--
ALTER TABLE `Orders_has_Books`
  ADD PRIMARY KEY (`Books_ISBN`,`Orders_OrderId`,`Orders_User`),
  ADD KEY `fk_Books_has_Orders_Orders1_idx` (`Orders_OrderId`,`Orders_User`),
  ADD KEY `fk_Books_has_Orders_Books1_idx` (`Books_ISBN`);

--
-- Indices de la tabla `Publishers`
--
ALTER TABLE `Publishers`
  ADD PRIMARY KEY (`PublisherId`);

--
-- Indices de la tabla `Reviews`
--
ALTER TABLE `Reviews`
  ADD UNIQUE KEY `UNIQUE_PAIR` (`ISBN`,`UserId`),
  ADD KEY `ISBNFKINDEX` (`ISBN`),
  ADD KEY `USERFKINDEX` (`UserId`);

--
-- Indices de la tabla `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`idRole`);

--
-- Indices de la tabla `Roles_has_Users`
--
ALTER TABLE `Roles_has_Users`
  ADD PRIMARY KEY (`Roles_idRole`,`Users_userId`),
  ADD KEY `fk_Roles_has_Users_Users1_idx` (`Users_userId`),
  ADD KEY `fk_Roles_has_Users_Roles1_idx` (`Roles_idRole`);

--
-- Indices de la tabla `Sales`
--
ALTER TABLE `Sales`
  ADD PRIMARY KEY (`SaleId`),
  ADD KEY `fk_userid` (`UserId`);

--
-- Indices de la tabla `Sale_has_Books`
--
ALTER TABLE `Sale_has_Books`
  ADD KEY `fk_saleid` (`SaleId`),
  ADD KEY `fk_isbn` (`ISBN`);

--
-- Indices de la tabla `UserCollections`
--
ALTER TABLE `UserCollections`
  ADD PRIMARY KEY (`ShelfId`),
  ADD KEY `fk_UserCollections_Users1_idx` (`Owner`),
  ADD KEY `fk_UserCollections_Books1_idx` (`Books_ISBN`);

--
-- Indices de la tabla `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Authors`
--
ALTER TABLE `Authors`
  MODIFY `AuthorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Categories`
--
ALTER TABLE `Categories`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Orders`
--
ALTER TABLE `Orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Publishers`
--
ALTER TABLE `Publishers`
  MODIFY `PublisherId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Roles`
--
ALTER TABLE `Roles`
  MODIFY `idRole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Books`
--
ALTER TABLE `Books`
  ADD CONSTRAINT `fk_Book_Publisher1` FOREIGN KEY (`Publisher`) REFERENCES `Publishers` (`PublisherId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Books_Authors1` FOREIGN KEY (`Author`) REFERENCES `Authors` (`AuthorId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `fk_Cart_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Cart_Users1` FOREIGN KEY (`Users_userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Category_has_Book`
--
ALTER TABLE `Category_has_Book`
  ADD CONSTRAINT `fk_Category_has_Book_Book1` FOREIGN KEY (`Book_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Category_has_Book_Category1` FOREIGN KEY (`Category_CategoryId`) REFERENCES `Categories` (`CategoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Favorites`
--
ALTER TABLE `Favorites`
  ADD CONSTRAINT `fk_Favorites_Books1` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Favorites_Users1` FOREIGN KEY (`User`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Log`
--
ALTER TABLE `Log`
  ADD CONSTRAINT `UserId` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `fk_Order_Users1` FOREIGN KEY (`User`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Orders_has_Books`
--
ALTER TABLE `Orders_has_Books`
  ADD CONSTRAINT `fk_Books_has_Orders_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Books_has_Orders_Orders1` FOREIGN KEY (`Orders_OrderId`,`Orders_User`) REFERENCES `Orders` (`OrderId`, `User`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Reviews`
--
ALTER TABLE `Reviews`
  ADD CONSTRAINT `ISBNFK` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `USERIDFK` FOREIGN KEY (`UserId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Roles_has_Users`
--
ALTER TABLE `Roles_has_Users`
  ADD CONSTRAINT `fk_Roles_has_Users_Roles1` FOREIGN KEY (`Roles_idRole`) REFERENCES `Roles` (`idRole`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Roles_has_Users_Users1` FOREIGN KEY (`Users_userId`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Sales`
--
ALTER TABLE `Sales`
  ADD CONSTRAINT `fk_userid` FOREIGN KEY (`UserId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Sale_has_Books`
--
ALTER TABLE `Sale_has_Books`
  ADD CONSTRAINT `fk_isbn` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_saleid` FOREIGN KEY (`SaleId`) REFERENCES `Sales` (`SaleId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `UserCollections`
--
ALTER TABLE `UserCollections`
  ADD CONSTRAINT `fk_UserCollections_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_UserCollections_Users1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
