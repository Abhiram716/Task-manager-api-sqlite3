import express from 'express';

import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/tasks', taskRouter);

app.get('/', async (req, res) => {
  res.send('Hello world');
});

export default app;
