-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: data_warehouse
-- ------------------------------------------------------
-- Server version	8.0.25

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

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (50,'Jujuy',50,1),(51,'Cordoba',50,1),(52,'Tucuman',50,1),(53,'Monterrey',52,1),(54,'Guadalajara',52,1),(55,'Chihuahua',52,1),(56,'Dallas',54,1),(57,'Detroit',54,1),(58,'Cleveland',54,1),(59,'San Jose',53,1),(60,'Monteverde',53,1),(61,'Quepos',53,1),(62,'Toronto',55,1),(63,'Montreal',55,1),(64,'Ottawa',55,1),(65,'Montevideo',51,1),(66,'Punta del Este',51,1),(67,'Rivera',51,1);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (31,'Mercado Libre',51,'Belgrano 121','mercadolibre@gmail.com','3884137627',1),(32,'Google',51,'Belgrano 121','mercadolibre@gmail.com','3884137627',1),(33,'Globant',51,'Belgrano 121','mercadolibre@gmail.com','3884137627',1);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (31,'Matias Maximiliano Romano','romanomatias99@gmail.com',31,50,'Jose de la iglesia 1148','A desarrollar',1);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (50,'Argentina',50,1),(51,'Uruguay',50,1),(52,'Mexico',52,1),(53,'Costa Rica',52,1),(54,'Estados Unidos',51,1),(55,'Canada',51,1);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (50,'Sudamerica',1),(51,'Norteamerica',1),(52,'Centroamerica',1);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Matias Maximiliano Romano','romanomatias99@gmail.com','$2a$10$HJHcNO62wRe5UAd9LlOvxuBsJHjxYaHAOVsiiQqFPkHm6Qg3u2hNe','ADMIN',1),(31,'Jimena Romano','jimenitaro@gmail.com','$2a$10$VVtTzeKwxcGlBqef7EkZOODfEVdKvKJlNlzbN9qGPryx4.0kZ9aka','BASIC',1),(32,'Ariel Ruben Romano','arielruben@gmail.com','$2a$10$ImIxWeidS5ypCZ3er7kgFenaR4eeRGtOvNh4k8yAtzmVPN5B2TciC','BASIC',1),(33,'Sonia Leon','sobeleon19@gmail.com','$2a$10$py4laoV2WWrGYggF.wbTnObm6orXcSKYtd2odTC3OHrfq9pn4asvO','BASIC',1);
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

-- Dump completed on 2021-05-24 17:40:37
