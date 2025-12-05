import * as personagensController from "../controllers/personagensController.js";
import { authMiddleware } from "../controllers/personagensController.js";
import { Router } from "express";

const router = Router();

router.get("/", personagensController.getAllPersonagens);
router.get("/:id", personagensController.getPersonagemByID);
router.post("/", authMiddleware, personagensController.createPersonagem);
router.delete("/:id", authMiddleware, personagensController.deletePersonagem);

export default router;