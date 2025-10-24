-- AddForeignKey
ALTER TABLE `tbl_refreshTokens` ADD CONSTRAINT `tbl_refreshTokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
