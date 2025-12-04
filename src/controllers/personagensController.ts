import * as personagensModel from "../models/personagensModel.js";
import { Request, Response } from "express";

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
                mensagem: `O id que foi digitado não é um número. Ele precisa ser um número!`
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