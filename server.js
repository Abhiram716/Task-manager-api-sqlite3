import app from './app.js';
import { sequelize } from './db.js';

sequelize.sync().then(() => {
  console.log('db is ready');
});

app.listen(process.env.PORT);
