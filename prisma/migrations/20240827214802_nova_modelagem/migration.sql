/*
  Warnings:

  - You are about to drop the column `doadorId` on the `Doacao` table. All the data in the column will be lost.
  - You are about to drop the column `instituicaoId` on the `Doacao` table. All the data in the column will be lost.
  - You are about to drop the column `produto` on the `Doacao` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Doacao` table. All the data in the column will be lost.
  - You are about to drop the `Doador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Instituicao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `QRCode` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoRastreamento` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinatarioID` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entregue` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtdItens` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Doacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioID` to the `Doacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_doadorId_fkey";

-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_instituicaoId_fkey";

-- AlterTable
ALTER TABLE "Doacao" DROP COLUMN "doadorId",
DROP COLUMN "instituicaoId",
DROP COLUMN "produto",
DROP COLUMN "quantidade",
ADD COLUMN     "QRCode" TEXT NOT NULL,
ADD COLUMN     "codigoRastreamento" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "destinatarioID" INTEGER NOT NULL,
ADD COLUMN     "entregue" BOOLEAN NOT NULL,
ADD COLUMN     "qtdItens" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usuarioID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Doador";

-- DropTable
DROP TABLE "Instituicao";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "fotoPerfil" TEXT,
    "enderecoID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enderecos" (
    "id" SERIAL NOT NULL,
    "cep" INTEGER NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" INTEGER,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destinatario" (
    "id" SERIAL NOT NULL,
    "CPF_CNPJ" TEXT,
    "nome_razaoSocial" TEXT NOT NULL,
    "enderecoID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destinatario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rastreamento" (
    "id" SERIAL NOT NULL,
    "doacaoID" INTEGER NOT NULL,
    "localizacao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rastreamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Midias" (
    "id" SERIAL NOT NULL,
    "rastreamentoID" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Midias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estatisticas" (
    "id" SERIAL NOT NULL,
    "totalRealizada" INTEGER NOT NULL,
    "totalEntregue" INTEGER NOT NULL,
    "totalItens" INTEGER NOT NULL,

    CONSTRAINT "Estatisticas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Destinatario_CPF_CNPJ_key" ON "Destinatario"("CPF_CNPJ");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_enderecoID_fkey" FOREIGN KEY ("enderecoID") REFERENCES "Enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destinatario" ADD CONSTRAINT "Destinatario_enderecoID_fkey" FOREIGN KEY ("enderecoID") REFERENCES "Enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_destinatarioID_fkey" FOREIGN KEY ("destinatarioID") REFERENCES "Destinatario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rastreamento" ADD CONSTRAINT "Rastreamento_doacaoID_fkey" FOREIGN KEY ("doacaoID") REFERENCES "Doacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Midias" ADD CONSTRAINT "Midias_rastreamentoID_fkey" FOREIGN KEY ("rastreamentoID") REFERENCES "Rastreamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
