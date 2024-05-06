import express from "express";

import { createAccount } from "../controllers/userController.js";
import { createAcessTokens } from "../controllers/acessTokenController.js";

const userRouter = express.Router();

userRouter.post("/signup", createAccount);
userRouter.post("/acess-token", createAcessTokens);

export default userRouter;
