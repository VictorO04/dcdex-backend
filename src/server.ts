import express from "express";
import dotenv from "dotenv"
import personagensRoutes from "./routes/personagensRoutes.js";
import afiliacoesRoutes from "./routes/afiliacoesRoutes.js"

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Servidor online!!! Rotas: /personagens");
});

app.use("/personagens", personagensRoutes);
app.use("/afiliacoes", afiliacoesRoutes);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${serverPort}`);
});