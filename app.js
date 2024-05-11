import express from 'express';

import { sequelize } from './db.js';
import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  console.log('db is ready');
});

app.use('/auth', authRouter);
app.use('/tasks', taskRouter);

app.get('/', async (req, res) => {
  res.send('Hello world');
});

app.listen(process.env.PORT);
