-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 52.139.214.15    Database: DATN
-- ------------------------------------------------------
-- Server version	5.7.38-0ubuntu0.18.04.1

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
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20220521062927_user.js',1,'2022-05-23 13:42:27'),(2,'20220521063542_store.js',1,'2022-05-23 13:42:27'),(3,'20220606064536_tax.js',2,'2022-06-06 13:48:26'),(4,'20220625123334_coupon.js',3,'2022-06-25 19:40:39'),(5,'20220708093946_variant.js',4,'2022-07-08 20:01:31'),(6,'20220708094005_variant_group.js',4,'2022-07-08 20:01:31'),(7,'20220708094020_addon.js',4,'2022-07-08 20:01:31'),(8,'20220708094025_addon_group.js',4,'2022-07-08 20:01:31'),(9,'20220709131726_category.js',5,'2022-07-09 20:22:37'),(10,'20220709131731_product.js',5,'2022-07-09 20:22:37'),(11,'20220710062928_petty_cash.js',6,'2022-07-10 13:35:08'),(12,'20220711084810_customer.js',7,'2022-07-11 15:50:49'),(13,'20220727134150_order.js',8,'2022-07-27 20:55:34'),(14,'20220727134201_booking_order.js',9,'2022-07-27 20:58:18'),(15,'20220727134225_immediate_sale_order.js',10,'2022-07-27 20:59:37'),(16,'20220727134240_order_item.js',10,'2022-07-27 20:59:37'),(17,'20220727134249_order_item_addon.js',10,'2022-07-27 20:59:38'),(18,'20220727135101_canceled_order.js',10,'2022-07-27 20:59:38');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-29 22:59:56
