import * as personagensModel from "../models/personagensModel.js";
import { Request, Response, NextFunction} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if (token !== process.env.API_SECRET) {
        return res.status(401).json({
            mensagem: "Não autorizado"
        });
    }

    next();
}

export const getAllPersonagens = async (req: Request, res: Response) => {
    try {
        const personagens = await personagensModel.findAllPersonagens();

        res.status(200).json({
            total: personagens.length,
            mensagem: personagens.length === 0
                ? "Nenhum personagem registrado no banco de dados"
                : "Personagens encontrados no banco de dados",
            personagens: personagens
    });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";

        res.status(500).json({
            mensagem: "Erro interno do servidor",
            detalhes: errorMessage
        });
    }
}

export const getPersonagemByID = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id que foi digitado não é um número. Ele precisa ser um número!"
            });
        }

        const personagem = await personagensModel.findPersonagemById(id);

        if (!personagem) {
            return res.status(404).json({
                total: 0,
                mensagem: `O personagem com o id ${id} não foi encontrado`
            });
        }

        res.status(200).json({
            total: 1,
            mensagem: `O personagem com o id ${id} foi encontrado`,
            personagem: personagem
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";

        res.status(500).json({
            mensagem: "Erro interno do servidor",
            detalhes: errorMessage
        });
    }
}

export const getPersonagemByCodinome = async (req: Request, res: Response) => {
    try {
        const { codinome } = req.params;
        
        const personagens = await personagensModel.findPersonagemByCodinome(codinome);
        if (!personagens || personagens.length === 0) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhum personagem com o codinome ${codinome} encontrado`
            });
        }

        res.status(200).json({
            total: personagens.length,
            mensagem: `Personagens encontrados com o codinome ${codinome} no banco de dados`,
            personagens: personagens
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";

        res.status(500).json({
            mensagem: "Erro interno do servidor",
            detalhes: errorMessage
        });
    }
}

export const createPersonagem = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (!data || typeof data !== "object") {
            return res.status(400).json({
                total: 0,
                mensagem: "O corpo da requisição deve ser um JSON válido"
            });
        }

        const { img_personagem_url, codinome, identidade, primeira_aparicao, historia_resumida, personalidade } = data;

        const camposObrigatorios = [ "img_personagem_url", "codinome", "identidade", "primeira_aparicao", "historia_resumida", "personalidade" ];
        const camposFaltando = camposObrigatorios.filter((campo) => {
            const valor = data[campo];
            return (
                valor === undefined ||
                valor === null ||
                (typeof valor === "string" && valor.trim() === "")
            );
        });
        if (camposFaltando.length > 0) {
            return res.status(400).json({
                total: 0,
                mensagem: `Os seguintes campos obrigatórios estão faltando ou vazios: ${camposFaltando.join(", ")}`
            });
        }

        const novoPersonagem = await personagensModel.createPersonagem({
            img_personagem_url,
            codinome,
            identidade,
            primeira_aparicao,
            historia_resumida,
            personalidade
        });

        res.status(201).json({
            total: 1,
            mensagem: "Personagem criado com sucesso",
            personagem: novoPersonagem
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";

        res.status(500).json({
            mensagem: "Erro interno do servidor",
            detalhes: errorMessage
        });
    }
}

export const deletePersonagem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id que foi digitado não é um número. Ele precisa ser um número!"
            });
        }

        const personagemExiste = await personagensModel.findPersonagemById(id);
        if (!personagemExiste) {
            return res.status(404).json({
                total: 0,
                mensagem: `O personagem com o id ${id} não foi encontrado`
            });
        }

        await personagensModel.deletePersonagem(id);

        res.status(200).json({
            total: 1,
            mensagem: `Personagem com o id ${id} deletado com sucesso`,
            personagem: personagemExiste
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";

        res.status(500).json({
            mensagem: "Erro interno do servidor",
            detalhes: errorMessage
        });
    }
}

export const updatePersonagem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id que foi digitado não é um número. Ele precisa ser um número!"
            });
        }

        const data = req.body;
        if (!data || typeof data !== "object") {
            return res.status(400).json({
                total: 0,
                mensagem: "O corpo da requisição deve ser um JSON válido"
            });
        }

        const { img_personagem_url, codinome, identidade, primeira_aparicao, historia_resumida, personalidade } = data;

        const personagemExiste = await personagensModel.findPersonagemById(id);

        if (!personagemExiste) {
            return res.status(404).json({
                total: 0,
                mensagem: `O personagem com o id ${id} não foi encontrado`
            });
        }

        const personagemAtualizado = await personagensModel.updatePersonagem(id, {
            img_personagem_url,
            codinome,
            identidade,
            primeira_aparicao,
            historia_resumida,
            personalidade
        });

        res.status(200).json({
            total: 1,
            mensagem: `Personagem com o id ${id} atualizado com sucesso`,
            personagem: personagemAtualizado
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";

        res.status(500).json({
            mensagem: "Erro interno do servidor",
            detalhes: errorMessage
        });
    }
}