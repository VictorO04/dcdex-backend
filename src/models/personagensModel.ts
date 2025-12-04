import { prisma } from "../../.lib/prisma";

export const findAllPersonagens = async () => {
    return await prisma.personagens.findMany({
        orderBy: { codinome: "asc" }
    });
}