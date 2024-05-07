import express from "express";

import { createAccount } from "../controllers/userController.js";
import { createAcessTokens } from "../controllers/acessTokenController.js";

const authRouter = express.Router();

authRouter.post("/signup", createAccount);
authRouter.post("/acess-token", createAcessTokens);

export default authRouter;
