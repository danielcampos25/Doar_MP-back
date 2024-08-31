/*
  Warnings:

  - Added the required column `titulo` to the `Doacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doacao" ADD COLUMN     "titulo" TEXT NOT NULL;
