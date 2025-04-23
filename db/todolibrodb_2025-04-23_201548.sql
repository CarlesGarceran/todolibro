/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.21-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 192.168.1.254    Database: todolibrodb
-- ------------------------------------------------------
-- Server version	10.6.21-MariaDB-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Authors`
--

DROP TABLE IF EXISTS `Authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Authors` (
  `AuthorId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Image` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`AuthorId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authors`
--

/*!40000 ALTER TABLE `Authors` DISABLE KEYS */;
INSERT INTO `Authors` VALUES (1,'El Rubius',''),(2,'Àlan Greus',''),(3,'Till Lindemann','');
/*!40000 ALTER TABLE `Authors` ENABLE KEYS */;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `ISBN` varchar(30) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Publisher` int(11) NOT NULL,
  `Author` int(11) NOT NULL,
  `Image` varchar(255) DEFAULT '',
  `LaunchDate` date DEFAULT NULL,
  `Price` decimal(20,6) DEFAULT NULL,
  `Synopsis` text NOT NULL DEFAULT 'No se tiene una sinopsis de este libro.',
  `Stock` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ISBN`),
  KEY `fk_Book_Publisher1_idx` (`Publisher`),
  KEY `fk_Books_Authors1_idx` (`Author`),
  CONSTRAINT `fk_Book_Publisher1` FOREIGN KEY (`Publisher`) REFERENCES `Publishers` (`PublisherId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Books_Authors1` FOREIGN KEY (`Author`) REFERENCES `Authors` (`AuthorId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES ('9783866907058','Amazonas – Reise zum Rio Javari',3,3,'/assets/libros/amazonas_reise_zum_rio_javari.avif','2021-12-17',40.250000,'Till Lindemann and Joey Kelly, two men of extremes: One is the singer of \"Rammstein\", who strikes provocative as well as fine tones in his lyrics; the other is a member of the Kelly Family and an endurance athlete.  Both enjoy being on the water and follow - as they did on their Yukon trip - the \"myth\" of a legendary river.  Exclusive photographs by Thomas Stachelhaus and Matthias Matthies tell of their adventures on the Río Yavarí, an untouched tributary of the Amazon.  With poems by Till Lindemann and an interview with both artists.  Exclusive photographs by Thomas Stachelhaus and Matthias Matthies.  Extraordinary, bibliophile furnishings in opulent landscape format.',14),('9788476603079','L\'Amulet Egipci',2,2,'/assets/libros/l_amulet_egipci_alan_greus.jpg','1997-02-19',8.550000,'Francesc visita un museu d\'art egipci amb la classe. Però no s\'imagina que aquest fet esdevindrà el començament d\'una arriscada aventura que es desencadena amb el robatori d\'un valuós pectoral.PREMI FUNDACIÓ BANCAIXA DE NARRATIVA JUVENIL Francesc és un jove apassionat per les civilitzacions antigues i pels llibres que parlen de troballes arqueològiques. Un bon dia, la professora d\'Història anuncia a la classe la visita a una exposició d\'art egipci i Francesc creu descobrir finalment la utilitat de les «activitats extraescolars». Però no s\'imagina que aquella visita pot ser el començament d\'una arriscada aventura que es desecandena amb el robatori d\'un valuós pectoral exposat al museu i amb l\'aparició d\'un enigmàtic personatge que requereix la seua ajuda.',666),('9788499983196','El Libro Troll',1,1,'/assets/libros/el_libro_troll_rubius.png','2014-05-17',8.250000,'Criaturitas del señor, este es el libro de ElRubius, el youtuber con más subs de España: más de 10 millones de suscriptores.   Tu vida es un libro a medio construir, una aventura espontánea, un juego a veces provocador, pero siempre extraordinario. elrubius, un auténtico fenómeno de YouTube, está dispuesto a acompañarte en una experiencia que recoge tus momentos más gloriosos. Se llama EL LIBRO TROLL y es su última locura: un cuaderno de actividades, un libro interactivo, un álbum de recuerdos…  Con un maestro extraordinario: elrubius.  ¡DALE CALOOOOOOH!  Rubén Doblas, elrubius, es el principal youtuber (por número de reproducciones y suscriptores) de España y uno de los primeros del mundo; un absoluto fenómeno de masas en las redes sociales.  En su página www.youtube.com/user/elrubiusOMG realiza sketches, gameplays, videoblogs y secciones fijas de gran éxito en las que aparece su propia imagen.',55);
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `Users_userId` int(11) NOT NULL,
  `Books_ISBN` varchar(30) NOT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`Users_userId`,`Books_ISBN`),
  KEY `fk_Cart_Books1_idx` (`Books_ISBN`),
  CONSTRAINT `fk_Cart_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Cart_Users1` FOREIGN KEY (`Users_userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES (9,'9788476603079',1);
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `CategoryId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`CategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Juvenil'),(2,'Libros de influencers'),(3,'Más de 13 años');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;

--
-- Table structure for table `Category_has_Book`
--

DROP TABLE IF EXISTS `Category_has_Book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category_has_Book` (
  `Category_CategoryId` int(11) NOT NULL,
  `Book_ISBN` varchar(30) NOT NULL,
  PRIMARY KEY (`Category_CategoryId`,`Book_ISBN`),
  KEY `fk_Category_has_Book_Book1_idx` (`Book_ISBN`),
  KEY `fk_Category_has_Book_Category1_idx` (`Category_CategoryId`),
  CONSTRAINT `fk_Category_has_Book_Book1` FOREIGN KEY (`Book_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Category_has_Book_Category1` FOREIGN KEY (`Category_CategoryId`) REFERENCES `Categories` (`CategoryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category_has_Book`
--

/*!40000 ALTER TABLE `Category_has_Book` DISABLE KEYS */;
INSERT INTO `Category_has_Book` VALUES (1,'9788476603079'),(1,'9788499983196'),(2,'9788499983196');
/*!40000 ALTER TABLE `Category_has_Book` ENABLE KEYS */;

--
-- Table structure for table `Favorites`
--

DROP TABLE IF EXISTS `Favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Favorites` (
  `User` int(11) NOT NULL,
  `ISBN` varchar(30) NOT NULL,
  PRIMARY KEY (`ISBN`,`User`),
  KEY `fk_Favorites_Users1_idx` (`User`),
  KEY `fk_Favorites_Books1_idx` (`ISBN`),
  CONSTRAINT `fk_Favorites_Books1` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Favorites_Users1` FOREIGN KEY (`User`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favorites`
--

/*!40000 ALTER TABLE `Favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `Favorites` ENABLE KEYS */;

--
-- Table structure for table `Log`
--

DROP TABLE IF EXISTS `Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Log` (
  `userId` int(11) NOT NULL,
  `Action` varchar(255) NOT NULL,
  `Time` datetime NOT NULL,
  KEY `UserId` (`userId`),
  CONSTRAINT `UserId` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Log`
--

/*!40000 ALTER TABLE `Log` DISABLE KEYS */;
INSERT INTO `Log` VALUES (8,'User: \'Carles\', Has Entered into the administration panel.','2025-04-23 18:10:33'),(8,'User: \'Carles\', Has Entered into the administration panel.','2025-04-23 18:54:40'),(8,'User: \'Carles\', Has Entered into the administration panel.','2025-04-23 18:57:58'),(8,'User: \'Carles\', Has Entered into the administration panel.','2025-04-23 18:57:58');
/*!40000 ALTER TABLE `Log` ENABLE KEYS */;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `OrderId` int(11) NOT NULL AUTO_INCREMENT,
  `User` int(11) NOT NULL,
  PRIMARY KEY (`OrderId`,`User`),
  KEY `fk_Order_Users1_idx` (`User`),
  CONSTRAINT `fk_Order_Users1` FOREIGN KEY (`User`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;

--
-- Table structure for table `Orders_has_Books`
--

DROP TABLE IF EXISTS `Orders_has_Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders_has_Books` (
  `Books_ISBN` varchar(30) NOT NULL,
  `Orders_OrderId` int(11) NOT NULL,
  `Orders_User` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`Books_ISBN`,`Orders_OrderId`,`Orders_User`),
  KEY `fk_Books_has_Orders_Orders1_idx` (`Orders_OrderId`,`Orders_User`),
  KEY `fk_Books_has_Orders_Books1_idx` (`Books_ISBN`),
  CONSTRAINT `fk_Books_has_Orders_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Books_has_Orders_Orders1` FOREIGN KEY (`Orders_OrderId`, `Orders_User`) REFERENCES `Orders` (`OrderId`, `User`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders_has_Books`
--

/*!40000 ALTER TABLE `Orders_has_Books` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders_has_Books` ENABLE KEYS */;

--
-- Table structure for table `Publishers`
--

DROP TABLE IF EXISTS `Publishers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Publishers` (
  `PublisherId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Image` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`PublisherId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Publishers`
--

/*!40000 ALTER TABLE `Publishers` DISABLE KEYS */;
INSERT INTO `Publishers` VALUES (1,'Ediciones Martínez Roca',''),(2,'Edicions Bromera',''),(3,'National Geographic Deutschland','');
/*!40000 ALTER TABLE `Publishers` ENABLE KEYS */;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `ISBN` varchar(30) NOT NULL,
  `UserId` int(11) NOT NULL DEFAULT 0,
  `Comment` varchar(255) NOT NULL DEFAULT '',
  `Rating` decimal(20,6) NOT NULL DEFAULT 0.000000,
  UNIQUE KEY `UNIQUE_PAIR` (`ISBN`,`UserId`),
  KEY `ISBNFKINDEX` (`ISBN`),
  KEY `USERFKINDEX` (`UserId`),
  CONSTRAINT `ISBNFK` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `USERIDFK` FOREIGN KEY (`UserId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
INSERT INTO `Reviews` VALUES ('9783866907058',8,'Que grande el viejo sabroso.',5.000000),('9783866907058',10,'Angostio manda aquí, cajones',4.500000),('9788499983196',3,'Ni fu ni fa',3.000000),('9788499983196',7,'No me pagan',2.500000);
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `idRole` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` text NOT NULL,
  `RoleId` int(11) NOT NULL,
  PRIMARY KEY (`idRole`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'Overseer',255),(2,'Site Administrator',254),(3,'Administrator',180),(4,'Moderator',127),(5,'Content Manager',130),(6,'GOD',-1);
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;

--
-- Table structure for table `Roles_has_Users`
--

DROP TABLE IF EXISTS `Roles_has_Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles_has_Users` (
  `Users_userId` int(11) NOT NULL,
  `Roles_idRole` int(11) NOT NULL,
  PRIMARY KEY (`Roles_idRole`,`Users_userId`),
  KEY `fk_Roles_has_Users_Users1_idx` (`Users_userId`),
  KEY `fk_Roles_has_Users_Roles1_idx` (`Roles_idRole`),
  CONSTRAINT `fk_Roles_has_Users_Roles1` FOREIGN KEY (`Roles_idRole`) REFERENCES `Roles` (`idRole`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Roles_has_Users_Users1` FOREIGN KEY (`Users_userId`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles_has_Users`
--

/*!40000 ALTER TABLE `Roles_has_Users` DISABLE KEYS */;
INSERT INTO `Roles_has_Users` VALUES (8,1),(9,2),(3,3);
/*!40000 ALTER TABLE `Roles_has_Users` ENABLE KEYS */;

--
-- Table structure for table `Sale_has_Books`
--

DROP TABLE IF EXISTS `Sale_has_Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sale_has_Books` (
  `SaleId` int(11) NOT NULL,
  `ISBN` varchar(30) NOT NULL,
  KEY `fk_saleid` (`SaleId`),
  KEY `fk_isbn` (`ISBN`),
  CONSTRAINT `fk_isbn` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_saleid` FOREIGN KEY (`SaleId`) REFERENCES `Sales` (`SaleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sale_has_Books`
--

/*!40000 ALTER TABLE `Sale_has_Books` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sale_has_Books` ENABLE KEYS */;

--
-- Table structure for table `Sales`
--

DROP TABLE IF EXISTS `Sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sales` (
  `SaleId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Price` decimal(11,0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`SaleId`),
  KEY `fk_userid` (`UserId`),
  CONSTRAINT `fk_userid` FOREIGN KEY (`UserId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sales`
--

/*!40000 ALTER TABLE `Sales` DISABLE KEYS */;
INSERT INTO `Sales` VALUES (1,3,9);
/*!40000 ALTER TABLE `Sales` ENABLE KEYS */;

--
-- Table structure for table `UserCollections`
--

DROP TABLE IF EXISTS `UserCollections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCollections` (
  `ShelfId` varchar(45) NOT NULL,
  `Collection Name` varchar(45) NOT NULL,
  `Owner` int(11) NOT NULL,
  `Books_ISBN` varchar(30) NOT NULL,
  PRIMARY KEY (`ShelfId`),
  KEY `fk_UserCollections_Users1_idx` (`Owner`),
  KEY `fk_UserCollections_Books1_idx` (`Books_ISBN`),
  CONSTRAINT `fk_UserCollections_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_UserCollections_Users1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCollections`
--

/*!40000 ALTER TABLE `UserCollections` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserCollections` ENABLE KEYS */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `ProfilePicture` text NOT NULL,
  `PasswordHash` text NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (3,'admin','admin@admin.com','https://media.tenor.com/QEqqUamGWiMAAAAi/darling-in-the-franxx-zero-two.gif','cd372fb85148700fa88095e3492d3f9f5beb43e555e5ff26d95f5a6adc36f8e6'),(7,'User','user@user.com','/assets/default_pfp.png','7b3d979ca8330a94fa7e9e1b466d8b99e0bcdea1ec90596c0dcc8d7ef6b4300c'),(8,'Carles','carles@gmail.com','https://media1.tenor.com/m/9r9heJfJwKcAAAAd/medabeda.gif','173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705'),(9,'pablito','pablo@gmail.com','/assets/default_pfp.png','ed92e4c7e54e3f4a29d8041ec93124bd3c1ec4825701cac42b3fffaf0bd7120a'),(10,'Angostio','angostio@gmail.com','https://media1.tenor.com/m/InzuVTz0zM8AAAAd/tralalelo-tralala-bombardiro-crocodilo.gif','cd372fb85148700fa88095e3492d3f9f5beb43e555e5ff26d95f5a6adc36f8e6');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;

--
-- Dumping routines for database 'todolibrodb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 20:15:52
