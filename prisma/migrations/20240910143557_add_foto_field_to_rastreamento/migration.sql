/*
  Warnings:

  - You are about to drop the `Estatisticas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Midias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Midias" DROP CONSTRAINT "Midias_rastreamentoID_fkey";

-- AlterTable
ALTER TABLE "Rastreamento" ADD COLUMN     "fotoRastreamento" TEXT;

-- DropTable
DROP TABLE "Estatisticas";

-- DropTable
DROP TABLE "Midias";
