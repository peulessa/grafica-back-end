-- CreateEnum
CREATE TYPE "Situacao" AS ENUM ('Ativo', 'Inativo');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "situacao" "Situacao" NOT NULL DEFAULT 'Ativo';
