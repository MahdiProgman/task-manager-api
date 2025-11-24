-- DropForeignKey
ALTER TABLE `tbl_categories` DROP FOREIGN KEY `tbl_categories_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_refreshTokens` DROP FOREIGN KEY `tbl_refreshTokens_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_subtasks` DROP FOREIGN KEY `tbl_subtasks_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_tasks` DROP FOREIGN KEY `tbl_tasks_categoryId_fkey`;

-- DropIndex
DROP INDEX `tbl_categories_userId_fkey` ON `tbl_categories`;

-- DropIndex
DROP INDEX `tbl_refreshTokens_userId_fkey` ON `tbl_refreshTokens`;

-- DropIndex
DROP INDEX `tbl_subtasks_taskId_fkey` ON `tbl_subtasks`;

-- DropIndex
DROP INDEX `tbl_tasks_categoryId_fkey` ON `tbl_tasks`;

-- AddForeignKey
ALTER TABLE `tbl_refreshTokens` ADD CONSTRAINT `tbl_refreshTokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tasks` ADD CONSTRAINT `tbl_tasks_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `tbl_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_categories` ADD CONSTRAINT `tbl_categories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_subtasks` ADD CONSTRAINT `tbl_subtasks_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `tbl_tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
