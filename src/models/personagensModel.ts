import { prisma } from "../../.lib/prisma.js";
import { createPersonagemDTO } from "../dtos/createPersonagemDTO.js";
import { updatePersonagemDTO } from "../dtos/updatePersonagemDTO.js";

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

export const findPersonagemByCodinome = async (codinome: string) => {
    return await prisma.personagens.findMany({
        where: { 
            codinome: {
                contains: codinome,
                mode: "insensitive"
            }
        },
        orderBy: { codinome: "asc" }
    });
};

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

export const deletePersonagem = async (id: number) => {
    return await prisma.personagens.delete({
        where: { id: id }
    });
}

export const updatePersonagem = async (id: number, data: updatePersonagemDTO) => {
    return await prisma.personagens.update({
        where:{ id: id },
        data: {
            ...(data.img_personagem_url !== undefined && { img_personagem_url: data.img_personagem_url }),
            ...(data.codinome !== undefined && { codinome: data.codinome }),
            ...(data.identidade !== undefined && { identidade: data.identidade }),
            ...(data.primeira_aparicao !== undefined && { primeira_aparicao: data.primeira_aparicao }),
            ...(data.historia_resumida !== undefined && { historia_resumida: data.historia_resumida }),
            ...(data.personalidade !== undefined && { personalidade: data.personalidade })
        }
    });
}