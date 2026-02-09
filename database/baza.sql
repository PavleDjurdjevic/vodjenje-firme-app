-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: vodjenje_firme
-- ------------------------------------------------------
-- Server version	5.7.44-log

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
-- Table structure for table `korisnici_sistema`
--

DROP TABLE IF EXISTS `korisnici_sistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnici_sistema` (
  `korisnik_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `korisnik_ime` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `korisnik_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `korisnik_lozinka` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `korisnik_uloga` enum('neulogovan','ulogovan','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`korisnik_id`),
  UNIQUE KEY `korsnik_email_UNIQUE` (`korisnik_email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnici_sistema`
--

LOCK TABLES `korisnici_sistema` WRITE;
/*!40000 ALTER TABLE `korisnici_sistema` DISABLE KEYS */;
INSERT INTO `korisnici_sistema` VALUES (1,'Admin','admin@firma.com','admin123','admin'),(2,'Milan Marković','milan@firma.com','1234','ulogovan'),(3,'Ana Anić','ana@firma.com','1234','ulogovan'),(6,'Petar Petrovic','petar@firma.com','lozinka123','ulogovan'),(8,'Admin2','admin2@firma.com','admin123','admin'),(9,'Slobodanka Djurdjevic','slobodanka@firma.com','lozinka123','ulogovan');
/*!40000 ALTER TABLE `korisnici_sistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odeljenja`
--

DROP TABLE IF EXISTS `odeljenja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `odeljenja` (
  `odeljenje_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `odeljenje_naziv` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `odeljenje_opis` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`odeljenje_id`),
  UNIQUE KEY `odeljenje_naziv_UNIQUE` (`odeljenje_naziv`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odeljenja`
--

LOCK TABLES `odeljenja` WRITE;
/*!40000 ALTER TABLE `odeljenja` DISABLE KEYS */;
INSERT INTO `odeljenja` VALUES (1,'HR','Ljudski resursi'),(2,'IT','Informacione tehnologije'),(4,'Pravna služba','Pravni sektor'),(6,'GR','Građevinski sektor'),(7,'HG','Higijena');
/*!40000 ALTER TABLE `odeljenja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odsustva`
--

DROP TABLE IF EXISTS `odsustva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `odsustva` (
  `odsustvo_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `zap_id` int(11) unsigned NOT NULL,
  `odsustvo_datum_pocetka` date NOT NULL,
  `odsustvo_datum_kraja` date NOT NULL,
  `odsustvo_tip` enum('bolovanje','odmor','sluzbeni put','neplaceno') NOT NULL,
  PRIMARY KEY (`odsustvo_id`),
  KEY `zap_id_idx` (`zap_id`),
  CONSTRAINT `fk_odsustva_zaposleni` FOREIGN KEY (`zap_id`) REFERENCES `zaposleni` (`zap_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odsustva`
--

LOCK TABLES `odsustva` WRITE;
/*!40000 ALTER TABLE `odsustva` DISABLE KEYS */;
INSERT INTO `odsustva` VALUES (2,8,'2025-12-09','2025-12-14','odmor'),(3,7,'2025-12-05','2025-12-12','bolovanje'),(4,8,'2025-12-22','2025-12-26','sluzbeni put'),(5,11,'2025-12-10','2025-12-13','bolovanje'),(6,13,'2026-01-13','2026-01-21','sluzbeni put');
/*!40000 ALTER TABLE `odsustva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `radna_mesta`
--

DROP TABLE IF EXISTS `radna_mesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radna_mesta` (
  `radno_mesto_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `radno_mesto_naziv` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `odeljenje_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`radno_mesto_id`),
  UNIQUE KEY `radno_mesto_naziv_UNIQUE` (`radno_mesto_naziv`),
  KEY `odeljenje_id_idx` (`odeljenje_id`),
  CONSTRAINT `fk_radna_mesta_odeljenja` FOREIGN KEY (`odeljenje_id`) REFERENCES `odeljenja` (`odeljenje_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `radna_mesta`
--

LOCK TABLES `radna_mesta` WRITE;
/*!40000 ALTER TABLE `radna_mesta` DISABLE KEYS */;
INSERT INTO `radna_mesta` VALUES (18,'Backend Developer',2),(19,'Frontend Developer',2),(21,'Pravni rukovodilac',4),(23,'Higijeničar',7);
/*!40000 ALTER TABLE `radna_mesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zaposleni`
--

DROP TABLE IF EXISTS `zaposleni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zaposleni` (
  `zap_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `zap_ime` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zap_prezime` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zap_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `radno_mesto_id` int(11) unsigned NOT NULL,
  `zap_plata` decimal(10,2) NOT NULL,
  `zap_datum_zaposlenja` date NOT NULL,
  PRIMARY KEY (`zap_id`),
  UNIQUE KEY `zap_email_UNIQUE` (`zap_email`),
  KEY `radno_mesto_id_idx` (`radno_mesto_id`),
  CONSTRAINT `fk_zaposleni_radna_mesta` FOREIGN KEY (`radno_mesto_id`) REFERENCES `radna_mesta` (`radno_mesto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zaposleni`
--

LOCK TABLES `zaposleni` WRITE;
/*!40000 ALTER TABLE `zaposleni` DISABLE KEYS */;
INSERT INTO `zaposleni` VALUES (7,'Milan','Marković','milan@firma.com',18,75000.00,'2023-05-10'),(8,'Ana','Anić','ana@firma.com',18,82000.00,'2022-09-01'),(11,'Petar','Petrovic','petar@firma.com',21,100000.00,'2025-12-08'),(13,'Slobodanka','Djurdjevic','slobodanka@firma.com',21,250000.00,'2026-01-13');
/*!40000 ALTER TABLE `zaposleni` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-27 16:55:53
