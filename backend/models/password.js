const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Password = sequelize.define('Password', {
  passwordId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id', 
    },
  },
});

Password.belongsTo(User, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE',
});

module.exports = Password;
