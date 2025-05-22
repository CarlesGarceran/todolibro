-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 22, 2025 at 05:40 PM
-- Server version: 10.6.22-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolibrodb`
--
CREATE DATABASE IF NOT EXISTS `todolibrodb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `todolibrodb`;

-- --------------------------------------------------------

--
-- Table structure for table `Authors`
--

DROP TABLE IF EXISTS `Authors`;
CREATE TABLE `Authors` (
  `AuthorId` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Image` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Authors`
--

INSERT DELAYED INTO `Authors` (`AuthorId`, `Name`, `Image`) VALUES
(1, 'El Rubius', ''),
(2, 'Àlan Greus', ''),
(3, 'Till Lindemann', ''),
(6, 'Jeff Kinney', ''),
(8, 'Tatsuki Fujimoto', '');

-- --------------------------------------------------------

--
-- Table structure for table `Books`
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
-- Dumping data for table `Books`
--

INSERT DELAYED INTO `Books` (`ISBN`, `Name`, `Publisher`, `Author`, `Image`, `LaunchDate`, `Price`, `Synopsis`, `Stock`) VALUES
('382180730', 'Messer', 7, 3, 'http://91.126.226.193:27032/endpoints/file/?name=libros/8_1747034800-OIP-1344980260.jpg', '2005-01-01', 174.380000, 'Messer [paperback] Till Lindemann [Jan 01, 2005]', 0),
('8467941154', 'Chainsaw Man : Volumen 1', 6, 8, 'assets/libros/8_1746727093-chainsaw-man-1-kaze-1042515667.jpg', '2020-09-04', 8.550000, '¡El nuevo y esperadísimo trabajo del autor de Fire PUNCH ! denji es un chico sin un duro que se deja la piel trabajando como Devil Hunter junto a su perro demoníaco pochita para resarcir una deuda astronómica, pero entonces... ¡¡Una sangrienta traición da un giro radical a su miserable vida!!', 4),
('8467942622', 'Chainsaw Man : Volumen 2', 6, 8, 'assets/libros/8_1747935161-chainsaw-man-vol-2-9781974709946_xlg-2713192401.jpg', '2025-05-22', 8.550000, 'Motivado por la obsesión de sobar unas buenas peras, denji lucha a muerte contra el demonio murciélago. ¿Conseguir su objetivo tras la conclusión de la batalla? Además entra en acción un nuevo enemigo conocido como el demonio pistola. Según makima, se dice que es el mayor enemigo de la humanidad y todos los Devil hunters andan tras él...', 5),
('9783866907058', 'Amazonas – Reise zum Rio Javari', 3, 3, '/assets/libros/amazonas_reise_zum_rio_javari.avif', '2021-12-17', 40.250000, 'Till Lindemann and Joey Kelly, two men of extremes: One is the singer of \"Rammstein\", who strikes provocative as well as fine tones in his lyrics; the other is a member of the Kelly Family and an endurance athlete.  Both enjoy being on the water and follow - as they did on their Yukon trip - the \"myth\" of a legendary river.  Exclusive photographs by Thomas Stachelhaus and Matthias Matthies tell of their adventures on the Río Yavarí, an untouched tributary of the Amazon.  With poems by Till Lindemann and an interview with both artists.  Exclusive photographs by Thomas Stachelhaus and Matthias Matthies.  Extraordinary, bibliophile furnishings in opulent landscape format.', 11),
('9788476603079', 'L\'Amulet Egipci', 2, 2, '/assets/libros/l_amulet_egipci_alan_greus.jpg', '1997-02-19', 8.550000, 'Francesc visita un museu d\'art egipci amb la classe. Però no s\'imagina que aquest fet esdevindrà el començament d\'una arriscada aventura que es desencadena amb el robatori d\'un valuós pectoral.PREMI FUNDACIÓ BANCAIXA DE NARRATIVA JUVENIL Francesc és un jove apassionat per les civilitzacions antigues i pels llibres que parlen de troballes arqueològiques. Un bon dia, la professora d\'Història anuncia a la classe la visita a una exposició d\'art egipci i Francesc creu descobrir finalment la utilitat de les «activitats extraescolars». Però no s\'imagina que aquella visita pot ser el començament d\'una arriscada aventura que es desecandena amb el robatori d\'un valuós pectoral exposat al museu i amb l\'aparició d\'un enigmàtic personatge que requereix la seua ajuda.', 666),
('9788498672220', 'El diario de Greg 1 - Un pringao total', 4, 6, 'http://91.126.226.193:27032/endpoints/file/?name=libros/8_1745575507-el_diario_de_greg.jpg', '2011-01-09', 15.950000, '¡Ser casi adolescente puede resultar muy fastidioso! Nadie lo sabe mejor que Greg Heffley al comenzar el instituto.\n\nEl primer libro del diario más tronchante y desternillante, Diario de Greg. Un auténtico fenómeno mundial.\n\nSer casi adolescente puede ser un fastidio. Nadie lo sabe mejor que Greg Heffley, inmerso en el duro ambiente del instituto, donde los chicos bajitos que aún no han pegado el estirón tienen que compartir los pasillos con grandullones que ya se afeitan dos veces al día.\n\n«En primer lugar, quiero dejar una cosa bien clara: esto no es un diario. Ya sé lo que pone en la portada. Mira que cuando Mamá lo fue a comprar le pedí DE MANERA ESPECÍFICA que si compraba una libreta no tuviera el rotulito de diario».\n\nGreg Heffley tiene 12 años y su madre le compra un diario que abarcará un curso escolar: de septiembre a junio. Conoceremos a Greg a través de las hilarantes y enternecedoras desventuras que narra e ilustra en su libreta. Estamos ante un retrato cómico de la vida, la voz y las costumbres de los niños preadolescentes. Este debut hará a todo el mundo troncharse de risa.', 0),
('9788499983196', 'El Libro Troll', 1, 1, '/assets/libros/el_libro_troll_rubius.png', '2014-05-17', 8.250000, 'Criaturitas del señor, este es el libro de ElRubius, el youtuber con más subs de España: más de 10 millones de suscriptores.   Tu vida es un libro a medio construir, una aventura espontánea, un juego a veces provocador, pero siempre extraordinario. elrubius, un auténtico fenómeno de YouTube, está dispuesto a acompañarte en una experiencia que recoge tus momentos más gloriosos. Se llama EL LIBRO TROLL y es su última locura: un cuaderno de actividades, un libro interactivo, un álbum de recuerdos…  Con un maestro extraordinario: elrubius.  ¡DALE CALOOOOOOH!  Rubén Doblas, elrubius, es el principal youtuber (por número de reproducciones y suscriptores) de España y uno de los primeros del mundo; un absoluto fenómeno de masas en las redes sociales.  En su página www.youtube.com/user/elrubiusOMG realiza sketches, gameplays, videoblogs y secciones fijas de gran éxito en las que aparece su propia imagen.', 55);

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
  `Users_userId` int(11) NOT NULL,
  `Books_ISBN` varchar(30) NOT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Cart`
--

INSERT DELAYED INTO `Cart` (`Users_userId`, `Books_ISBN`, `Quantity`) VALUES
(9, '9788476603079', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
  `CategoryId` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Categories`
--

INSERT DELAYED INTO `Categories` (`CategoryId`, `Name`) VALUES
(1, 'Juvenil'),
(2, 'Libros de influencers'),
(3, 'Más de 13 años'),
(4, 'A partir de 10 años'),
(5, 'Manga'),
(6, 'Comic'),
(7, 'Libro de fotos'),
(8, 'Poesía');

-- --------------------------------------------------------

--
-- Table structure for table `Category_has_Book`
--

DROP TABLE IF EXISTS `Category_has_Book`;
CREATE TABLE `Category_has_Book` (
  `Category_CategoryId` int(11) NOT NULL,
  `Book_ISBN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Category_has_Book`
--

INSERT DELAYED INTO `Category_has_Book` (`Category_CategoryId`, `Book_ISBN`) VALUES
(1, '9788476603079'),
(1, '9788498672220'),
(1, '9788499983196'),
(2, '9788499983196'),
(3, '9788498672220'),
(5, '8467941154'),
(6, '8467941154'),
(7, '9783866907058'),
(8, '382180730');

-- --------------------------------------------------------

--
-- Table structure for table `Favorites`
--

DROP TABLE IF EXISTS `Favorites`;
CREATE TABLE `Favorites` (
  `User` int(11) NOT NULL,
  `ISBN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Favorites`
--

INSERT DELAYED INTO `Favorites` (`User`, `ISBN`) VALUES
(8, '9783866907058'),
(3, '9788476603079'),
(3, '9788498672220'),
(8, '9788499983196');

-- --------------------------------------------------------

--
-- Table structure for table `Log`
--

DROP TABLE IF EXISTS `Log`;
CREATE TABLE `Log` (
  `userId` int(11) NOT NULL,
  `Action` varchar(255) NOT NULL,
  `Time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Log`
--

INSERT DELAYED INTO `Log` (`userId`, `Action`, `Time`) VALUES
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-04-23 18:10:33'),
(8, 'The user has added the author Jeff Kinney', '2025-04-25 11:19:57'),
(8, 'The user has updated the book 9788498672220', '2025-04-25 11:21:41'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-12 07:00:10'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-12 07:14:49'),
(8, 'User 8 has uploaded the file (8_1747034170-OIP-1344980260.jpg) to the server', '2025-05-12 07:16:10'),
(8, 'The user has added the publisher Eichborn Verlag Ag', '2025-05-12 07:17:38'),
(8, 'The user has added the book 382180730', '2025-05-12 07:19:00'),
(8, 'The user has updated the book 382180730', '2025-05-12 07:19:32'),
(8, 'The user has updated the book 382180730', '2025-05-12 07:20:04'),
(8, 'User 8 has uploaded the file (8_1747034451-OIP-1344980260.jpg) to the server', '2025-05-12 07:20:51'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-12 07:25:33'),
(8, 'User 8 has uploaded the file (8_1747034742-OIP-1344980260.jpg) to the server', '2025-05-12 07:25:42'),
(8, 'The user has updated the book 382180730', '2025-05-12 07:25:52'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-12 07:26:31'),
(8, 'User 8 has uploaded the file (8_1747034800-OIP-1344980260.jpg) to the server', '2025-05-12 07:26:40'),
(8, 'The user has updated the book 382180730', '2025-05-12 07:26:59'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-12 07:27:17'),
(8, 'The user has updated the book 382180730', '2025-05-12 07:27:34'),
(8, 'The user has updated the book 382180730', '2025-05-12 07:27:44'),
(8, 'The user has updated the categories of 382180730', '2025-05-12 07:31:06'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-12 09:14:26'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-13 09:24:01'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-21 14:21:56'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-22 17:29:45'),
(8, 'User 8 has uploaded the file (8_1747935161-chainsaw-man-vol-2-9781974709946_xlg-2713192401.jpg) to the server', '2025-05-22 17:32:41'),
(8, 'The user has added the book 8467942622', '2025-05-22 17:33:52'),
(8, 'The user has updated the book 8467941154', '2025-05-22 17:33:59'),
(8, 'The user has updated the book 8467942622', '2025-05-22 17:34:11'),
(8, 'User: \'Carles\', Has Entered into the administration panel.', '2025-05-22 17:35:03'),
(8, 'The user has updated the book 8467942622', '2025-05-22 17:35:14');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `OrderId` int(11) NOT NULL,
  `User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Orders_has_Books`
--

DROP TABLE IF EXISTS `Orders_has_Books`;
CREATE TABLE `Orders_has_Books` (
  `Books_ISBN` varchar(30) NOT NULL,
  `Orders_OrderId` int(11) NOT NULL,
  `Orders_User` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Publishers`
--

DROP TABLE IF EXISTS `Publishers`;
CREATE TABLE `Publishers` (
  `PublisherId` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Image` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Publishers`
--

INSERT DELAYED INTO `Publishers` (`PublisherId`, `Name`, `Image`) VALUES
(1, 'Ediciones Martínez Roca', ''),
(2, 'Edicions Bromera', ''),
(3, 'National Geographic Deutschland', ''),
(4, 'Molino', ''),
(6, 'Norma Editorial', ''),
(7, 'Eichborn Verlag Ag', '');

-- --------------------------------------------------------

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
  `ISBN` varchar(30) NOT NULL,
  `UserId` int(11) NOT NULL DEFAULT 0,
  `Comment` text NOT NULL,
  `Rating` decimal(20,6) NOT NULL DEFAULT 0.000000,
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reviews`
--

INSERT DELAYED INTO `Reviews` (`ISBN`, `UserId`, `Comment`, `Rating`, `Timestamp`) VALUES
('382180730', 8, 'Este libro es mas raro que ver un cerdo volar. No he visto muchos cerdos volar.', 5.000000, '2025-05-12 09:34:38'),
('382180730', 13, 'he tenido que hipotecar la casa para poder comprar este libro, ha valido la pena por lo menos. escuchen a la metrika', 3.000000, '2025-05-12 07:24:55'),
('8467941154', 8, 'Seguro que MrTartaria diría que vio a este tío en el polo norte. Me juego lo que quieras...', 5.000000, '2025-05-08 19:03:38'),
('9783866907058', 3, 'Porque esta este esquizofrénico por todas partes?', 5.000000, '2025-04-28 09:32:45'),
('9783866907058', 8, 'Tilin del mal es mi padre.\nBuen libro, por cierto.', 5.000000, '2025-04-28 09:27:04'),
('9783866907058', 10, 'Angostio manda aquí, cajones', 4.500000, '2025-04-28 09:27:04'),
('9783866907058', 13, 'no me ha gustado, no habia romance, me gustan historias de amor y pasión. no recomiendo', 3.000000, '2025-05-09 06:28:15'),
('9788476603079', 8, 'Está bien, no me acuerdo de que trata pero esta bien 👌. ', 4.000000, '2025-04-28 09:27:04'),
('9788498672220', 3, 'Concuerdo con el esquizofrénico de arriba ^.', 4.000000, '2025-04-28 09:32:18'),
('9788498672220', 7, 'Que si abuelo, tómese las pastillas ^', 3.500000, '2025-04-28 09:41:51'),
('9788498672220', 8, 'El diario de gregorio.\nGregorio es un niño (creo), que le gusta hacer gregoriadas, como no, es un pringao, pero el tipico pringao eh, el que no da ni un agua al palo (creo que así no era).', 3.500000, '2025-04-28 09:27:04'),
('9788498672220', 12, 'VI UN CUBO DE PLASMA EN LA ANTARTIDA, ERA COMO DE GELATINA PERO NO SABÍAMOS SI ERA UN HOLOGRAMA, LO TOQUE Y FUE UN SEGUNDO PERO YO ESTUBE DENTRO DEL CUBO 3 HORAS HABLANDO CON MI YO DE 30 AÑOS EN EL PASADO Y MI YO DE 30 AÑOS EN EL FUTURO. VIVIMOS EN UNA SIMULACIÓN.', 4.500000, '2025-04-28 09:39:34'),
('9788499983196', 3, 'Ni fu ni fa', 3.000000, '2025-04-28 09:27:04'),
('9788499983196', 7, 'No me pagan', 2.500000, '2025-04-28 09:27:04'),
('9788499983196', 8, 'Castaña de libro hermano. Mejor leete Clean Code.', 0.500000, '2025-04-28 09:27:04');

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `idRole` int(11) NOT NULL,
  `RoleName` text NOT NULL,
  `RoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Roles`
--

INSERT DELAYED INTO `Roles` (`idRole`, `RoleName`, `RoleId`) VALUES
(1, 'Overseer', 255),
(2, 'Site Administrator', 254),
(3, 'Administrator', 180),
(4, 'Moderator', 127),
(5, 'Content Manager', 130),
(6, 'GOD', -1);

-- --------------------------------------------------------

--
-- Table structure for table `Roles_has_Users`
--

DROP TABLE IF EXISTS `Roles_has_Users`;
CREATE TABLE `Roles_has_Users` (
  `Users_userId` int(11) NOT NULL,
  `Roles_idRole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Roles_has_Users`
--

INSERT DELAYED INTO `Roles_has_Users` (`Users_userId`, `Roles_idRole`) VALUES
(8, 1),
(9, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Sales`
--

DROP TABLE IF EXISTS `Sales`;
CREATE TABLE `Sales` (
  `SaleId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Price` decimal(20,6) NOT NULL DEFAULT 0.000000,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Sales`
--

INSERT DELAYED INTO `Sales` (`SaleId`, `UserId`, `Price`, `created_at`) VALUES
(22, 8, 57.050000, '2025-05-08 16:24:30'),
(23, 8, 40.250000, '2025-05-08 16:33:25'),
(24, 8, 15.950000, '2025-05-08 17:44:01'),
(25, 13, 40.250000, '2025-05-09 06:25:25'),
(26, 13, 174.380000, '2025-05-12 07:27:56'),
(27, 8, 40.250000, '2025-05-12 09:39:32'),
(28, 8, 8.550000, '2025-05-22 17:34:31');

-- --------------------------------------------------------

--
-- Table structure for table `Sale_has_Books`
--

DROP TABLE IF EXISTS `Sale_has_Books`;
CREATE TABLE `Sale_has_Books` (
  `SaleId` int(11) NOT NULL,
  `ISBN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Sale_has_Books`
--

INSERT DELAYED INTO `Sale_has_Books` (`SaleId`, `ISBN`) VALUES
(22, '9783866907058'),
(22, '9788476603079'),
(22, '9788499983196'),
(23, '9783866907058'),
(24, '9788498672220'),
(25, '9783866907058'),
(26, '382180730'),
(27, '9783866907058'),
(28, '8467941154');

-- --------------------------------------------------------

--
-- Table structure for table `UserCollections`
--

DROP TABLE IF EXISTS `UserCollections`;
CREATE TABLE `UserCollections` (
  `ShelfId` varchar(45) NOT NULL,
  `Collection Name` varchar(45) NOT NULL,
  `Owner` int(11) NOT NULL,
  `Books_ISBN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `userId` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `ProfilePicture` text NOT NULL,
  `PasswordHash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT DELAYED INTO `Users` (`userId`, `Name`, `Email`, `ProfilePicture`, `PasswordHash`) VALUES
(3, 'admin', 'admin@admin.com', 'https://media.tenor.com/QEqqUamGWiMAAAAi/darling-in-the-franxx-zero-two.gif', '998ed4d621742d0c2d85ed84173db569afa194d4597686cae947324aa58ab4bb'),
(7, 'User', 'user@user.com', '/assets/default_pfp.png', '756bc47cb5215dc3329ca7e1f7be33a2dad68990bb94b76d90aa07f4e44a233a'),
(8, 'Carles', 'carles@gmail.com', 'https://media.tenor.com/IWBRvG0FTToAAAAj/spongebob-meme-countryballs.gif', '756bc47cb5215dc3329ca7e1f7be33a2dad68990bb94b76d90aa07f4e44a233a'),
(9, 'pablito', 'pablo@gmail.com', 'http://91.126.226.193:27032/endpoints/file/?name=uploads/9_1745476042-c6dfa22150790c670c988c5196f6ba0e.gif', 'cd372fb85148700fa88095e3492d3f9f5beb43e555e5ff26d95f5a6adc36f8e6'),
(10, 'Angostio', 'angostio@gmail.com', 'https://media1.tenor.com/m/InzuVTz0zM8AAAAd/tralalelo-tralala-bombardiro-crocodilo.gif', 'cd372fb85148700fa88095e3492d3f9f5beb43e555e5ff26d95f5a6adc36f8e6'),
(12, 'MrTartaria', 'tartaria@laelite.org', 'https://media1.tenor.com/m/L__L07pAnVgAAAAd/mr-tartaria.gif', '756bc47cb5215dc3329ca7e1f7be33a2dad68990bb94b76d90aa07f4e44a233a'),
(13, ' equipo butano', "\'@gmail.com", 'https://www.gascordoba.com/61-large_default/bombona-butano-125-kg.jpg', 'dfaa90b9f1d0497f2836e7a73b6e332125ba378ff023382491970708da76b0d5');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Authors`
--
ALTER TABLE `Authors`
  ADD PRIMARY KEY (`AuthorId`);

--
-- Indexes for table `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`ISBN`),
  ADD KEY `fk_Book_Publisher1_idx` (`Publisher`),
  ADD KEY `fk_Books_Authors1_idx` (`Author`);

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`Users_userId`,`Books_ISBN`),
  ADD KEY `fk_Cart_Books1_idx` (`Books_ISBN`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indexes for table `Category_has_Book`
--
ALTER TABLE `Category_has_Book`
  ADD PRIMARY KEY (`Category_CategoryId`,`Book_ISBN`),
  ADD KEY `fk_Category_has_Book_Book1_idx` (`Book_ISBN`),
  ADD KEY `fk_Category_has_Book_Category1_idx` (`Category_CategoryId`);

--
-- Indexes for table `Favorites`
--
ALTER TABLE `Favorites`
  ADD PRIMARY KEY (`ISBN`,`User`),
  ADD KEY `fk_Favorites_Users1_idx` (`User`),
  ADD KEY `fk_Favorites_Books1_idx` (`ISBN`);

--
-- Indexes for table `Log`
--
ALTER TABLE `Log`
  ADD KEY `UserId` (`userId`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`OrderId`,`User`),
  ADD KEY `fk_Order_Users1_idx` (`User`);

--
-- Indexes for table `Orders_has_Books`
--
ALTER TABLE `Orders_has_Books`
  ADD PRIMARY KEY (`Books_ISBN`,`Orders_OrderId`,`Orders_User`),
  ADD KEY `fk_Books_has_Orders_Orders1_idx` (`Orders_OrderId`,`Orders_User`),
  ADD KEY `fk_Books_has_Orders_Books1_idx` (`Books_ISBN`);

--
-- Indexes for table `Publishers`
--
ALTER TABLE `Publishers`
  ADD PRIMARY KEY (`PublisherId`);

--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD UNIQUE KEY `UNIQUE_PAIR` (`ISBN`,`UserId`),
  ADD KEY `ISBNFKINDEX` (`ISBN`),
  ADD KEY `USERFKINDEX` (`UserId`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`idRole`);

--
-- Indexes for table `Roles_has_Users`
--
ALTER TABLE `Roles_has_Users`
  ADD PRIMARY KEY (`Roles_idRole`,`Users_userId`),
  ADD KEY `fk_Roles_has_Users_Users1_idx` (`Users_userId`),
  ADD KEY `fk_Roles_has_Users_Roles1_idx` (`Roles_idRole`);

--
-- Indexes for table `Sales`
--
ALTER TABLE `Sales`
  ADD PRIMARY KEY (`SaleId`),
  ADD KEY `fk_userid` (`UserId`);

--
-- Indexes for table `Sale_has_Books`
--
ALTER TABLE `Sale_has_Books`
  ADD KEY `fk_saleid` (`SaleId`),
  ADD KEY `fk_isbn` (`ISBN`);

--
-- Indexes for table `UserCollections`
--
ALTER TABLE `UserCollections`
  ADD PRIMARY KEY (`ShelfId`),
  ADD KEY `fk_UserCollections_Users1_idx` (`Owner`),
  ADD KEY `fk_UserCollections_Books1_idx` (`Books_ISBN`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Authors`
--
ALTER TABLE `Authors`
  MODIFY `AuthorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Publishers`
--
ALTER TABLE `Publishers`
  MODIFY `PublisherId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `idRole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Sales`
--
ALTER TABLE `Sales`
  MODIFY `SaleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Books`
--
ALTER TABLE `Books`
  ADD CONSTRAINT `fk_Book_Publisher1` FOREIGN KEY (`Publisher`) REFERENCES `Publishers` (`PublisherId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Books_Authors1` FOREIGN KEY (`Author`) REFERENCES `Authors` (`AuthorId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `fk_Cart_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Cart_Users1` FOREIGN KEY (`Users_userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Category_has_Book`
--
ALTER TABLE `Category_has_Book`
  ADD CONSTRAINT `fk_Category_has_Book_Book1` FOREIGN KEY (`Book_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Category_has_Book_Category1` FOREIGN KEY (`Category_CategoryId`) REFERENCES `Categories` (`CategoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Favorites`
--
ALTER TABLE `Favorites`
  ADD CONSTRAINT `fk_Favorites_Books1` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Favorites_Users1` FOREIGN KEY (`User`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Log`
--
ALTER TABLE `Log`
  ADD CONSTRAINT `UserId` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `fk_Order_Users1` FOREIGN KEY (`User`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Orders_has_Books`
--
ALTER TABLE `Orders_has_Books`
  ADD CONSTRAINT `fk_Books_has_Orders_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Books_has_Orders_Orders1` FOREIGN KEY (`Orders_OrderId`,`Orders_User`) REFERENCES `Orders` (`OrderId`, `User`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD CONSTRAINT `ISBNFK` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `USERIDFK` FOREIGN KEY (`UserId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Roles_has_Users`
--
ALTER TABLE `Roles_has_Users`
  ADD CONSTRAINT `fk_Roles_has_Users_Roles1` FOREIGN KEY (`Roles_idRole`) REFERENCES `Roles` (`idRole`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Roles_has_Users_Users1` FOREIGN KEY (`Users_userId`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Sales`
--
ALTER TABLE `Sales`
  ADD CONSTRAINT `fk_userid` FOREIGN KEY (`UserId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Sale_has_Books`
--
ALTER TABLE `Sale_has_Books`
  ADD CONSTRAINT `fk_isbn` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_saleid` FOREIGN KEY (`SaleId`) REFERENCES `Sales` (`SaleId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `UserCollections`
--
ALTER TABLE `UserCollections`
  ADD CONSTRAINT `fk_UserCollections_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_UserCollections_Users1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

