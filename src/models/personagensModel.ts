import { prisma } from "../../.lib/prisma";

export const findAllPersonagens = async () => {
    return await prisma.personagens.findMany({
        orderBy: { codinome: "asc" }
    });
}

export const findPersonagemById = async (id: number) => {
    return await prisma.personagens.findUnique({
        where: { id: id }
    });
}