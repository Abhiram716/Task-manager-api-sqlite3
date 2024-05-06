import { DataTypes, sequelize } from "../db.js";
import Tasks from "./tasks.model.js";

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Users.hasMany(Tasks, { foreignKey: "assignee_id" });
Tasks.belongsTo(Users, { foreignKey: "assignee_id" });

export default Users;
