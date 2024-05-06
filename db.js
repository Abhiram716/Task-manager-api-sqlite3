import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

export { sequelize, DataTypes };
