const User = require('./User');
const Tasklist = require('./Tasklist');
const Task = require('./Task');

const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

// Tasklist belong to User
Tasklist.belongsTo(User, {
    foreignKey: {
        name: 'owner_id',
        type: DataTypes.UUID
    }
});

// Task belongTo Tasklist
Task.belongsTo(Tasklist, {
    foreignKey: {
        name: 'tasklist_id',
        type: DataTypes.UUID
    },
    onDelete: 'CASCADE'
});

// Users hasMany Tasklist
User.hasMany(Tasklist, {
    foreignKey: {
        name: 'owner_id',
        type: DataTypes.UUID
    },
    onDelete: 'CASCADE'
});

Tasklist.hasMany(Task, {
    foreignKey: {
        name: 'tasklist_id',
        type: DataTypes.UUID
    },
    onDelete: 'CASCADE'
});

module.exports = { User, Task, Tasklist };