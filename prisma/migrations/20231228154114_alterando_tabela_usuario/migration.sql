/*
  Warnings:

  - You are about to drop the column `nivel` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `situacao` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "nivel",
DROP COLUMN "situacao";

-- DropEnum
DROP TYPE "Situacao";
