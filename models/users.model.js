import { DataTypes, sequelize } from '../db.js';

import Tasks from './tasks.model.js';

const Users = sequelize.define(
  'Users',
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
    role: {
      type: DataTypes.ENUM('Admin', 'Member'),
      defaultValue: 'Member',
      allowNull: false,
    },
  },
  { timestamps: true },
);

Users.hasMany(Tasks, { foreignKey: 'assigneeId' });
Tasks.belongsTo(Users, { foreignKey: 'assigneeId' });

export default Users;
