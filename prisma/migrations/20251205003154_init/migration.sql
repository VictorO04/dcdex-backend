-- CreateTable
CREATE TABLE "afiliacoes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "afiliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criadores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "criadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fraquezas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "fraquezas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habilidades" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "habilidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personagens" (
    "id" SERIAL NOT NULL,
    "img_personagem_url" TEXT NOT NULL,
    "codinome" VARCHAR(100) NOT NULL,
    "identidade" VARCHAR(100) NOT NULL,
    "primeira_aparicao" VARCHAR(100) NOT NULL,
    "historia_resumida" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL,

    CONSTRAINT "personagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personagens_afiliacoes" (
    "personagem_id" INTEGER NOT NULL,
    "afiliacao_id" INTEGER NOT NULL,

    CONSTRAINT "personagens_afiliacoes_pkey" PRIMARY KEY ("personagem_id","afiliacao_id")
);

-- CreateTable
CREATE TABLE "personagens_criadores" (
    "personagem_id" INTEGER NOT NULL,
    "criador_id" INTEGER NOT NULL,

    CONSTRAINT "personagens_criadores_pkey" PRIMARY KEY ("personagem_id","criador_id")
);

-- CreateTable
CREATE TABLE "personagens_fraquezas" (
    "personagem_id" INTEGER NOT NULL,
    "fraqueza_id" INTEGER NOT NULL,

    CONSTRAINT "personagens_fraquezas_pkey" PRIMARY KEY ("personagem_id","fraqueza_id")
);

-- CreateTable
CREATE TABLE "personagens_habilidades" (
    "personagem_id" INTEGER NOT NULL,
    "habilidade_id" INTEGER NOT NULL,

    CONSTRAINT "personagens_habilidades_pkey" PRIMARY KEY ("personagem_id","habilidade_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "afiliacoes_nome_key" ON "afiliacoes"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "fraquezas_nome_key" ON "fraquezas"("nome");

-- AddForeignKey
ALTER TABLE "personagens_afiliacoes" ADD CONSTRAINT "personagens_afiliacoes_afiliacao_id_fkey" FOREIGN KEY ("afiliacao_id") REFERENCES "afiliacoes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personagens_afiliacoes" ADD CONSTRAINT "personagens_afiliacoes_personagem_id_fkey" FOREIGN KEY ("personagem_id") REFERENCES "personagens"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personagens_criadores" ADD CONSTRAINT "personagens_criadores_criador_id_fkey" FOREIGN KEY ("criador_id") REFERENCES "criadores"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personagens_criadores" ADD CONSTRAINT "personagens_criadores_personagem_id_fkey" FOREIGN KEY ("personagem_id") REFERENCES "personagens"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personagens_fraquezas" ADD CONSTRAINT "personagens_fraquezas_fraqueza_id_fkey" FOREIGN KEY ("fraqueza_id") REFERENCES "fraquezas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personagens_fraquezas" ADD CONSTRAINT "personagens_fraquezas_personagem_id_fkey" FOREIGN KEY ("personagem_id") REFERENCES "personagens"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personagens_habilidades" ADD CONSTRAINT "personagens_habilidades_habilidade_id_fkey" FOREIGN KEY ("habilidade_id") REFERENCES "habilidades"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personagens_habilidades" ADD CONSTRAINT "personagens_habilidades_personagem_id_fkey" FOREIGN KEY ("personagem_id") REFERENCES "personagens"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
