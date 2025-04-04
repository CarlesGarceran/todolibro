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
  PRIMARY KEY (`ISBN`),
  KEY `fk_Book_Publisher1_idx` (`Publisher`),
  KEY `fk_Books_Authors1_idx` (`Author`),
  CONSTRAINT `fk_Book_Publisher1` FOREIGN KEY (`Publisher`) REFERENCES `Publishers` (`PublisherId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Books_Authors1` FOREIGN KEY (`Author`) REFERENCES `Authors` (`AuthorId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `Users_userId` int(11) NOT NULL,
  `Books_ISBN` varchar(30) NOT NULL,
  PRIMARY KEY (`Users_userId`,`Books_ISBN`),
  KEY `fk_Cart_Books1_idx` (`Books_ISBN`),
  CONSTRAINT `fk_Cart_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cart_Users1` FOREIGN KEY (`Users_userId`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `fk_Category_has_Book_Book1` FOREIGN KEY (`Book_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Category_has_Book_Category1` FOREIGN KEY (`Category_CategoryId`) REFERENCES `Categories` (`CategoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `Orders_has_Books`
--

DROP TABLE IF EXISTS `Orders_has_Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders_has_Books` (
  `Books_ISBN` varchar(30) NOT NULL,
  `Orders_OrderId` int(11) NOT NULL,
  `Orders_User` int(11) NOT NULL,
  PRIMARY KEY (`Books_ISBN`,`Orders_OrderId`,`Orders_User`),
  KEY `fk_Books_has_Orders_Orders1_idx` (`Orders_OrderId`,`Orders_User`),
  KEY `fk_Books_has_Orders_Books1_idx` (`Books_ISBN`),
  CONSTRAINT `fk_Books_has_Orders_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Books_has_Orders_Orders1` FOREIGN KEY (`Orders_OrderId`, `Orders_User`) REFERENCES `Orders` (`OrderId`, `User`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `ISBN` varchar(30) NOT NULL,
  `UserId` int(11) NOT NULL DEFAULT 0,
  `Comment` varchar(255) NOT NULL DEFAULT '',
  `Rating` decimal(1,0) unsigned NOT NULL DEFAULT 0,
  KEY `ISBNFK` (`ISBN`),
  KEY `USERIDFK` (`UserId`),
  CONSTRAINT `ISBNFK` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `USERIDFK` FOREIGN KEY (`UserId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `fk_UserCollections_Books1` FOREIGN KEY (`Books_ISBN`) REFERENCES `Books` (`ISBN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_UserCollections_Users1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `ProfilePicture` varchar(45) NOT NULL,
  `PasswordHash` text NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2025-04-03 16:23:11
