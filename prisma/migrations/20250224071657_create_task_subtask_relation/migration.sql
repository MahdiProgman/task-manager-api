/*
  Warnings:

  - Added the required column `taskId` to the `SubTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SubTask` ADD COLUMN `taskId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `SubTask` ADD CONSTRAINT `SubTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
