CREATE TABLE `User` (
  `us_email` varchar(128) PRIMARY KEY NOT NULL,
  `us_firstname` varchar(32) NOT NULL,
  `us_lastname` varchar(32) NOT NULL,
  `us_age` int(11) NOT NULL,
  `us_password` varchar(64) NOT NULL
);

CREATE TABLE `Spot` (
  `sp_id` int(11) PRIMARY KEY NOT NULL,
  `sp_name` varchar(64) NOT NULL,
  `sp_address` varchar(126) NOT NULL
);

CREATE TABLE `Activity` (
  `ac_id` int(11) PRIMARY KEY NOT NULL,
  `sp_id` int(11) NOT NULL,
  `us_email` varchar(128) NOT NULL,
  `ac_startDate` varchar(12) NOT NULL,
  `ac_endDate` varchar(12) NOT NULL,
  `ac_nbBathers` int(11),
  `ac_nbFishingBoat` int(11),
  `ac_nbPleasureBoat` int(11),
  `ac_nbSailBoat` int(11)
);

CREATE TABLE `UsedProduct` (
  `ac_id` int(11) NOT NULL,
  `pr_id` int(11) NOT NULL,
  PRIMARY KEY (`ac_id`, `pr_id`)
);

CREATE TABLE `Product` (
  `pr_id` int(11) PRIMARY KEY NOT NULL,
  `pr_name` varchar(128) NOT NULL
);

ALTER TABLE `Activity` ADD FOREIGN KEY (`us_email`) REFERENCES `User` (`us_email`);

ALTER TABLE `Activity` ADD FOREIGN KEY (`sp_id`) REFERENCES `Spot` (`sp_id`);

ALTER TABLE `UsedProduct` ADD FOREIGN KEY (`pr_id`) REFERENCES `Product` (`pr_id`);

ALTER TABLE `UsedProduct` ADD FOREIGN KEY (`ac_id`) REFERENCES `Activity` (`ac_id`);

