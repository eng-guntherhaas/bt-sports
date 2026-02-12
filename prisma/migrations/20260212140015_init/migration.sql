-- CreateEnum
CREATE TYPE "TipoFoto" AS ENUM ('CAPA', 'GALERIA', 'CARD', 'BANNER');

-- CreateTable
CREATE TABLE "contatos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "telefone" VARCHAR(50),
    "cidade" VARCHAR(100),
    "estado" CHAR(2),
    "mensagem" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_viagem" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "categorias_viagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacotes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "data_inicio" DATE,
    "preco" DECIMAL(10,2),
    "texto_destaque" TEXT,
    "resumo" TEXT,
    "descricao" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "categoria_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pacotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos" (
    "id" SERIAL NOT NULL,
    "pacote_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "tipo" "TipoFoto" NOT NULL DEFAULT 'GALERIA',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "fotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "depoimentos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "texto" TEXT NOT NULL,
    "data" DATE,
    "pacote_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "depoimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provideraccountid" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessiontoken" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL
);

-- CreateIndex
CREATE INDEX "contatos_created_at_idx" ON "contatos"("created_at");

-- CreateIndex
CREATE INDEX "contatos_email_idx" ON "contatos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_viagem_nome_key" ON "categorias_viagem"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_viagem_slug_key" ON "categorias_viagem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pacotes_slug_key" ON "pacotes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pacotes_destaque_key" ON "pacotes"("destaque");

-- CreateIndex
CREATE INDEX "pacotes_categoria_id_idx" ON "pacotes"("categoria_id");

-- CreateIndex
CREATE INDEX "pacotes_destaque_idx" ON "pacotes"("destaque");

-- CreateIndex
CREATE INDEX "pacotes_data_inicio_idx" ON "pacotes"("data_inicio");

-- CreateIndex
CREATE INDEX "fotos_pacote_id_idx" ON "fotos"("pacote_id");

-- CreateIndex
CREATE INDEX "fotos_pacote_id_tipo_idx" ON "fotos"("pacote_id", "tipo");

-- CreateIndex
CREATE INDEX "fotos_pacote_id_ordem_idx" ON "fotos"("pacote_id", "ordem");

-- CreateIndex
CREATE INDEX "depoimentos_pacote_id_idx" ON "depoimentos"("pacote_id");

-- CreateIndex
CREATE INDEX "depoimentos_data_idx" ON "depoimentos"("data");

-- CreateIndex
CREATE UNIQUE INDEX "depoimentos_pacote_id_nome_key" ON "depoimentos"("pacote_id", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provideraccountid_key" ON "Account"("provider", "provideraccountid");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessiontoken_key" ON "Session"("sessiontoken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "pacotes" ADD CONSTRAINT "pacotes_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias_viagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_pacote_id_fkey" FOREIGN KEY ("pacote_id") REFERENCES "pacotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "depoimentos" ADD CONSTRAINT "depoimentos_pacote_id_fkey" FOREIGN KEY ("pacote_id") REFERENCES "pacotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
