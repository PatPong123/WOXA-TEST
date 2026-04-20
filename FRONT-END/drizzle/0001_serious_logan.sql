CREATE TABLE `crop_plots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`plot_number` varchar(20) NOT NULL,
	`plot_name` varchar(100),
	`size` varchar(50),
	`location` varchar(100),
	`status` enum('available','occupied','maintenance') NOT NULL DEFAULT 'available',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `crop_plots_id` PRIMARY KEY(`id`),
	CONSTRAINT `crop_plots_plot_number_unique` UNIQUE(`plot_number`)
);
--> statement-breakpoint
CREATE TABLE `delivery_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`planting_id` int NOT NULL,
	`user_id` int NOT NULL,
	`notification_sent_at` timestamp,
	`user_confirmed_at` timestamp,
	`scheduled_delivery_date` timestamp,
	`actual_delivery_date` timestamp,
	`status` enum('pending_confirmation','confirmed','in_transit','delivered','cancelled') NOT NULL DEFAULT 'pending_confirmation',
	`delivery_address` text,
	`delivery_notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `delivery_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `plantings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`vegetable_id` int NOT NULL,
	`plot_id` int NOT NULL,
	`planting_date` timestamp NOT NULL,
	`expected_harvest_date` timestamp NOT NULL,
	`actual_harvest_date` timestamp,
	`status` enum('planted','growing','ready','harvested','delivered') NOT NULL DEFAULT 'planted',
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `plantings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`address` text,
	`city` varchar(100),
	`postal_code` varchar(20),
	`phone` varchar(20),
	`payment_method` enum('credit_card','bank_transfer','cash_on_delivery'),
	`payment_details` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vegetables` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`name_en` varchar(100) NOT NULL,
	`description` text,
	`image_url` text,
	`harvest_days` int NOT NULL,
	`care_instructions` text,
	`growth_stages` text,
	`price_per_plot` int NOT NULL,
	`is_active` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vegetables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `delivery_requests` ADD CONSTRAINT `delivery_requests_planting_id_plantings_id_fk` FOREIGN KEY (`planting_id`) REFERENCES `plantings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_requests` ADD CONSTRAINT `delivery_requests_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `plantings` ADD CONSTRAINT `plantings_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `plantings` ADD CONSTRAINT `plantings_vegetable_id_vegetables_id_fk` FOREIGN KEY (`vegetable_id`) REFERENCES `vegetables`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `plantings` ADD CONSTRAINT `plantings_plot_id_crop_plots_id_fk` FOREIGN KEY (`plot_id`) REFERENCES `crop_plots`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;