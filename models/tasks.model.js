import { DataTypes, sequelize } from "../db.js";

const Tasks = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("pending", "inprogress", "unassigned", "completed"),
      defaultValue: "unassigned",
    },
    assignee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Tasks;
