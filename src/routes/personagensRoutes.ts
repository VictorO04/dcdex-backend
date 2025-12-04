import * as personagensController from "../controllers/personagensController.js";
import { Router } from "express";

const router = Router();

router.get("/", personagensController.getAllPersonagens);

export default router;