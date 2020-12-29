

CREATE DATABASE IF NOT EXISTS  myDatabase;

DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS book_type;
DROP TABLE IF EXISTS gender;

-- Table structure for table `book_type`
--
DROP TABLE IF EXISTS `book_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_type` (
                             `id`   int(11) NOT NULL AUTO_INCREMENT,
                             `type` varchar(20) NOT NULL,
                             PRIMARY KEY (`id`),
                             UNIQUE KEY `id_UNIQUE` (`id`),
                             UNIQUE KEY `type_UNIQUE` (`type`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_type`
--

LOCK TABLES `book_type` WRITE;
/*!40000 ALTER TABLE `book_type` DISABLE KEYS */;
INSERT INTO `book_type` VALUES
                               (1,'Romance'),
                               (2,'Action'),
                               (3,'History'),
                               (4,'Sport'),
                               (5,'Education'),
                               (6,'Fantasy');
/*!40000 ALTER TABLE `book_type` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `gender`
--


DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gender` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `type` varchar(15) NOT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `id_UNIQUE` (`id`),
                          UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'Male'),
                            (2,'Female'),
                            (3,'Not specified');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `name` varchar(30) NOT NULL,
                        `age` int(11) NOT NULL,
                        `gender` int(11) NOT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `id_UNIQUE` (`id`),
                        KEY `FK_GENDER_ID_idx` (`gender`),
                        CONSTRAINT `FK_GENDER_ID` FOREIGN KEY (`gender`) REFERENCES `gender` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Zacky',22,1),
                          (3,'Alice',22,2),
                          (4,'Lars',50,1),
                          (5,'Max',30,1),
                          (6,'Anita',27,2),
                          (7,'Emma',80,2),
                          (8,'Matias',26,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
                        `id`             INT         NOT NULL AUTO_INCREMENT,
                        `author_id`      int(11)     NOT NULL,
                        `title`          TEXT        NOT NULL,
                        `publisher`      varchar(20) NOT NULL,
                        `publishingYear` varchar(50) NOT NULL,
                        `book_type_id`   int(11)     NOT NULL,
                        `rating`         int(11)     NOT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `id_UNIQUE` (`id`),
                        KEY `FK_USER_ID_idx` (`author_id`),
                        CONSTRAINT `FK_USER_ID` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
                        KEY `FK_TYPE_ID_idx` (`book_type_id`),
                        CONSTRAINT `FK_TYPE_ID` FOREIGN KEY (`book_type_id`) REFERENCES `book_type` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,2,'book1','SweBook',2012, 1, 4),
                          (2,3,'book2','SweBook',1932, 5, 5),
                          (3,5,'book3','SweBook',2008, 1, 2),
                          (4,6,'book4','Francbook',2001, 3, 5),
                          (5,2,'book5','Francbook',2042, 5, 6),
                          (6,4,'book6','Francbook',1990, 4, 5),
                          (7,3,'book7','Francbook',1942, 3, 6);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;



CREATE OR REPLACE VIEW v_users_with_book
AS
SELECT DISTINCT u.id, u.name FROM user u LEFT JOIN book b ON u.id = b.author_id
WHERE u.id IN (b.author_id);


-- Dump completed on 2017-12-24  1:27:26
