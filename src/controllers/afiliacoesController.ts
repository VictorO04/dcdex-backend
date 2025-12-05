import * as afiliacoesModel from "../models/afiliacoesModel.js";
import { Request, Response } from "express";

export const getAllAfiliacoes = async (req: Request, res: Response) => {
    try {
        const afiliacoes = await afiliacoesModel.findAllAfiliacoes();

        res.status(200).json({
            total: afiliacoes.length,
            mensagem: afiliacoes.length === 0
                ? "Nenhuma afiliação registrada no banco de dados"
                : "Afiliações encontradas no banco de dados",
            afiliacoes: afiliacoes
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";

        res.status(500).json({
            mensagem: "Erro interno do servidor",
            detalhes: errorMessage
        });
    }
}