import { DataTypes, sequelize } from '../db.js';

const Tasks = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM('pending', 'inprogress', 'unassigned', 'completed'),
      defaultValue: 'unassigned',
    },
    assigneeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  { timestamps: true },
);

export default Tasks;
