import { prisma } from "../../.lib/prisma";

export const findAllAfiliacoes = async () => {
    return await prisma.afiliacoes.findMany({
        orderBy: { nome: "asc" }
    });
}