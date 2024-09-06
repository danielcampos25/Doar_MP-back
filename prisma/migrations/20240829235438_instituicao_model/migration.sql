/*
  Warnings:

  - You are about to drop the column `status` on the `Doacao` table. All the data in the column will be lost.
  - You are about to drop the column `totalRealizada` on the `Estatisticas` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Rastreamento` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoID` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Destinatario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enderecos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalCadastradas` to the `Estatisticas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Destinatario" DROP CONSTRAINT "Destinatario_enderecoID_fkey";

-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_destinatarioID_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_enderecoID_fkey";

-- AlterTable
ALTER TABLE "Doacao" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Estatisticas" DROP COLUMN "totalRealizada",
ADD COLUMN     "totalCadastradas" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rastreamento" DROP COLUMN "descricao",
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "enderecoID",
ADD COLUMN     "endereco" TEXT NOT NULL;

-- DropTable
DROP TABLE "Destinatario";

-- DropTable
DROP TABLE "Enderecos";

-- CreateTable
CREATE TABLE "Instituicao" (
    "id" SERIAL NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "fotoPerfil" TEXT,
    "endereco" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_email_key" ON "Instituicao"("email");

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_destinatarioID_fkey" FOREIGN KEY ("destinatarioID") REFERENCES "Instituicao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
