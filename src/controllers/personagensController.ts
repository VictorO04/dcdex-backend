import * as personagensModel from "../models/personagensModel.js";
import { Request, Response } from "express";

export const getAllPersonagens = async (req: Request, res: Response) => {
    const personagens = await personagensModel.findAllPersonagens();

    res.status(200).json({
        total: personagens.length,
        mensagem: personagens.length === 0
            ? "Nenhum personagem registrado no banco de dados"
            : "Personagens encontrados no banco de dados",
        personagens: personagens
    });
}