import * as afiliacoesController from "../controllers/afiliacoesController.js";
import { Router } from "express";

const router = Router();

router.get("/", afiliacoesController.getAllAfiliacoes);

export default router;