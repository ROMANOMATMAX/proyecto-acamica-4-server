-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: data_warehouse
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE data_warehouse;

USE data_warehouse;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `region_id` int NOT NULL AUTO_INCREMENT,
  `region_name` varchar(50) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (50,'Sudamerica',1),(51,'Norteamerica',1),(52,'Centroamerica',1),(53,'Africa',1),(54,'Europa',1),(55,'Oceania',1),(56,'Europa del Este',0),(57,'hola1',0),(58,'HOLOOO',0),(59,'Region Otra',0),(60,'Region TEST',0);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `country_id` int NOT NULL AUTO_INCREMENT,
  `country_name` varchar(50) NOT NULL,
  `fk_region_id` int NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`country_id`),
  KEY `fk_region` (`fk_region_id`),
  CONSTRAINT `fk_region` FOREIGN KEY (`fk_region_id`) REFERENCES `regions` (`region_id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (50,'Argentina',50,1),(51,'Uruguay',50,1),(52,'Mexico',52,1),(53,'Costa Rica',52,1),(54,'Estados Unidos',51,1),(55,'CaNADA',51,1),(58,'Bolivia',50,1),(59,'Chile',50,1),(60,'Francia',54,1),(61,'Peru',50,1),(62,'Mozambique',53,1),(64,'Venezuela',50,1),(65,'Colombia',50,1),(66,'Brasil',50,1),(67,'Pais Otro',50,0),(68,'Pais de Prueba',59,0),(69,'Costa Rica',50,0),(70,'Country 2',51,0),(71,'Random Country',50,0),(72,'Random COuntry 2',50,0),(73,'Random country 3',50,0),(74,'random country 4',50,0),(75,'random country 5',50,0),(76,'country random 5',50,0),(77,'country random 6',50,0),(78,'country 3',51,0),(79,'country 4',52,0),(80,'Africa Country 2',53,0),(81,'OC country 1',55,0),(82,'country test 2',60,0);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(50) NOT NULL,
  `fk_country_id` int NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`city_id`),
  KEY `fk_country` (`fk_country_id`),
  CONSTRAINT `fk_country` FOREIGN KEY (`fk_country_id`) REFERENCES `countries` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (50,'Jujuy',50,0),(51,'Cordoba',50,1),(52,'Tucuman',50,0),(53,'Monterrey',52,1),(54,'Guadalajara',52,1),(55,'chihuahua',52,1),(56,'Dallas',54,1),(57,'Detroit',54,1),(58,'Cleveland',54,1),(59,'San Jose',53,1),(60,'Monteverde',53,1),(61,'Quepos',53,1),(62,'Toronto',55,0),(63,'MontREAL',55,0),(64,'OTTAWA',55,1),(65,'Montevideo',51,1),(66,'Punta del Este',51,1),(67,'Rivera',51,1),(68,'Catamarca',50,1),(71,'La Paz',58,1),(72,'Santiago',59,0),(73,'Paris',60,1),(74,'Santa Fe',50,1),(84,'San Petersburgo',62,1),(85,'La Rioja',50,0),(86,'Toronto',55,1),(87,'Lima',61,1),(88,'Santiago',59,1),(89,'Atacama',59,1),(90,'San Paulo',66,1),(91,'Ciudad 3',59,0),(92,'Ciudad 4',59,0),(93,'Ciudad 3',69,1),(94,'city random 1',77,1),(95,'city 1',78,1),(96,'city 0',79,1),(97,'africa city 1',80,1),(98,'OC city 1',81,1),(99,'City 7',59,0),(100,'city test 1',82,1),(101,'Caracas',64,1),(102,'Bogota',65,1),(103,'Porto Alegre',66,1);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `company_id` int NOT NULL,
  `fk_city_id` int NOT NULL,
  `address` varchar(60) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `fk_region_id` int NOT NULL,
  `fk_country_id` int NOT NULL,
  `charge` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (42,'Jimena ROMANO CAROLINA','jimenitaolicalyfa@gmail.com',50,98,'ocenia street',0,55,81,'DWFS'),(85,'Ed Sheeran','ed@gmail.com',37,53,'teniente dan 123',0,52,52,'DWFS'),(86,'Ed Sheeran','ed@gmail.com',37,73,'England',1,54,60,'Musician'),(87,'Ed Sheeran','ed@gmail.com',37,53,'teniente dan 123',0,52,52,'DWFS'),(88,'Matias Romano','romanomatias99@gmail.com',32,65,'jose de la iglesia 1148',0,50,51,'DWFS'),(89,'Matias Romano','romanomatias99@gmail.com',32,90,'jose de la iglesia 1148',0,50,66,'DWFS'),(90,'Matias Romano','romanomatias99@gmail.com',32,90,'jose de la iglesia 1148',0,50,66,'DWFS'),(91,'Matias Romano','romanomatias99@gmail.com',32,90,'jose de la iglesia 1148',0,50,66,'DWFS'),(92,'Matias Romano','romanomatias99@gmail.com',32,51,'address cordoba 1',1,50,50,'DWFS'),(93,'Matias Romano','romanomatias99@gmail.com',32,90,'jose de la iglesia 1148',0,50,66,'DWFS'),(94,'Matias Romano','romanomatias99@gmail.com',32,90,'jose de la iglesia 1148',0,50,66,'DWFS'),(95,'Matias Romano','romanomatias99@gmail.com',32,90,'jose de la iglesia 1148',0,50,66,'DWFS'),(96,'Matias Romano','romanomatias99@gmail.com',32,90,'jose de la iglesia 1148',0,50,66,'DWFS'),(98,'Matias Romano','romanomatias99@gmail.com',33,50,'jose de la iglesia 1148',0,50,50,'DWFS'),(99,'Jimena Romano','jime@gmail.com',37,73,'lapacho121',1,54,60,'DWFS'),(100,'Oscar Barraza ','barrazas@gmail.com',32,50,'Sgto Cabral',1,50,50,'DWFS'),(101,'Ariel Ruben Romano','ariroro@gmail.com',39,56,'Av. Alem 1000',1,51,54,'Arquitecto'),(102,'Matias Romano','romanomatias99@gmail.com',42,50,'jose de la iglesia 1148',0,50,50,'DWFS'),(103,'Matias Romano','romanomatias99@gmail.com',42,50,'jose de la iglesia 1148',0,50,50,'DWFS'),(104,'Matias Romano','romanomatias99@gmail.com',42,50,'jose de la iglesia 1148',0,50,50,'DWFS'),(105,'Matias Romano','romanomatias99@gmail.com',42,50,'jose de la iglesia 1148',0,50,50,'DWFS'),(106,'Matias Romano','romanomatias99@gmail.com',33,51,'Patio Olmos',0,50,50,'DWFS'),(107,'Matias Romano','romanomatias99@gmail.com',33,51,'Patio Olmos',0,50,50,'DWFS'),(108,'Matias Romano','romanomatias99@gmail.com',33,51,'jose de la iglesia 1148',0,50,50,'DWFS'),(109,'Matias Romano','romanomatias99@gmail.com',33,50,'jose de la iglesia 1148',0,50,50,'DWFS'),(110,'Matias Romano','romanomatias99@gmail.com',33,51,'jose de la iglesia 1148',0,50,50,'DWFS'),(111,'Matias Romano','romanomatias99@gmail.com',42,51,'jose de la iglesia 1148',0,50,50,'DWFS'),(112,'Jesus Cruz','cruzjesus@gmail.com',34,65,'calle de prueba 2',1,50,51,'Técnico en minas'),(113,'Matias Romano','romanomatias99@gmail.com',33,56,'address mati',1,51,54,'Técnico en minas'),(114,'Matias Romano','romanomatias99@gmail.com',37,67,'jose de la iglesia 1148',1,50,51,'Musician'),(115,'Matias Romano','romanomatias99@gmail.com',39,65,'jose de la iglesia 1148',1,50,51,'Técnico en minas'),(116,'Matias Romano','romanomatias99@gmail.com',38,66,'jose de la iglesia 1148',1,50,51,'Arquitecto'),(117,'Matias Romano','romanomatias99@gmail.com',41,58,'jose de la iglesia 1148',1,51,54,'Ingeniero en Minas');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `fk_city_id` int NOT NULL,
  `fk_country_id` int NOT NULL,
  `fk_region_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (31,'Mercado Libre','cheche','mercadolibre@gmail.com','12345',0,96,79,52),(32,'GOOGLE INC','calle ficticia 123','mercadolibre@gmail.com','3884137627',1,58,54,51),(33,'Globant','Belgrano 121','mercadolibre@gmail.com','3884137627',1,51,50,50),(34,'Cubimetric','Siempre Viva 200','mercadolibre@gmail.com','3884137627',1,56,54,51),(35,'Matias Romano','jose de la iglesia 1150','amazonprime@gmail.com','03884137627',0,56,54,51),(36,'Matias Romano','male','romanomatias99@gmail.com','(388) 413-7627',0,67,51,50),(37,'NETFLIX','belgrano 50','netflixcompany@gmail.com','12345',1,50,50,50),(38,'Disney Plus','male','disneyworld@gmail.com','12345',1,57,54,51),(39,'ROLLING CODE','Belgrano 150','rollingCode@gmail.com','3884137627',1,52,50,50),(40,'Matias Romano','female','romanomatias99@gmail.com','(388) 413-7627',0,61,53,52),(41,'SILICON VALLEY ','male','silval@gmail.com','12356464563',1,84,62,53),(42,'Platzi','female','platzi@gmail.com','57813251290',1,53,52,52),(43,'Acamica','female','acam@gmail.com','12304591324',0,51,50,50),(44,'New Tech lead','other','leadtech@gmail.com','82457245',1,56,54,51),(45,'Pixar','male','pixarCompany@gmail.com','913912',0,73,60,54),(46,'Microsoft','female','microsoft@gmail.com','12345135',1,58,54,51),(47,'Marvel production','male','marvel@gmail.com','9181341',1,66,51,50),(48,'Nova','other','nova@gmail.com','918313',0,51,50,50),(49,'papomc','female','paporapper@gmail.com','18341347134',0,54,52,52),(50,'Accenture','other','accenture@gmail.com','13813513',0,56,54,51),(51,'Citric','jose de la iglesia 1148','citricostucuman@gmail.com','3884127628',0,56,54,51),(52,'citric','jose de la iglesia 1150','citrictucuman@gmail.com','03884137627',0,51,50,50),(53,'citric','dalton 150','citricostucuman@gmail.com','03884137627',0,56,54,51),(54,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(55,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,71,58,50),(56,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,56,54,51),(57,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(58,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,56,54,51),(59,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,56,54,51),(60,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(61,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(62,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(63,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(64,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(65,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(66,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(67,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(68,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50),(69,'Matias Romano','jose de la iglesia 1148','romanomatias99@gmail.com','(388) 413-7627',0,50,50,50);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channels`
--

DROP TABLE IF EXISTS `channels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channels`
--

LOCK TABLES `channels` WRITE;
/*!40000 ALTER TABLE `channels` DISABLE KEYS */;
INSERT INTO `channels` VALUES (1,'Whatsapp'),(2,'Llamada'),(3,'Email'),(4,'LinkedIn'),(5,'Facebook'),(6,'Instagram');
/*!40000 ALTER TABLE `channels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacttochannel`
--

DROP TABLE IF EXISTS `contacttochannel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacttochannel` (
  `contact_to_channel_id` int NOT NULL AUTO_INCREMENT,
  `contact_id` int NOT NULL,
  `channel_id` int NOT NULL,
  `channel_value` varchar(70) NOT NULL,
  `preference` varchar(70) NOT NULL,
  PRIMARY KEY (`contact_to_channel_id`),
  KEY `fk_contact` (`contact_id`),
  KEY `fk_channel` (`channel_id`),
  CONSTRAINT `fk_channel` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`id`),
  CONSTRAINT `fk_contact` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacttochannel`
--

LOCK TABLES `contacttochannel` WRITE;
/*!40000 ALTER TABLE `contacttochannel` DISABLE KEYS */;
INSERT INTO `contacttochannel` VALUES (1,42,2,'3884137627','fv'),(2,42,1,'3884137627','sp'),(3,85,1,'3884127627','fv'),(4,85,2,'3884127627','sp'),(5,85,4,'edsheeran/','fv'),(6,85,5,'abcd','sp'),(11,87,1,'3884127627','fv'),(12,87,2,'3884127627','sp'),(13,87,4,'edsheeran/','fv'),(14,87,5,'abcd','sp'),(15,88,1,'afafae','fv'),(16,88,2,'123123','fv'),(17,88,5,'caecaaceacecaec','nm'),(18,89,2,'afafae','fv'),(19,89,4,'123123','fv'),(20,89,6,'caecaaceacecaec','fv'),(21,89,5,'acaca','fv'),(22,90,2,'afafae','fv'),(23,90,4,'123123','fv'),(24,90,6,'caecaaceacecaec','fv'),(25,90,5,'acaca','fv'),(26,91,2,'afafae','fv'),(27,91,4,'123123','fv'),(28,91,6,'caecaaceacecaec','fv'),(29,91,5,'acaca','fv'),(34,93,2,'afafae','fv'),(35,93,4,'123123','fv'),(36,93,6,'caecaaceacecaec','fv'),(37,93,5,'acaca','fv'),(38,94,2,'afafae','fv'),(39,94,4,'123123','fv'),(40,94,6,'caecaaceacecaec','fv'),(41,94,5,'acaca','fv'),(42,95,2,'afafae','fv'),(43,95,4,'123123','fv'),(44,95,6,'caecaaceacecaec','fv'),(45,95,5,'acaca','fv'),(46,96,2,'afafae','fv'),(47,96,4,'123123','fv'),(48,96,6,'caecaaceacecaec','fv'),(49,96,5,'acaca','fv'),(50,98,2,'afafae','fv'),(51,98,4,'123123','fv'),(52,98,5,'caecaaceacecaec','fv'),(76,99,1,'3884762810','fv'),(77,99,4,'jimenitaro@gmail.com','sp'),(81,102,2,'98765','fv'),(82,103,2,'98765','fv'),(83,104,2,'98765','fv'),(84,105,2,'98765','fv'),(85,106,1,'3884137625','fv'),(86,107,1,'3884137625','fv'),(87,108,1,'3884768412','fv'),(88,109,1,'3884137625','sp'),(89,110,1,'3884768412','fv'),(90,111,1,'3884137625','fv'),(95,92,2,'afafae','fv'),(96,92,4,'123123','fv'),(103,86,1,'3884127627','fv'),(104,86,2,'3884127627','sp'),(105,101,2,'388413675439','fv'),(106,101,4,'ariro','sp'),(109,112,1,'3884768412','fv'),(110,112,6,'jesuscruz07','sp'),(111,113,1,'3884768412','fv'),(112,114,1,'3884768412','fv'),(113,115,1,'3884768412','fv'),(114,116,1,'3884768412','fv'),(115,117,1,'3884768412','fv'),(116,100,2,'3884768412','fv');
/*!40000 ALTER TABLE `contacttochannel` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` enum('ADMIN','BASIC') NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Matias Maximiliano Romano','romanomatias99@gmail.com','$2a$10$HJHcNO62wRe5UAd9LlOvxuBsJHjxYaHAOVsiiQqFPkHm6Qg3u2hNe','ADMIN',1),(31,'Jimena Romano','jimenitaro@gmail.com','$2a$10$VVtTzeKwxcGlBqef7EkZOODfEVdKvKJlNlzbN9qGPryx4.0kZ9aka','BASIC',0),(32,'Ariel Ruben Romano','arielruben@gmail.com','$2a$10$XArHUZLvzFtAbDtck.czAO887JWFSmSw73lSnqK6af6BQgIA5O7.K','BASIC',1),(33,'Sonia Leon','sobeleon19@gmail.com','$2a$10$py4laoV2WWrGYggF.wbTnObm6orXcSKYtd2odTC3OHrfq9pn4asvO','BASIC',0),(34,'Rolling Code','jimecaroromano@gmail.com','$2a$10$q/2BwynoYqsT8CUgRkINduGn6i73EMGE0D.dZlS4LoSrARX2.BfH6','BASIC',1),(35,'Agustina Rivera','agus@gmail.com','$2a$10$7soIdhK83v6RDG82XC9YdezfQxYhKiVuu6GWaASEsIru/UL6MYjqC','BASIC',1),(36,'German Antonio Romano','gero@gmail.com','$2a$10$ISREhgzS8rhdFxCaRnW.bebp4c4tWHu.Ek7u/n022V/SPuKV5uJf2','BASIC',0),(37,'Flavia Romano','flavitaro12@gmail.com','$2a$10$5KWIsz.ge1EGPX2fQ8dQ4.rdNt8cPlYXqAaPD9a78ZgmLcsZVuah2','BASIC',0),(38,'Matias Romano','romanomatias995@gmail.com','$2a$10$LyS2mgZhbYL0JBW7W.C7/edscSAxrd5QbQw67ek6eiOXbcYXSNmAa','BASIC',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-16  9:03:43