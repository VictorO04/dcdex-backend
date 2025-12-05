import { prisma } from "../../.lib/prisma";
import { createPersonagemDTO } from "../dtos/createPersonagemDTO.js";

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

export const createPersonagem = async (data: createPersonagemDTO) => {
    return await prisma.personagens.create({
        data: {
            img_personagem_url: data.img_personagem_url,
            codinome: data.codinome,
            identidade: data.identidade,
            primeira_aparicao: data.primeira_aparicao,
            historia_resumida: data.historia_resumida,
            personalidade: data.personalidade
        }
    });
}