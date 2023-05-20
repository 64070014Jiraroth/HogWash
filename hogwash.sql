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
    `id`     INT(3)  AUTO_INCREMENT,
    `brand`  VARCHAR(30),
    `model`  VARCHAR(30),
    `status` INT(1)  NOT NULL,
    `powder`    INT(3) NOT NULL,
    `softener`  INT(3) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `options`;
CREATE TABLE `options` (
    `id`     INT(2)  AUTO_INCREMENT,
    `name`  VARCHAR(20),
    `price`   INT(2)  NOT NULL,
    `time`   INT(3)  NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
    `id`    INT(2)  AUTO_INCREMENT,
    `name`  VARCHAR(20),
    `path` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id`       INT(10) AUTO_INCREMENT,
    `email`    VARCHAR(50) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `role`      VARCHAR(20) DEFAULT 'customer',
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

DROP TABLE IF EXISTS `queue`;
CREATE TABLE `queue` (
    `id`  INT(3)      AUTO_INCREMENT,
    `wm_id`     INT(3)  NOT NULL,
    `user_id`   INT(10) NOT NULL,
    `booking_time`      timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`wm_id`) REFERENCES `washing_machine`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
    `id`        INT(3)  AUTO_INCREMENT,
    `date`      timestamp DEFAULT CURRENT_TIMESTAMP,
    `payment_id`   INT(2) NOT NULL,
    `wm_id`     INT(3)  NOT NULL,
    `user_id`   INT(10) NOT NULL,
    `option_id` INT(2)  NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`payment_id`) REFERENCES `payments`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`wm_id`) REFERENCES `washing_machine`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE, 
    FOREIGN KEY (`option_id`) REFERENCES `options`(`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
    `id`        INT(3)  AUTO_INCREMENT,
    `path`      VARCHAR(200)    NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
    `id`        INT(10) AUTO_INCREMENT,
    `user_id`   INT(10) NOT NULL,
    `title`     varchar(100) NOT NULL,
    `description`     varchar(100) NOT NULL,
    `feedback_date`     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

INSERT INTO `users` (`email`, `password`, `role`) 
VALUES  ('admin@gmail.com', 'Admin1234', 'admin');

INSERT INTO `users` (`email`, `password`) 
VALUES  ('customer@gmail.com', 'Customer1234');

INSERT INTO `washing_machine` (`id`, `brand`, `model`, `status`, `powder`,`softener`) 
VALUES  (1, 'Panasonic', 'NA-127XB1WMY', 0, 80, 80), 
        (2, 'Panasonic', 'NA-127XB1WMY', 1, 100, 100), 
        (3, 'Panasonic', 'NA-127XB1WMY', 2, 100, 100), 
        (4, 'Panasonic', 'NA-127XB1WMY', 0, 90, 90), 
        (5, 'Panasonic', 'NA-127XB1WMY', 0, 100, 100), 
        (6, 'Panasonic', 'NA-127XB1WMY', 0, 70, 70), 
        (7, 'Panasonic', 'NA-127XB1WMY', 0, 100, 100), 
        (8, 'Panasonic', 'NA-127XB1WMY', 0, 100, 100);

INSERT INTO `options` (`id`, `name`, `price`, `time`) 
VALUES  (1, 'ซักเร็ว', 20, 5), 
        (2, 'ซักธรรมดา', 30, 3000), 
        (3, 'ซักนํ้าร้อน', 50, 3000), 
        (4, 'ซักนํ้าเย็น', 50, 3000);

INSERT INTO `payments` (`id`, `name`, `path`) 
VALUES  (1, 'Prompt Pay', '/uploads/payments/promptPay.png'), 
        (2, 'True Money Wallet', '/uploads/payments/trueMoney.png'), 
        (3, 'Shopee Pay', '/uploads/payments/shopeePay.png'), 
        (4, 'Rabbit Line Pay', '/uploads/payments/rabbitLinePay.png');

INSERT INTO `images` (`id`, `path`) 
VALUES  (1, '/uploads/materials/wm.png'), 
        (2, '/uploads/materials/powder.png'), 
        (3, '/uploads/materials/softener.png'),
        (4, '/uploads/contact/line.png'), 
        (5, '/uploads/contact/mail.png'), 
        (6, '/uploads/contact/phone.png'),
        (7, '/uploads/background.png'), 
        (8, '/uploads/bg2.png');

INSERT INTO `feedback` (`id`, `user_id`, `title`, `description`, `feedback_date`)
VALUES (1, '2', 'แจ้งเครื่องซักผ้าเสีย', 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis', '2023-04-20 01:58:01'),
      (2, '2', 'พนักงานหิวข้าว', 'description', '2023-04-29 01:58:01'),
      (3, '2', 'พลับขอเส้นหมี่น้ำ', 'description', '2023-05-02 01:58:01'),
      (4, '2', 'ใส่ลูกชิ้นเยอะๆ ชามนึงครับ', 'description', '2023-05-10 01:58:01'),
      (5, '2', 'ผมมีเรื่องจะปรึกษาคุณครูครับ', 'description', '2023-05-20 01:58:01');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;