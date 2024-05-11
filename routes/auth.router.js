import express from 'express';

import createAcessTokens from '../controllers/acessTokenController.js';
import createAccount from '../controllers/userController.js';

const authRouter = express.Router();

authRouter.post('/signup', createAccount);
authRouter.post('/acess-token', createAcessTokens);

export default authRouter;
