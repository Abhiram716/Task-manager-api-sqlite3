import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

let storagePath;

if (process.env.NODE_ENV === 'test') {
  storagePath = process.env.TEST_STORAGE_PATH;
} else {
  storagePath = process.env.DEV_STORAGE_PATH;
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
});

export { sequelize, DataTypes };
