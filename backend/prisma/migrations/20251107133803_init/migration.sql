-- CreateTable
CREATE TABLE "continentes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,

    CONSTRAINT "continentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paises" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "descricao" TEXT,
    "idiomaOficial" VARCHAR(30) NOT NULL,
    "moeda" VARCHAR(20) NOT NULL,
    "populacao" BIGINT,
    "area" DOUBLE PRECISION,
    "bandeiraPng" TEXT,
    "continenteId" INTEGER NOT NULL,

    CONSTRAINT "paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "populacao" BIGINT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "continentes_nome_key" ON "continentes"("nome");

-- AddForeignKey
ALTER TABLE "paises" ADD CONSTRAINT "paises_continenteId_fkey" FOREIGN KEY ("continenteId") REFERENCES "continentes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "paises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
