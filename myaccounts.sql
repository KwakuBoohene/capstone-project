CREATE TABLE `users` (
  `id` int(6) PRIMARY KEY AUTO_INCREMENT,
  `fname` varchar(100),
  `lname` varchar(100),
  `username` varchar(100),
  `email` varchar(200),
  `password` varchar(30)
);

CREATE TABLE `receivables` (
  `receivables_id` int PRIMARY KEY AUTO_INCREMENT,
  `amount` int(10),
  `paydate` date,
  `user_id` int(6)
);

CREATE TABLE `payables` (
  `payables_id` int PRIMARY KEY AUTO_INCREMENT,
  `amount` int(10),
  `paydate` date,
  `user_id` int(6)
);

CREATE TABLE `expenses` (
  `expense_id` int(6) PRIMARY KEY AUTO_INCREMENT,
  `expense_name` varchar(100),
  `amount` int(10),
  `date_recorded` date,
  `expense_type` int(3),
  `user_id` int(6)
);

CREATE TABLE `expensetype` (
  `id` int(6) PRIMARY KEY AUTO_INCREMENT,
  `et_name` varchar(100)
);

CREATE TABLE `sales` (
  `sale_id` int(6) PRIMARY KEY AUTO_INCREMENT,
  `amount` int(10),
  `quantity` int(9),
  `item_id` int(6),
  `user_id` int(6)
);

CREATE TABLE `items` (
  `id` int(6) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100),
  `price` int(10),
  `qty_in_stock` int(10)
);

ALTER TABLE `receivables` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `payables` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `expenses` ADD FOREIGN KEY (`expense_type`) REFERENCES `expensetype` (`id`);

ALTER TABLE `expenses` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `sales` ADD FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

ALTER TABLE `sales` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
