/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `washing_machine`;
CREATE TABLE `washing_machine` (
    `wm_id`     INT(3)  AUTO_INCREMENT,
    `wm_brand`  VARCHAR(30),
    `wm_model`  VARCHAR(30),
    `wm_status` INT(1)  NOT NULL,
    `queue_id`  INT(3)  ,
    PRIMARY KEY (`wm_id`),
    FOREIGN KEY (`queue_id`) REFERENCES `has_queue`(`queue_id`)
);

DROP TABLE IF EXISTS `washing_option`;
CREATE TABLE `washing_option` (
    `option_id`     INT(2)  AUTO_INCREMENT,
    `option_brand`  VARCHAR(10),
    `option_cost`   INT(2)  NOT NULL,
    `option_time`   INT(3)  NOT NULL,
    PRIMARY KEY (`option_id`)
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id`       INT(10) AUTO_INCREMENT,
    `email`    VARCHAR(50) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
    `id`        INT(10) AUTO_INCREMENT,
    `user_id`   INT(10) NOT NULL,
    `token`     varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `tokens_UN` (`token`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `has_queue`;
CREATE TABLE `has_queue` (
    `queue_id`  INT(3)      AUTO_INCREMENT,
    `wm_id`     INT(3)  NOT NULL,
    `user_id`   INT(10) NOT NULL,
    PRIMARY KEY (`queue_id`),
    FOREIGN KEY (`wm_id`) REFERENCES `washing_machine`(`wm_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

DROP TABLE IF EXISTS `usage_history`;
CREATE TABLE `usage_history` (
    `use_id`        INT(3)  AUTO_INCREMENT,
    `use_date`      DATE,
    `use_time`      TIME,
    `use_payment`   VARCHAR(20),
    `wm_id`     INT(3)  NOT NULL,
    `user_id`   INT(10) NOT NULL,
    `option_id` INT(2)  NOT NULL,
    PRIMARY KEY (`use_id`),
    FOREIGN KEY (`wm_id`) REFERENCES `washing_machine`(`wm_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`option_id`) REFERENCES `washing_option`(`option_id`)
);

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
    `img_id`        INT(3)  AUTO_INCREMENT,
    `img_path`      VARCHAR(200)    NOT NULL,
    `img_name`      VARCHAR(20),
    PRIMARY KEY (`img_id`)
);

INSERT INTO `washing_machine` (`wm_id`, `wm_status`) 
VALUES (1, 0), (2, 0), (3, 0), (4, 0), (5, 0), (6, 0), (7, 0), (8, 0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;