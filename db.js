import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.STORAGE_PATH,
});

export { sequelize, DataTypes };
