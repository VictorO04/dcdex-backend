import * as personagensController from "../controllers/personagensController.js";
import { Router } from "express";

const router = Router();

router.get("/", personagensController.getAllPersonagens);
router.get("/:id", personagensController.getPersonagemByID);

export default router;