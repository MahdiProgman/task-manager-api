/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SubTask` DROP FOREIGN KEY `SubTask_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `SubTask`;

-- DropTable
DROP TABLE `Task`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `tbl_users` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tbl_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tasks` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tbl_categories_name_userId_key`(`name`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_subtasks` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `taskId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_tasks` ADD CONSTRAINT `tbl_tasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tasks` ADD CONSTRAINT `tbl_tasks_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `tbl_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_categories` ADD CONSTRAINT `tbl_categories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_subtasks` ADD CONSTRAINT `tbl_subtasks_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `tbl_tasks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
